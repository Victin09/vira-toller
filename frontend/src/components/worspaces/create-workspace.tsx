import { useFetch } from '../../common/hooks/use-fetch'
import { useForm } from '../../common/hooks/use-form'
import { useAuth } from '../../common/providers/auth.provider'

interface IWorkspaceProps {
  name: string
  description: string
  image: string
}

export const CreateWorkspaceModal = () => {
  const { getUser } = useAuth()
  const { errors, handleSubmit, register, values } = useForm<IWorkspaceProps>()
  const { fetchData, data, error } = useFetch<IWorkspaceProps>()

  const sendForm = () => {
    console.log({ values })
    fetchData('http://localhost:3000/workspaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        image: values.image,
        owner: getUser()!._id,
        members: [getUser()!._id]
      })
    })
  }

  return (
    <div
      className="modal fade"
      id="createWorkspaceModal"
      tabIndex={-1}
      aria-labelledby="createWorkspaceModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createWorkspaceModalLabel">
              Crear espacio de trabajo
            </h5>
            <button
              type="button"
              className="btn-close"
              data-vds-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(sendForm)} noValidate>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  aria-describedby="name"
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'El nombre es requerido'
                    }
                  })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Descripcion
                </label>
                <textarea
                  rows={3}
                  className="form-control"
                  id="description"
                  {...register('description')}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Imagen
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  {...register('image')}
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
