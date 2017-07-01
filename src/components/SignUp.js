/* @flow */
import React from 'react'
import { signUp } from '../api/auth'

export default class SignUp extends React.Component {
  state: {
    email: string,
    password: string
  }

  constructor(props: any) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange(e: any) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e: any) {
    this.setState({ password: e.target.value })
  }

  handleSubmit(e: any) {
    e.preventDefault()
    const email = this.state.email.trim()
    const password = this.state.password.trim()
    signUp(email, password)
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
        <input type="submit" value="register" />
      </form>
    )
  }
}
