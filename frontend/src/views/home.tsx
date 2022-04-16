import { useEffect } from 'react'
import { useAuth } from '../common/providers/auth.provider'
import { useFetch } from '../common/hooks/use-fetch'
import { Home as HomeModel } from '../models/home.model'
import { CreateWorkspaceModal } from '../components/worspaces/create-workspace'

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
    <div>
      {data && data.length > 0 && (
        <div className="mt-2">
          <h4>Bienvenido {getUser()!.fullname}</h4>
          {data.map((home: HomeModel) => (
            <div
              className="accordion accordion-flush"
              id="accordionExample"
              key={home.workspace.id}
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-vds-toggle="collapse"
                    data-vds-target={`#${home.workspace.name.replace(
                      / /g,
                      ''
                    )}`}
                    aria-expanded="true"
                    aria-controls={home.workspace.name}
                  >
                    {home.workspace.name}
                  </button>
                </h2>
                <div
                  id={home.workspace.name.replace(/ /g, '')}
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  // data-vds-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It
                    is shown by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!data ||
        (data.length === 0 && (
          <div className="mt-2">
            <h4>Bienvenido {getUser()!.fullname}</h4>
            <span>
              No existe ningún espacio de trabajo, para crear uno pulsa{' '}
              <a
                href="#"
                data-vds-toggle="modal"
                data-vds-target="#createWorkspaceModal"
              >
                aquí
              </a>
            </span>
          </div>
        ))}
      <CreateWorkspaceModal />
    </div>
  )
}

export default Home
