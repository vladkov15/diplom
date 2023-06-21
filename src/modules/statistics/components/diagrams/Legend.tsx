import React, { FC } from 'react'
import styled from 'styled-components'

import styles from './Legend.module.scss'

interface LegendProps {
  items: Array<{
    label: string
    color: string
  }>
}

const Legend: FC<LegendProps> = React.memo(({ items }) => {
  return (
    <div className={styles.Legend}>
      {items.map((item, index) => (
        <div key={`${item.label}_${index}`} className={styles.Legend__Item}>
          <LegendItemMarkStyled className={styles.Legend__Mark} color={item.color} />
          <span className={styles.Legend__Label}>{item.label}</span>
        </div>
      ))}
    </div>
  )
})
Legend.displayName = 'Legend'

const LegendItemMarkStyled = styled.span`
  background: ${(props) => props.color};
`

export default Legend
