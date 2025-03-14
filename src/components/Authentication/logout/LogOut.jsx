import { useSignOut } from '@nhost/react'

function LogoutButton() {
  const { signOut } = useSignOut()

  return <button onClick={signOut}>Logout</button>
}

export default LogoutButton