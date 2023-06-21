import React, { FC, useState } from 'react'

import Toggle from '@ui/components/toggle'
import PieDiagram from './PieDiagram'
import BarDiagram from './BarDiagram'

import styles from './DiagramsArea.module.scss'

const DiagramsArea: FC = React.memo(() => {
  const [interval, setInterval] = useState(-1)

  const handleChangeInterval = (value: number) => {
    setInterval(value)
  }

  return (
    <div className={styles.DiagramAreaContainer}>
      <Toggle type='radio' name='intervals' defaultValue={interval} onChange={handleChangeInterval}>
        <Toggle.Button id='interval-1' value={1}>
          Сегодня
        </Toggle.Button>
        <Toggle.Button id='interval-7' value={7}>
          Неделя
        </Toggle.Button>
        <Toggle.Button id='interval-30' value={30}>
          Месяц
        </Toggle.Button>
        <Toggle.Button id='interval-all' value={-1}>
          Все
        </Toggle.Button>
      </Toggle>

      <div style={{ display: 'grid', gridTemplateColumns: '400px auto', gap: 60, marginTop: 40 }}>
        <PieDiagram interval={interval} />
        <BarDiagram interval={interval} />
      </div>
    </div>
  )
})
DiagramsArea.displayName = 'DiagramsArea'

export default DiagramsArea
