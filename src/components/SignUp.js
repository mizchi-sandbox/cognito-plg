/* @flow */
import React from 'react'
import { signUp } from '../api/auth'

export default function SignUp() {
  let emailRef, passwordRef
  return (
    <form
      onSubmit={ev => {
        ev.preventDefault()
        const email = emailRef.value.trim()
        const password = passwordRef.value.trim()
        signUp(email, password)
      }}
    >
      <input ref={ref => (emailRef = ref)} type="text" placeholder="Email" />
      <input
        ref={ref => (passwordRef = ref)}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="sign in" />
    </form>
  )
}
