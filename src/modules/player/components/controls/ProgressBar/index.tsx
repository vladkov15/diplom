import React, { FC } from 'react'

import Range from '../../generic/Range'

import styles from './ProgressBar.module.scss'

interface ProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  duration: number
  currentTime: number
  onChange: (value: string | number) => void
}

const ProgressBar: FC<ProgressBarProps> = ({ className, currentTime, duration, onChange }) => {
  return (
    <div className={styles.ProgressBar}>
      <Range
        className={className}
        value={currentTime}
        onValueChange={onChange}
        max={duration}
        tooltipConvertFn={formatTime}
        prependOuterContent={
          <div className={styles.ProgressBar__Time}>{formatTime(currentTime)}</div>
        }
        appendOuterContent={<div className={styles.ProgressBar__Time}>{formatTime(duration)}</div>}
      />
    </div>
  )
}

export default ProgressBar

export const formatTimeComponent = (
  integer: number,
  separator = '',
  emptyIfZero = false,
  pad = true,
) => {
  return emptyIfZero && integer === 0
    ? ''
    : integer < 10 && pad
    ? `0${integer}${separator}`
    : `${integer}${separator}`
}

export const formatTime = (seconds: number, negativeMark = '-') => {
  let rounded = Math.round(seconds)
  let includedNegativeMark = ''

  if (typeof seconds !== 'number' || isNaN(seconds) || seconds === Infinity) {
    rounded = 0
  } else if (rounded < 0) {
    rounded = -rounded
    includedNegativeMark = negativeMark
  }

  const days = Math.floor(rounded / 86400)
  const daysInSeconds = days * 86400
  const hours = Math.floor((rounded - daysInSeconds) / 3600)
  const hoursAndDaysInSeconds = daysInSeconds + hours * 3600
  const minutes = Math.floor((rounded - hoursAndDaysInSeconds) / 60)
  const secs = rounded - hoursAndDaysInSeconds - minutes * 60

  return (
    includedNegativeMark +
    formatTimeComponent(days, '.', true, false) +
    formatTimeComponent(hours, ':', days === 0) +
    formatTimeComponent(minutes, ':', false) +
    formatTimeComponent(secs)
  )
}
