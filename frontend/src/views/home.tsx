import { useEffect } from 'react'
import { useAuth } from '../common/providers/useAuth'
import { useFetch } from '../common/hooks/useFetch'

const Home = () => {
  const { user } = useAuth()
  const { data, error } = useFetch(
    `http://localhost:3001/api/v1/boards/${user.email}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
  )

  useEffect(() => {
    console.log('user', user)
    console.log('data', data)
    console.log('error', error)
  }, [])

  return <h1>Hola mundo!</h1>
}

export default Home
