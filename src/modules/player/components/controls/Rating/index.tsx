import React, { FC } from 'react'

import Button from '@ui/components/button'

import { ControlDropdown } from '@/modules/player/components/generic'

import StarRating from '@/components/StarReting'

const RatingDropdownTrigger = React.forwardRef<HTMLButtonElement>((props, ref) => (
  <Button ref={ref} variant='icon' size='sm' icon {...props}>
    <i className='icon-star' />
  </Button>
))
RatingDropdownTrigger.displayName = 'RatingDropdownTrigger'

export interface RatingProps {
  value?: number
  onChange?: (value: number) => void
}

const Rating: FC<RatingProps> = React.memo(({ value, onChange }) => {
  return (
    <ControlDropdown trigger={RatingDropdownTrigger}>
      <StarRating value={value} onChange={onChange} />
    </ControlDropdown>
  )
})
Rating.displayName = 'Rating'

export default Rating
