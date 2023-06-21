import React, { FC } from 'react'
import Image from 'next/image'

import { useGetPaymentsHistoryQuery } from '../../pay.api'

import styles from './PayHistory.module.scss'

function normalizeDate(date: string) {
  const arr = date.split(' ')
  return arr[0].replaceAll('-', '.').split('.').reverse().join('.')
}

function normalizeTitle(title: string) {
  return title
    .match(/^.*\ \(/gm)
    ?.shift()
    ?.slice(0, -1)
    .trim()
}

function normalizeTimer(title: string) {
  return title
    .match(/\(.*\)/gm)
    ?.shift()
    ?.slice(1, -1)
    .trim()
}

interface PayHistoryTableProps {
  title?: string
}

const PayHistoryTable: FC<PayHistoryTableProps> = React.memo(({ title }) => {
  const { data: historyList } = useGetPaymentsHistoryQuery()

  if (!historyList) return null

  return (
    <div className={styles.PayHistory}>
      <div className={styles.PayHistory__Header}>
        {title && <h2 className={styles.PayHistory__Title}>{title}</h2>}
      </div>

      <div className={styles.PayHistory__Body}>
        <table className={styles.PayHistoryTable}>
          <tbody>
            {historyList.map((historyItem, idx) => (
              <tr key={idx}>
                <td className={styles.PayHistoryTable__Date}>{normalizeDate(historyItem.date)}</td>
                <td className={styles.PayHistoryTable__Name}>
                  {normalizeTitle(historyItem.title)}
                </td>
                <td className={styles.PayHistoryTable__Time}>
                  {normalizeTimer(historyItem.title)}
                </td>
                {historyItem.image && (
                  <td className={styles.PayHistoryTable__Brand}>
                    <Image src={historyItem.image} alt={historyItem.title} width={70} height={70} />
                  </td>
                )}
                <td className={styles.PayHistoryTable__Price}>{historyItem.price + ' руб.'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})
PayHistoryTable.displayName = 'PayHistoryTable'

export default PayHistoryTable
