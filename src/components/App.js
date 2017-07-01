/* @flow */
import React from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'

export default function App() {
  return (
    <div>
      <h2>Sign Up</h2>
      <SignUp />
      <hr />
      <h2>Sign In</h2>
      <SignIn />
    </div>
  )
}
