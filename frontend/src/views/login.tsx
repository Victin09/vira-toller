import { useAuth } from '../common/providers/auth.provider'
import { useForm } from '../common/hooks/use-form'
import { Link } from 'react-router-dom'

interface ILoginProps {
  email: string
  password: string
}

const Login = () => {
  const { values, errors, register, handleSubmit } = useForm<ILoginProps>()
  const { signin, error } = useAuth()

  const sendForm = async (): Promise<void> => {
    console.log('values', values)
    console.log('errors', errors)
    const { email, password } = values
    signin({ email, password })
  }

  return (
    <div className="h-100p u-flex u-items-center u-justify-center">
      <div className="card p-2 max-w-sm">
        <h5 className="u-text-center">Iniciar sesión</h5>
        <div className="content m-0">
          <form onSubmit={handleSubmit(sendForm)} noValidate>
            <div className="col-lg-6">
              <label>Correo electrónico</label>
              <input
                className={
                  'input--sm' + (errors.email ? ' text-danger input-error' : '')
                }
                type="text"
                placeholder="nombre@email.com"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'El correo es requerido'
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'El correo no es válido'
                  }
                })}
              />
              {errors.email && (
                <span className="info text-danger">{errors.email}</span>
              )}
            </div>
            <div className="col-lg-6">
              <label>Contraseña</label>
              <input
                className={
                  'input--sm' +
                  (errors.password ? ' text-danger input-error' : '')
                }
                type="password"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'La contraseña es requerida'
                  }
                })}
              />
              {errors.password && (
                <span className="info text-danger">{errors.password}</span>
              )}
            </div>
            <button
              type="submit"
              className="btn-transparent outline w-100p mt-2"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
        <div className="card__footer level content">
          <span>
            ¿No tienes cuenta? Puedes crear una{' '}
            <Link to="/signup" className="u u-LR">
              aquí
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
