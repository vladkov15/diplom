import { createContext } from 'react'

// TODO
interface FormContextType {
  controlId?: any
}

const FormContext = createContext<FormContextType>({})

export default FormContext
