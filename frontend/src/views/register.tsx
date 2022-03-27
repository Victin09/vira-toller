/* eslint-disable multiline-ternary */
import { Link } from 'react-router-dom'
import { useForm } from '../common/hooks/use-form'
import { useAuth } from '../common/providers/auth.provider'
import { SignUp } from '../models/auth.model'

const Register = () => {
  const { values, errors, register, handleSubmit } = useForm<SignUp>()
  const { error, signup } = useAuth()

  const sendForm = async (): Promise<void> => {
    const { email, fullname, password, confirmPassword } = values
    signup({ email, fullname, password, confirmPassword })
  }

  return (
    <div className="h-100p u-flex u-items-center u-justify-center">
      <div className="card p-2 max-w-sm">
        <h5 className="u-text-center">Registrate</h5>
        <div className="content m-0">
          {error && <span className="info text-danger">{error}</span>}
          <form onSubmit={handleSubmit(sendForm)} noValidate>
            <div className="col-lg-6">
              <label>Nombre y apellidos</label>
              <input
                className={
                  'input--sm' +
                  (errors.fullname ? ' text-danger input-error' : '')
                }
                type="text"
                {...register('fullname', {
                  required: {
                    value: true,
                    message: 'El nombre es obligatorio'
                  }
                })}
              />
              {errors.fullname && (
                <span className="info text-danger">{errors.fullname}</span>
              )}
            </div>
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
              Enviar
            </button>
          </form>
        </div>
        <div className="card__footer level content">
          <span>
            ¿Ya tienes cuenta? Puedes iniciar sesión{' '}
            <Link to="/signin" className="u u-RL">
              aquí
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register
