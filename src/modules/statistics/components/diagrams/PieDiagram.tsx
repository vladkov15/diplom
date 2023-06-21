import React, { FC } from 'react'

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import { useGetStatisticsChannelsQuery } from '@/modules/statistics/statistics.api'
import { COLORS } from './constants'

import styles from './PieDiagram.module.scss'
import Legend from './Legend'

ChartJS.register(ArcElement, Tooltip)

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { display: false },
    y: { display: false },
  },
}

interface PieDiagramProps {
  interval: number
}

const PieDiagram: FC<PieDiagramProps> = ({ interval }) => {
  const { data: channels } = useGetStatisticsChannelsQuery({ interval })

  if (!channels) return <div>Loading...</div>

  const labels = channels.map((channel) => `${channel.name} ${channel.percent_string}`)
  const doughnutData = channels.map((channel) => channel.percent)

  const data = {
    labels,
    datasets: [{ data: doughnutData, backgroundColor: COLORS }],
  }

  return (
    <div className={styles.PieDiagram}>
      <div className={styles.PieDiagram__Container}>
        <Doughnut data={data} options={OPTIONS} />
      </div>
      <Legend items={labels.map((label, index) => ({ label, color: COLORS[index] }))} />
    </div>
  )
}

export default PieDiagram
