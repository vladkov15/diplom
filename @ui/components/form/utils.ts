import React from 'react'

export interface IFormReturnValue {
  [name: string]: string | number | boolean | 'null'
}

export const convertFormEventToValues = (e: React.FormEvent<HTMLFormElement>): IFormReturnValue => {
  const res: IFormReturnValue = {}

  if (e.target) {
    for (let i = 0; i < e.target.length; i++) {
      const target = e.target as HTMLFormElement
      const el = target[i] as HTMLFormElement
      if (el.name) {
        if (el.type == 'checkbox') {
          res[el.name] = el.checked
        } else {
          res[el.name] = el.value || undefined
        }
      }
    }
  }

  return res
}

export const convertChangeEventToValues = (
  e: React.ChangeEvent<HTMLFormElement>,
): IFormReturnValue => {
  const res: IFormReturnValue = {}
  if (e.target.form) {
    for (let i = 0; i < e.target.form.length; i++) {
      if (e.target.form[i].name) {
        res[e.target.form[i].name] = e.target.form[i].value
      }
    }
  }

  return res
}
