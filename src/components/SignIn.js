import React from 'react'
import { signIn } from '../api/auth'

export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const username = this.state.email.trim()
    const password = this.state.password.trim()
    signIn(username, password)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          value={this.state.email}
          placeholder="Email"
          onChange={this.handleEmailChange.bind(this)}
        />
        <input
          type="password"
          value={this.state.password}
          placeholder="Password"
          onChange={this.handlePasswordChange.bind(this)}
        />
        <input type="submit" value="sign in" />
      </form>
    )
  }
}
