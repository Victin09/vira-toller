import React, { useState } from 'react'
import { IForm, IRegisterField } from '../interfaces/form.interface'

import { Error, Validation } from '../types/form.type'

export const useForm = <T extends Record<keyof T, any> = {}>(): IForm<T> => {
  const [values, setValues] = useState<T>({} as T)
  const [errors, setErrors] = useState<Error<T>>({} as T)

  const validateField = (value: any, validation?: Validation): string => {
    // check if the rules exist since a field can not have validations
    if (validation) {
      // if the required rule is present
      if (validation.required) {
        // if the value is empty
        if (!value || !value.trim()) {
          return validation.required.message || 'This field is required'
        }
      }

      // if the minLength rule is present
      if (validation.minLength) {
        // if the value is less than the minLength
        if (value.length < validation.minLength) {
          return (
            validation.minLength.message ||
            `This field must be at least ${validation.minLength} characters`
          )
        }
      }

      // if the maxLength rule is present
      if (validation.maxLength) {
        // if the value is greater than the maxLength
        if (value.length > validation.maxLength) {
          return (
            validation.maxLength.message ||
            `This field must be less than ${validation.maxLength} characters`
          )
        }
      }

      // if the pattern rule is present
      if (validation.pattern) {
        // if the value does not match the pattern
        if (!validation.pattern.value.test(value)) {
          return validation.pattern.message || 'Invalid value'
        }
      }
    }

    // if the are not errors
    return ''
  }

  const register = (
    name: keyof T,
    validation?: Validation
  ): IRegisterField<T> => {
    return {
      // set the initial value
      value: values[name] || '',
      // value: values[name],
      onChange: (e: any) => {
        setValues({
          ...values,
          [name]: e.target.value
        })
      },
      onBlur: () => {
        const error = validateField(values[name], validation)
        setErrors({
          ...errors,
          [name]: error
        })
      }
    }
  }

  // handle form submission
  const handleSubmit =
    (callback: any) =>
      (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const error = Object.values(errors).find((err) => err)
        if (!error) {
          callback()
        }
      }

  return {
    values,
    errors,
    register,
    handleSubmit
  }
}
