export interface Validation {
  required?: {
    value: boolean
    message: string
  }
  minLength?: {
    value: number
    message: string
  }
  maxLength?: {
    value: number
    message: string
  }
  pattern?: {
    value: RegExp
    message: string
  }
}

export type Error<T> = Partial<Record<keyof T, string>>
