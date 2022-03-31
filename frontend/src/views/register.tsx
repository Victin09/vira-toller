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
    <div className="vds-height-1-1 vds-flex vds-flex-middle vds-flex-center">
      <div
        className="vds-section vds-section-muted vds-width-1-1 vds-flex vds-flex-middle vds-animation-fade"
        data-vds-height-viewport
      >
        <div className="vds-container">
          <div
            className="vds-grid-margin vds-grid vds-grid-stack"
            data-vds-grid
          >
            <div className="vds-width-1-1@m">
              <div className="vds-margin vds-width-large vds-margin-auto vds-card vds-card-default vds-card-body vds-border-rounded vds-box-shadow-small">
                <h3 className="vds-card-title vds-text-center">vira.TOLLER</h3>
                <form
                  noValidate
                  onSubmit={handleSubmit(sendForm)}
                  className="vds-margin-medium-top"
                >
                  <div className="vds-margin">
                    <div className="vds-inline vds-width-1-1">
                      <span
                        className="vds-form-icon"
                        vds-icon="icon: mail"
                      ></span>
                      <input
                        className={
                          'vds-input vds-form-control vds-border-rounded' +
                          (errors.email ? ' vds-form-danger' : '')
                        }
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
                    </div>
                    {errors.email && (
                      <div className="vds-text-danger vds-text-italic">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div className="vds-margin">
                    <div className="vds-inline vds-width-1-1">
                      <span
                        className="vds-form-icon"
                        vds-icon="icon: user"
                      ></span>
                      <input
                        className={
                          'vds-input vds-form-control vds-border-rounded' +
                          (errors.fullname ? ' vds-form-danger' : '')
                        }
                        type="text"
                        name="fullname"
                        placeholder="First and last name"
                        {...register('fullname', {
                          required: {
                            value: true,
                            message: 'Full name is required'
                          }
                        })}
                      />
                    </div>
                    {errors.fullname && (
                      <div className="vds-text-danger vds-text-italic">
                        {errors.fullname}
                      </div>
                    )}
                  </div>
                  <div className="vds-margin">
                    <div className="vds-inline vds-width-1-1">
                      <span
                        className="vds-form-icon"
                        vds-icon="icon: lock"
                      ></span>
                      <input
                        className={
                          'vds-input vds-form-control vds-border-rounded' +
                          (errors.password ? ' vds-form-danger' : '')
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
                    </div>
                    {errors.password && (
                      <div className="vds-text-danger vds-text-italic">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className="vds-margin">
                    <button
                      type="submit"
                      className="vds-button vds-button-primary vds-width-1-1 vds-border-rounded"
                    >
                      Register
                    </button>
                  </div>
                  <div className="vds-text-small vds-text-center">
                    Already have an account? Sign in{' '}
                    <Link to="/signin">here</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
