import React, { FC } from 'react'
import styled from 'styled-components'

interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const PageTitle: FC<PageTitleProps> = ({ className, children }) => {
  return <PageTitleStyled className={className}>{children}</PageTitleStyled>
}

const PageTitleStyled = styled.h3`
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  text-transform: uppercase;
  margin: 30px 0;
`

export default PageTitle
