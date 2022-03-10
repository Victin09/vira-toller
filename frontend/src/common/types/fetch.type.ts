export type Cache<T> = { [url: string]: T }

// discriminated union type
export type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }
