import { useHistory, Link } from "react-router-dom"
import { getToken } from "../../utils/auth"
import Navbar from '../../components/Navbar'
import { Flash } from "../../components/Flash/flash"
import { useMediaQuery } from "react-responsive";

const Signin = () => {
  const history = useHistory()
  if (localStorage.getItem('token')) {
    setTimeout(() => {
      window.flash('You are logged in', 'warning')
    }, 100)
    history.push('/dashboard')
  }
  const handleClick = async e => {
    e.preventDefault()
    let email = e.target.email.value
    let password = e.target.password.value
    if (!email || !password) window.flash('All fields are required', 'error')
    else {
      try {
        let user = await getToken({ email, password })
        localStorage.setItem('token', user.data.token)
        localStorage.setItem('name', user.data.user.name)
        localStorage.setItem('email', user.data.user.email)
        setTimeout(() => {
          window.flash('Logged in successfully', 'success')
        }, 100)
        history.push('/dashboard')
      } catch (error) {
        console.log(error.message)
          error.message = 'Request failed with status code 400' ?
          window.flash('Invalid email or password', 'error') :
          window.flash(error.message, 'error')
      }
    }
  }

  const isDesktop = useMediaQuery({
    query: "(min-width: 760px)",
  });
  let formWidth = {};

  if (isDesktop) {
    formWidth = {
      width: "40%",
    };
  }

  return (
    <>
      <Navbar />
      <Flash />
      <main>
        <div className="signin_main-content auth-page">
          <h1>Sign in</h1>

          {/* <div className="auth-options">
            <button>Continue with facebook</button>
            <button>Continue with Google</button>
          </div>

          <span aria-hidden="true" style={{marginBottom: '18px'}}>OR</span> */}

          <form action="" onSubmit={handleClick} style={formWidth}>
            {/* Email */}
            <div className="input-group">
              {/* <label htmlFor="email">Email:  </label> */}
              <input type="email" name="email" placeholder="Email:" />
            </div>

            {/* Password */}
            <div className="input-group">
              {/* <label htmlFor="password">Password:  </label> */}
              <input type="password" name="password" placeholder="Password:" />
              {/* <Link className="forgot_password-link" href="">
                Forgot password?
              </Link> */}
            </div>
            
            {/* button */}
            <button className="form_action-btn">Log in</button>
          </form>

          <div>You don't have an account? <Link to="/register">Sign up</Link> </div>
        </div>
      </main>
    </>
  )
}

export default Signin
