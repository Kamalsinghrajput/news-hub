import { useSignInEmailPassword } from '@nhost/react'
import { useState } from 'react'

function SignIn() {
  const { signInEmailPassword, isLoading, error } = useSignInEmailPassword()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    await signInEmailPassword(email, password)
  }

  return (
    <div>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignIn} disabled={isLoading}>Sign In</button>
      {error && <p>{error.message}</p>}
    </div>
  )
}

export default SignIn
