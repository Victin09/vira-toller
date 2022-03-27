export type Cache<T> = { [url: string]: T }

export type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }

export type Response<T> = {
  status: string
  message?: string
  data?: T
}
