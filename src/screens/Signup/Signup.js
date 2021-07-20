import { useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { createUser, getToken } from "../../utils/auth"
import Navbar from '../../components/Navbar'
import { Flash } from "../../components/Flash/flash"
import { useMediaQuery } from "react-responsive";

const Signup = () => {
  const history = useHistory()
  if (localStorage.getItem('token')) {
    setTimeout(() => {
      window.flash('You are logged in', 'warning')
    }, 100)
    history.push('/dashboard')
  }
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async e => {
    e.preventDefault()
    let name = e.target.name.value
    let email = e.target.email.value
    let password = e.target.password.value
    if (!email || !name || !password) window.flash('All fields are required', 'error')
    else {
      try {
        setIsLoading(true)
        await createUser({ name, email, password })
        let user = await getToken({ email, password })
        localStorage.setItem('token', user.data.token)
        localStorage.setItem('name', user.data.user.name)
        localStorage.setItem('email', user.data.user.email)
        setTimeout(() => {
          window.flash('Logged in successfully', 'success')
        }, 100)
        setIsLoading(false)
        history.push('/dashboard')
      } catch (error) {
        setIsLoading(false)
        console.log(error.message)
        error.message = 'Request failed with status code 409' ?
          window.flash('Email chosen', 'error') :
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
        <div className="signup_main-content auth-page">
          <h1>Sign up</h1>
          {/* <div className="auth-options">
            <a>Continue with facebook</a>
            <a>Continue with Google</a>
          </div>
            
          <span aria-hidden="true" style={{marginBottom: '18px'}}>OR</span> */}

          <form action="" onSubmit={handleClick} style={formWidth}>
            {/* Name */}
            <div className="input-group">
              <label htmlFor="name">Full Name:  </label>
              <input type="name" name="name" />
            </div>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">Email:  </label>
              <input type="email" name="email" />
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password">Password:  </label>
              <input type="password" name="password" />
            </div>

            {/* button */}
            <button disabled={isLoading ? true : false} className="form_action-btn">{isLoading ? 'Creating account' : 'Register'}</button>
          </form>
          <div>Have an account? <Link to="/login">Sign in</Link> </div>
        </div>
      </main>
    </>
  )
}

export default Signup
