import React, { FC } from 'react'
import SkeletonSlider, { SkeletonSliderProps } from './SkeletonSlider'

import styles from './Slider.module.scss'

interface EmptySkeletonSlider extends SkeletonSliderProps {
  renderFn?: () => React.ReactNode
}

const EmptySkeletonSlider: FC<EmptySkeletonSlider> = ({ renderFn, ...props }) => {
  return (
    <div className={styles.EmptySkeletonSlider}>
      <SkeletonSlider style={{ visibility: 'hidden' }} {...props} />
      <div className={styles.EmptySkeletonSlider__Body}>{renderFn?.()}</div>
    </div>
  )
}

export default Object.assign(EmptySkeletonSlider)
