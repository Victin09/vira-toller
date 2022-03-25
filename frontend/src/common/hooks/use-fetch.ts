import { useRef, useState } from 'react'

import { Cache } from '../types/fetch.type'
import { State } from '../interfaces/fetch.interface'

export const useFetch = <T = unknown>(): State<T> => {
  const cache = useRef<Cache<T>>({})

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false)

  const [data, setData] = useState<T>()
  const [error, setError] = useState<Error>()

  const fetchData = async (
    url: string,
    // eslint-disable-next-line no-undef
    options?: RequestInit
  ) => {
    // Change the state of the request to loading
    // dispatch({ type: 'loading' })

    // // If a cache exists for this url, return it
    // if (cache.current[url]) {
    //   // Change the state of the request to fetched
    //   setData(cache.current[url])
    //   // dispatch({ type: 'fetched', payload: cache.current[url] })
    //   return
    // }

    // If not a cache exists for this url, fetch it
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = (await response.json()) as T
      // Set a cache for this url
      cache.current[url] = data
      if (cancelRequest.current) return

      // Change the state of the request to fetched
      // dispatch({ type: 'fetched', payload: data })
      setData(data)
    } catch (error) {
      if (cancelRequest.current) return

      // Change the state of the request to error
      // dispatch({ type: 'error', payload: error as Error })
      setError(error as Error)
    }
  }

  return {
    data,
    error,
    fetchData
  }
}
