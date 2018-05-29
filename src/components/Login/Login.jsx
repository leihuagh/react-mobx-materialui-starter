import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { RegisterLink } from '../Register'
import { PasswordForgetLink } from '../PasswordForget'
import { auth } from '../../firebase'
import * as routes from '../../routes'

const LoginPage = ({ history }) => (
  <div>
    <h1>Login</h1>
    <LoginForm history={history} />
    <PasswordForgetLink />
    <RegisterLink />
  </div>
)

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
})

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email, password } = this.state

    const { history } = this.props

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        history.push(routes.DASHBOARD)
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
      })

    event.preventDefault()
  }

  render() {
    const { email, password, error } = this.state

    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event =>
            this.setState(updateByPropertyName('email', event.target.value))
          }
          type="text"
          placeholder="Email Address"
          autoComplete="email"
        />
        <input
          value={password}
          onChange={event =>
            this.setState(updateByPropertyName('password', event.target.value))
          }
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <button disabled={isInvalid} type="submit">
          Login
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default withRouter(LoginPage)

export { LoginForm }
