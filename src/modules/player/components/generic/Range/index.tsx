import React, { useRef, MouseEvent, useEffect, useMemo, FC } from 'react'
import classNames from 'classnames'

import styles from './Range.module.scss'

interface RangeProps
  extends Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type' | 'value' | 'max' | 'min'
  > {
  value: number
  onValueChange: (value: number) => void

  max?: number
  min?: number

  tooltipConvertFn?: (value: number) => string

  thumb?: boolean
  tooltip?: boolean

  rangeClassName?: string

  appendOuterContent?: React.ReactNode
  prependOuterContent?: React.ReactNode
  appendOuterContentClassname?: string
  prependOuterContentClassname?: string
}

const Range: FC<RangeProps> = (props) => {
  const {
    appendOuterContent,
    appendOuterContentClassname,
    prependOuterContent,
    prependOuterContentClassname,
    rangeClassName,
    thumb,
    tooltip = true,
    style,
    // min = 0,
    max = 100,
    tooltipConvertFn,
    onValueChange,
    value,
  } = props

  const secondaryLayerRef = useRef<HTMLDivElement | null>(null)
  const progressLayerRef = useRef<HTMLDivElement | null>(null)
  const progressTooltipRef = useRef<HTMLDivElement | null>(null)

  const handleOnMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const node = secondaryLayerRef.current
    const tooltip = progressTooltipRef.current
    if (node) {
      if (tooltip) {
        tooltip.style.display = 'flex'
        tooltip.style.left = `${e.nativeEvent.offsetX + 25}px`

        const fraction = e.nativeEvent.offsetX / e.currentTarget.clientWidth
        const percentage = fraction * 100
        let tooltipValue: string | undefined = undefined
        if (tooltipConvertFn) {
          tooltipValue = tooltipConvertFn(Math.round(fraction * max))
        }
        if (percentage < 0) {
          node.style.width = '0%'
          return
        }
        if (percentage > 100) {
          node.style.width = '100%'
          return
        }
        node.style.width = `${percentage}%`
        tooltip.innerText = `${tooltipValue ? tooltipValue : Math.round(fraction * max)}`
      }
    }
  }

  const handleMouseLeave = () => {
    const node = secondaryLayerRef.current
    const tooltip = progressTooltipRef.current
    if (node) {
      node.style.width = '0%'
    }
    if (tooltip) {
      tooltip.style.display = 'none'
    }
  }

  const handleTryToChangeValue = (e: MouseEvent<HTMLDivElement>) => {
    const fraction = e.nativeEvent.offsetX / e.currentTarget.clientWidth
    let newValue = fraction * max
    if (fraction < 0) {
      newValue = 0
    }
    if (newValue > 0.99 * max) {
      newValue = max
    }
    onValueChange(newValue)
  }

  const progressPercentage = useMemo(() => {
    if (value === 0 || max === 0) return 0
    return (value / max) * 100
  }, [value, max])

  useEffect(() => {
    const node = progressLayerRef.current
    if (!node) return

    node.style.width = `${progressPercentage}%`
  }, [progressPercentage])

  return (
    <div className={classNames(props.className, styles.Range)} style={style}>
      {prependOuterContent && (
        <div className={classNames(prependOuterContentClassname, styles.Prepend)}>
          {prependOuterContent}
        </div>
      )}

      <div
        className={classNames(rangeClassName, styles.Range)}
        onMouseMove={handleOnMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTryToChangeValue}
      >
        <div className={classNames(styles.Range__Layer, styles.Range__Background)} />
        <div
          ref={secondaryLayerRef}
          className={classNames(styles.Range__Layer, styles.Range__Secondary)}
        />
        <div
          ref={progressLayerRef}
          className={classNames(styles.Range__Layer, styles.Range__Progress)}
        />

        {thumb && <div />}
      </div>
      {tooltip && <div ref={progressTooltipRef} className={classNames(styles.ProgressTooltip)} />}

      {appendOuterContent && (
        <div className={classNames(appendOuterContentClassname, styles.Append)}>
          {appendOuterContent}
        </div>
      )}
    </div>
  )
}

Range.displayName = 'Range'

export default Range
