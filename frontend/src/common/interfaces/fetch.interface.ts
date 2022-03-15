export interface State<T> {
  data?: T
  error?: Error
  // eslint-disable-next-line no-undef
  fetchData: (url: string, options?: RequestInit) => void
}
