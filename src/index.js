import { Config, CognitoIdentityCredentials } from 'aws-sdk'
import {
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
