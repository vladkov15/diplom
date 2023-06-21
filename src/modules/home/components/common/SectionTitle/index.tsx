import { FC } from 'react'
import styled from 'styled-components'

import styles from './SectionTitle.module.scss'

type TTextAlign = 'left' | 'center' | 'right'

interface SectionTitleProps {
  withUnderline?: boolean
  label?: string
  textAlign?: TTextAlign
  children?: React.ReactNode
}

const SectionTitle: FC<SectionTitleProps> = ({
  label,
  withUnderline,
  textAlign = 'left',
  children,
}) => {
  return (
    <SectionTitleStyled className={styles.SectionTitle} textAlign={textAlign}>
      <h2 className={styles.SectionTitle__Title}>{label || children}</h2>
      {withUnderline && <span className={styles.SectionTitle__Underline} />}
    </SectionTitleStyled>
  )
}

interface SectionTitleStyledProps {
  textAlign: TTextAlign
}

const SectionTitleStyled = styled.div<SectionTitleStyledProps>`
  text-align: ${({ textAlign }) => textAlign};
`

export default SectionTitle
