/* @flow */
import { Config, CognitoIdentityCredentials } from 'aws-sdk'
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js'
import config from '../config'

Config.region = config.region
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: config.IdentityPoolId
})

const userPool = new CognitoUserPool({
  UserPoolId: config.UserPoolId,
  ClientId: config.ClientId
})

export function signUp(email: string, password: string) {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    ]
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

export function signIn(email: string, password: string) {
  const userPool = new CognitoUserPool({
    UserPoolId: config.UserPoolId,
    ClientId: config.ClientId
  })

  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool
  })

  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password
  })

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result: any) {
        const token = result.getIdToken().getJwtToken()
        console.log('Token:', token)
        resolve({ token })
      },

      onFailure(error: Error) {
        reject(error)
      }
    })
  })
}
