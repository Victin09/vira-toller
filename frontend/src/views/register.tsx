import { useForm } from '../common/hooks/form'
import { IResponse } from '../common/interfaces/http.interface'

interface IRegisterForm {
  email: string
  fullName: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const { values, errors, register, handleSubmit } = useForm<IRegisterForm>()

  const sendForm = async (): Promise<void> => {
    console.log('values from form hook', values)
    console.log('errors from form hook', errors)
    const { email, fullName, password } = values;
    const result: IResponse = await (
      await fetch('http://localhost:3001/api/v1/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName, password }),
      })
    ).json()
    console.log('result', result);
  }

  return (
    <div className="h-full d-flex justify-content-center align-items-center">
      <div className="w-400 mw-full">
        <div className="card shadow-lg border-transparent p-0">
          <h2 className="card-title font-size-18 m-0 text-center pt-10">
            Crear una nueva cuenta
          </h2>
          <form className="content" onSubmit={handleSubmit(sendForm)} noValidate>
            <div className="form-group">
              <label htmlFor="email" className="required">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="example@example.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El correo electrónico es requerido"
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "El correo electrónico no es válido"
                  }
                })}
              />
             {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="fullName" className="required">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="John Doe"
                {...register("fullName", {
                  required: {
                    value: true,
                    message: "El nombre es requerido"
                  }
                })}
              />
              {errors.fullName && (
                <div className="invalid-feedback">{errors.fullName}</div>
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
                required
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida"
                  },
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres"
                  }
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="required">
                Confirmar contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida"
                  },
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres"
                  }
                })}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>
            <input
              className="btn btn-primary btn-block"
              value="Crear cuenta"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
