import { useSignUpEmailPassword } from '@nhost/react'
import { useState } from 'react'

function SignUp() {
  const { signUpEmailPassword, isLoading, error } = useSignUpEmailPassword()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    await signUpEmailPassword(email, password)
  }

  return (
    <div>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp} disabled={isLoading}>Sign Up</button>
      {error && <p>{error.message}</p>}
    </div>
  )
}

export default SignUp