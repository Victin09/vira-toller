import { useForm } from '../../common/hooks/use-form'

interface IWorkspaceProps {
  name: string
  description: string
  image: string
}

export const CreateWorkspaceModal = () => {
  const { errors, handleSubmit, register, values } = useForm<IWorkspaceProps>()

  return (
    <div id="modal" className="vds-flex-top" data-vds-modal>
      <div className="vds-modal-dialog vds-margin-auto-vertical vds-border-rounded">
        <button
          className="vds-modal-close-default"
          type="button"
          data-vds-close
        ></button>
        <div className="vds-modal-body">
          <h6 className="vds-modal-title">Crear espacio de trabajo</h6>
          <form
            className="vds-form-stacked vds-flex vds-flex-column vds-grid-row-medium"
            noValidate
            data-vds-grid
          >
            <div>
              <label className="vds-form-label" htmlFor="name">
                Nombre
              </label>
              <div className="vds-form-controls">
                <input
                  className="vds-input vds-border-rounded"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Some text..."
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'El nombre es requerido'
                    }
                  })}
                />
              </div>
            </div>
            <div>
              <label className="vds-form-label" htmlFor="description">
                Descripcion
              </label>
              <div className="vds-form-controls">
                <textarea
                  className="vds-textarea vds-border-rounded"
                  id="description"
                  name="description"
                  rows={2}
                  placeholder="Some text..."
                  style={{ resize: 'none' }}
                  {...register('description')}
                />
              </div>
            </div>
            <div>
              <label className="vds-form-label" htmlFor="form-stacked-text">
                Imagen
              </label>
              <div className="vds-form-controls ">
                <div
                  data-vds-form-custom="target: true"
                  className="vds-width-1-1"
                >
                  <input type="file" />
                  <input
                    className="vds-input vds-border-rounded vds-width-1-1"
                    type="text"
                    placeholder="Select file"
                    disabled
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="vds-margin">
            <button
              className="vds-button vds-button-primary vds-border-rounded"
              type="submit"
            >
              Crear
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
