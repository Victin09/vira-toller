/* eslint-disable multiline-ternary */
import { useEffect } from 'react'
import { useAuth } from '../common/providers/auth.provider'
import { useFetch } from '../common/hooks/use-fetch'
import { Home as HomeModel } from '../models/home.model'
import { Link } from 'react-router-dom'

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
    <div className="u-flex m-4">
      {data && (
        <div className="u-flex-column u-flex-1 u-flex-align-center u-flex-justify-center">
          <h6 className="uppercase">Tus espacios de trabajo</h6>
          {data.length > 0 ? (
            data.map((home: HomeModel) => (
              <>
                <Link
                  to={`/workspace/${home.workspace.name}`}
                  key={home.workspace.name}
                >
                  {home.workspace.name}
                </Link>
                {home.boards.length > 0 ? (
                  <ul>
                    {home.boards.map((board: any) => (
                      <li key={board._id}>
                        <Link
                          to={`/workspace/${home.workspace.name}/${board.name}`}
                        >
                          {board.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="info">
                    Este espacio de trabajo no tiene tableros
                  </span>
                )}
              </>
            ))
          ) : (
            <Link to="/workspace/create">Crear espacio de trabajo</Link>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
