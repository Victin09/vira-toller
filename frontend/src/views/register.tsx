import { useState } from 'react'

const Register = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')

  const sendForm = () => {
    console.log(email, name, password, confirmpassword)
  }

  return (
    <div className="h-full d-flex justify-content-center align-items-center">
      <div className="w-400 mw-full">
        <div className="card shadow-lg border-transparent p-0">
          <h2 className="card-title font-size-18 m-0 text-center pt-10">
            Crear una nueva cuenta
          </h2>
          <form className="content">
            <div className="form-group">
              <label htmlFor="username" className="required">
                Correo electrónico
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <div className="form-text">
                Only alphanumeric characters and underscores allowed.
              </div> */}
            </div>
            <div className="form-group">
              <label htmlFor="firstname" className="required">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="firstname"
                required
                onChange={(e) => setName(e.target.value)}
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
            <div className="form-group">
              <label htmlFor="confirmpassword" className="required">
                Confirmar contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmpassword"
                placeholder="Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {/* <div className="form-text">
                Must be at least 8 characters long, and contain at least one
                special character.
              </div> */}
            </div>
            <input
              className="btn btn-primary btn-block"
              value="Crear cuenta"
              readOnly
              onClick={() => sendForm()}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
