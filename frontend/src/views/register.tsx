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
    <div className="row h-100 align-items-center justify-content-center">
      <div className="col-sm-12 col-md-4">
        <div className="vds-container">
          <div className="card shadow p-3">
            <div className="card-body">
              <h2 className="card-title text-center mb-2">Sign Up</h2>
              <form noValidate onSubmit={handleSubmit(sendForm)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    className={
                      'form-control' + (errors.email ? ' is-invalid' : '')
                    }
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email address"
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Email is required'
                      },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback fst-italic">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Fullname
                  </label>
                  <input
                    className={
                      'form-control' + (errors.fullname ? ' is-invalid' : '')
                    }
                    type="text"
                    name="fullname"
                    placeholder="First and last name"
                    {...register('fullname', {
                      required: {
                        value: true,
                        message: 'Fullname is required'
                      }
                    })}
                  />
                  {errors.fullname && (
                    <div className="invalid-feedback fst-italic">
                      {errors.fullname}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Password
                  </label>
                  <input
                    className={
                      'form-control' + (errors.password ? ' is-invalid' : '')
                    }
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...register('password', {
                      required: {
                        value: true,
                        message: 'Password is required'
                      },
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      }
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback fst-italic">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary d-grid gap-2"
                  >
                    Continue
                  </button>
                </div>
                <div className="mt-2 text-secondary">
                  Already have an account? Sign in{' '}
                  <Link to="/signin">here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
