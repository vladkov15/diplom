import React, { FC } from 'react'
import styled from 'styled-components'

import styles from './Divider.module.scss'

interface DividerProps {
  size?: number
}

const Divider: FC<DividerProps> = React.memo(({ size = 60 }) => {
  return <DividerStyled className={styles.Divider} size={size} />
})

interface DividerStyledProps {
  size?: number
}

const DividerStyled = styled.hr<DividerStyledProps>`
  margin: ${({ size }) => size}px 0;
`

export default Divider
