import React, { useCallback } from 'react'
import classNames from 'classnames'

import styles from './AspectRatio.module.scss'

type AspectRatio = {
  horizontal: number
  vertical: number
}

export interface AspectRatioProps {
  aspectRatio?: AspectRatio
  className?: string
  fixable?: boolean
  children: React.ReactNode
}

const outerStyle: React.CSSProperties = { position: 'relative', maxHeight: '100vh' }

const helperStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  paddingTop: '56.25%',
  pointerEvents: 'none',
}

const AspectRatio = ({ aspectRatio, className, fixable, children }: AspectRatioProps) => {
  const getHelperStyle = useCallback((aspectRatio?: AspectRatio) => {
    return aspectRatio
      ? {
          ...helperStyle,
          paddingTop: ((aspectRatio.vertical * 100) / aspectRatio.horizontal).toFixed(2) + '%',
        }
      : helperStyle
  }, [])

  if (aspectRatio || !fixable) {
    const beforeStyle = getHelperStyle(aspectRatio)
    return (
      <div className={classNames(className, styles.AspectRatio)} style={outerStyle}>
        <div style={beforeStyle} />
        <div className={styles.AspectRatio__Content}>{children}</div>
      </div>
    )
  } else {
    return (
      <div
        className={classNames(
          className,
          styles.AspectRatio,
          fixable && styles.AspectRatio__Fixable,
        )}
      >
        <div className={styles.AspectRatio__Content}>{children}</div>
      </div>
    )
  }
}

export default React.memo(AspectRatio)
