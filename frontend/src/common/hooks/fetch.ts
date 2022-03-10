import { useEffect, useReducer, useRef } from 'react'

import { Cache, Action } from '../types/fetch.type'
import { State } from '../interfaces/fetch.interface'

export const useFetch = <T = unknown>(
  url?: string,
  // eslint-disable-next-line no-undef
  options?: RequestInit
): State<T> => {
  const cache = useRef<Cache<T>>({})

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false)

  const initialState: State<T> = {
    error: undefined,
    data: undefined
  }

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState }
      case 'fetched':
        return { ...initialState, data: action.payload }
      case 'error':
        return { ...initialState, error: action.payload }
      default:
        return state
    }
  }

  // Current state of the request
  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return

    const fetchData = async () => {
      // Change the state of the request to loading
      dispatch({ type: 'loading' })

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        // Change the state of the request to fetched
        dispatch({ type: 'fetched', payload: cache.current[url] })
        return
      }

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
        dispatch({ type: 'fetched', payload: data })
      } catch (error) {
        if (cancelRequest.current) return

        // Change the state of the request to error
        dispatch({ type: 'error', payload: error as Error })
      }
    }

    fetchData()

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true
    }
  }, [url])

  return state
}
