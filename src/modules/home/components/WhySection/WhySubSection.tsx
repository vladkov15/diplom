import React, { FC } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import classNames from 'classnames'

import styles from './WhySubSection.module.scss'

type TDirection = 'row' | 'row-reverse'

interface WhySubSectionProps {
  image: string | React.ReactNode
  title: string
  description?: string
  direction?: TDirection
  children?: React.ReactNode
}

const WhySubSection: FC<WhySubSectionProps> = ({
  image,
  title,
  description,
  direction = 'row',
  children,
}) => {
  return (
    <WhySubSectionStyled className={styles.WhySubSection} direction={direction}>
      <div className={styles.WhySubSection__ImageContainer}>
        {React.isValidElement(image)
          ? React.cloneElement(image, {
              ...image.props,
              className: classNames(image.props.className, styles.WhySubSection__Image),
            })
          : null}
        {typeof image === 'string' ? (
          <Image
            className={styles.WhySubSection__Image}
            src={image}
            sizes='(max-width: 768px) 100vw, max-width: 1200px) 50vw, 33vw'
            alt={title}
            fill
          />
        ) : null}
      </div>
      <div className={styles.WhySubSection__Body}>
        <h3 className={styles.WhySubSection__Title}>{title}</h3>
        {description && <p className={styles.WhySubSection__Description}>{description}</p>}
        <div className={styles.WhySubSection__Content}>{children}</div>
      </div>
    </WhySubSectionStyled>
  )
}

interface WhySubSectionStyledProps {
  direction: TDirection
}

const WhySubSectionStyled = styled.div<WhySubSectionStyledProps>`
  flex-direction: ${({ direction }) => direction};
`

export default WhySubSection
