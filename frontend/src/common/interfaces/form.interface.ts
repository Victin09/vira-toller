import React from 'react'
import { Validation } from '../types/form.type'

export interface IRegisterField<T> {
  value: string | T[keyof T]
  onChange: (e: any) => void
  onBlur: () => void
}

export interface IForm<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  register: (
    name: keyof T,
    validation?: Validation | undefined
  ) => IRegisterField<T>
  handleSubmit: (callback: any) => (e: React.FormEvent<HTMLFormElement>) => void
}
