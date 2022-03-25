import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className="header header-fixed unselectable header-animated header-clear">
        <div className="header-brand">
          <div className="nav-item no-hover">
            <h6 className="title">Vira Toller</h6>
          </div>
          <div className="nav-item nav-btn" id="header-btn">
            {' '}
            <span></span> <span></span> <span></span>{' '}
          </div>
        </div>
        <div className="header-nav" id="header-menu">
          <div className="nav-right">
            <div className="nav-item">
              <Link to="/signin" className="nav-link">
                Iniciar sesión
              </Link>
              <Link to="/signup" className="nav-link">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="hero fullscreen">
          <div className="hero-body">
            <div className="content">
              <div className="u-flex u-items-center text-center">
                <div className="u-flex-column w-40p">
                  <h1>Vira Toller</h1>
                  <h6 className="font-alt font-light">
                    La forma de trabajar de tu equipo es única, lo mismo que
                    Vira Toller. Vira Toller es una herramienta flexible para la
                    gestión del trabajo, con la que los equipos pueden diseñar
                    planes, colaborar en proyectos, organizar flujos de trabajo
                    y hacer un seguimiento del progreso de una manera visual,
                    productiva y gratificante. Vira Toller gestiona los grandes
                    hitos y las tareas diarias, desde la lluvia de ideas hasta
                    la planificación y la ejecución, para colaborar juntos y
                    sacar el trabajo adelante
                  </h6>
                </div>
                <div className="u-flex u-flex-grow-1 u-justify-center">
                  asdfasdfas
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
