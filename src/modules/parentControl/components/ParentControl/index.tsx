import React, { FC, useContext } from 'react'
import classNames from 'classnames'

import { ParentControlContext } from '../../parentControl.context'
import ValidateParentControlForm from '../ValidateParentControlForm'

import styles from './ParentControl.module.scss'

interface ParentControlProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const ParentControl: FC<ParentControlProps> = ({ className, children }) => {
  const { available } = useContext(ParentControlContext)

  if (available) return <>{children}</>

  return (
    <div className={classNames(className, styles.ParentControl)}>
      <ValidateParentControlForm
        title='Родительский контроль'
        description='Контент закрыт родительским контролем'
      />
    </div>
  )
}

export default ParentControl
