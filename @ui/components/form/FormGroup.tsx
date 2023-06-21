import { forwardRef, HTMLAttributes, useMemo } from 'react'
import PropTypes from 'prop-types'

import FormContext from './FormContext'
import { AsProp, PrefixRefForwardingComponent } from '@ui/helpers'

export interface FormGroupProps extends HTMLAttributes<HTMLElement>, AsProp {
  controlId?: string
}

const propTypes = {
  as: PropTypes.elementType,
  controlId: PropTypes.string,
  _ref: PropTypes.any,
}

const FormGroup: PrefixRefForwardingComponent<'div', FormGroupProps> = forwardRef(
  ({ controlId, as: Component = 'div', ...props }, ref) => {
    const context = useMemo(() => ({ controlId }), [controlId])

    return (
      <FormContext.Provider value={context}>
        <Component {...props} ref={ref} />
      </FormContext.Provider>
    )
  },
)

FormGroup.displayName = 'FormGroup'
FormGroup.propTypes = propTypes

export default FormGroup
