import { useState } from 'react'
import { IResponse } from '../common/interfaces/http.interface'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const sendForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    console.log({ email, password })
    const result: IResponse = await (
      await fetch('http://localhost:3001/api/v1/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
    ).json()
    if (!result.success) setError(true)
  }

  return (
    <div className="h-full d-flex justify-content-center align-items-center">
      <div className="w-400 mw-full">
        <div className="card shadow-lg border-transparent p-0">
          <h2 className="card-title font-size-18 m-0 text-center pt-10">
            Iniciar sesión
          </h2>
          <div className="content">
            <form onSubmit={sendForm}>
              <div className="form-group">
                <label htmlFor="email" className="required">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Username"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <div className="form-text">
                Only alphanumeric characters and underscores allowed.
              </div> */}
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
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <div className="form-text">
                Must be at least 8 characters long, and contain at least one
                special character.
              </div> */}
              </div>
              {error && (
                <div className="invalid-feedback">
                  Usuario o contraseña incorrectos.
                </div>
              )}
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
