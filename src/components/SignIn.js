import React from 'react'
import { signIn } from '../api/auth'

export default function SignIn() {
  let emailRef, passwordRef
  return (
    <form
      onSubmit={ev => {
        ev.preventDefault()
        const email = emailRef.value.trim()
        const password = passwordRef.value.trim()
        signIn(email, password)
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
