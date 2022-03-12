import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../common/providers/useAuth'
import { useForm } from '../common/hooks/useForm'
import { Response } from '../common/types/fetch.type'
import { User } from '../models/user.model'

interface ILoginProps {
  email: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()
  const { values, errors, register, handleSubmit } = useForm<ILoginProps>()
  const { login } = useAuth()
  const [error, setError] = useState('')

  const sendForm = async (): Promise<void> => {
    console.log('values from form hook', values)
    console.log('errors from form hook', errors)
    const { email, password } = values
    const result: Response<User> = await (
      await fetch('http://192.168.1.112:3001/api/v1/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      })
    ).json()
    if (result.success) {
      console.log('result', result)
      login(result.data!)
      navigate('/')
    } else {
      setError(
        result.message === 'Invalid credentials'
          ? 'Email or password is incorrect'
          : 'Something went wrong'
      )
    }
  }

  return (
    <div className="h-full d-flex justify-content-center align-items-center">
      <div className="w-400 mw-full">
        <div className="card shadow-lg border-transparent p-0">
          <h2 className="card-title font-size-18 m-0 text-center pt-10">
            Iniciar sesión
          </h2>
          {error && <span className="invalid-feedback">{error}</span>}
          <div className="content">
            <form onSubmit={handleSubmit(sendForm)} noValidate>
              <div className="form-group">
                <label htmlFor="email" className="required">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Username"
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
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password" className="required">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'La contraseña es requerida'
                    }
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <input
                className="btn btn-primary btn-block"
                value="Iniciar sesión"
                readOnly
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
