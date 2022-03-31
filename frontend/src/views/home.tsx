/* eslint-disable multiline-ternary */
import { useEffect } from 'react'
import { useAuth } from '../common/providers/auth.provider'
import { useFetch } from '../common/hooks/use-fetch'
import { Home as HomeModel } from '../models/home.model'

const Home = () => {
  const { getUser } = useAuth()
  const { fetchData, data, error } = useFetch<HomeModel[]>()

  useEffect(() => {
    if (getUser()) {
      fetchData(
        `http://localhost:3000/workspaces/user/${getUser()!._id}/boards`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }
      )
      console.log('data', data)
      console.log('error', error)
    }
  }, [])

  return (
    <div className="vds-flex">
      {data && data.length > 0 ? (
        <ul data-vds-accordion>
          {data.map((home) => (
            <li key={home.workspace.name}>
              <a className="vds-accordion-title" href="#">
                {home.workspace.name}
              </a>
              <div className="vds-accordion-content">
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor reprehenderit.
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Home
