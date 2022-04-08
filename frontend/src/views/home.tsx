/* eslint-disable multiline-ternary */
import { useEffect } from 'react'
import { useAuth } from '../common/providers/auth.provider'
import { useFetch } from '../common/hooks/use-fetch'
import { Home as HomeModel } from '../models/home.model'
import { CreateWorkspaceModal } from '../components/worspaces/create-modal'

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
        <ul data-vds-accordion="multiple: true">
          {data.map((home) => (
            <li key={home.workspace.name}>
              <a className="vds-accordion-title" href="#">
                {home.workspace.name}
              </a>
              <div className="vds-accordion-content">
                {home.boards.length ? (
                  home.boards.map((board) => (
                    <div
                      className="vds-card vds-card-default vds-card-body vds-border-rounded vds-width-1-2@m"
                      key={board.name}
                    >
                      <h3 className="vds-card-title">{board.name}</h3>
                      <p>{board.descriptions}</p>
                    </div>
                  ))
                ) : (
                  <span>
                    Este espacio de trabajo no tiene tableros, pulsa{' '}
                    <a data-vds-toggle="target: #modal">aquí</a> para crear uno
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div>
            No se han encontrado espacios de trabajo, pulsa{' '}
            <a data-vds-toggle="target: #modal">aquí</a> para crear uno
          </div>

          <CreateWorkspaceModal />
        </>
      )}
    </div>
  )
}

export default Home
