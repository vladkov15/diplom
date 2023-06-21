import React, { FC, useContext, useEffect, useState } from 'react'

import { useValidateParentControlPasswordMutation } from '../../parentControl.api'

import { ParentControlContext } from '../../parentControl.context'
import { Alert } from '@ui/index'

import ParentControlForm, { IParentControlForm, ParentControlFormProps } from '../ParentControlForm'

import styles from './ValidateParentControlForm.module.scss'

export interface ValidateParentControlFormProps extends ParentControlFormProps {
  onValidateSuccess?: () => void
}

const ValidateParentControlForm: FC<ValidateParentControlFormProps> = React.memo(
  ({ title, onValidateSuccess, ...props }) => {
    const [
      validatePassword,
      { isLoading: validateLoading, isSuccess: validateSuccess, isError: validateError },
    ] = useValidateParentControlPasswordMutation()

    const { setAvailable } = useContext(ParentControlContext)

    const [alert, setAlert] = useState({ show: false, variant: 'warning', title: '', message: '' })

    useEffect(() => {
      if (validateSuccess) {
        setAvailable(true)
        onValidateSuccess?.()
      }
    }, [validateSuccess])

    useEffect(() => {
      if (validateError) {
        setAlert((prev) => ({
          ...prev,
          show: true,
          title: 'Внимение',
          message: 'Вы ввели неверный пароль.',
        }))
      }
    }, [validateError])

    const handleChange = () => {
      if (alert.show) handleCloseAlert()
    }

    const handleSubmit = ({ password }: IParentControlForm) => {
      validatePassword({ data: { password } })
    }

    const handleCloseAlert = () => setAlert((prev) => ({ ...prev, show: false }))
    const handleHideAlert = () => setAlert((prev) => ({ ...prev, title: '', message: '' }))

    return (
      <div className={styles.ValidateParentControlForm}>
        <ParentControlForm
          {...props}
          title={title || 'Родительский контроль'}
          busy={props.busy || validateLoading}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
        <Alert
          className='mt-4'
          show={alert.show}
          variant={alert.variant}
          onClose={handleCloseAlert}
          onHide={handleHideAlert}
          transition={false}
          dismissible
          full
        >
          <Alert.Header as='h4' className='mb-2'>
            {alert.title}
          </Alert.Header>
          <Alert.Body>{alert.message}</Alert.Body>
        </Alert>
      </div>
    )
  },
)
ValidateParentControlForm.displayName = 'ValidateParentControlForm'

export default ValidateParentControlForm
