import React from 'react'
import ReactDOM from 'react-dom'
import AWS, { Config, CognitoIdentityCredentials } from 'aws-sdk'
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js'
import config from './config'

Config.region = config.region
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: config.IdentityPoolId
})

const userPool = new CognitoUserPool({
  UserPoolId: config.UserPoolId,
  ClientId: config.ClientId
})

class SignUpForm extends React.Component {
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
    const email = this.state.email.trim()
    const password = this.state.password.trim()
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    ]
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err)
        return
      }
      console.log('user name is ' + result.user.getUsername())
      console.log('call result:', result)
    })
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

class SignInForm extends React.Component {
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

    const userPool = new CognitoUserPool({
      UserPoolId: config.UserPoolId,
      ClientId: config.ClientId
    })

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool
    })

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result) {
        const token = result.getIdToken().getJwtToken()
        console.log('Token:', token)
      },

      onFailure(err) {
        console.error(err)
      }
    })
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

const App = () =>
  <div>
    <h2>Sign Up</h2>
    <SignUpForm />
    <hr />
    <h2>Sign In</h2>
    <SignInForm />
  </div>

ReactDOM.render(<App />, document.querySelector('main'))
