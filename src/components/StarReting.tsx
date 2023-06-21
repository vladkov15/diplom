import React, { FC, useState } from 'react'

import styles from './StarRating.module.scss'

export interface StarRatingProps {
  value?: number
  onChange?: (value: number) => void
}

const StarRating: FC<StarRatingProps> = React.memo(({ value, onChange }) => {
  const [rating, setRating] = useState(value || 0)
  const [hover, setHover] = useState(0)

  const handleClick = (value: number) => {
    setRating(value)
    onChange?.(value)
  }

  return (
    <ul className={styles.StarRating}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => (
        <li key={value}>
          <button
            className={(hover || rating) >= index ? 'on' : 'off'}
            onClick={() => handleClick(value)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            {(hover || rating) >= index ? (
              <i className='icon-star' />
            ) : (
              <i className='icon-star-outline' />
            )}
          </button>
        </li>
      ))}
    </ul>
  )
})
StarRating.displayName = 'StarRating'

export default StarRating
