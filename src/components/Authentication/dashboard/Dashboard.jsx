import { useUser } from '@nhost/react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Dashboard() {
  const { user, isLoading } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/signin') // Redirect to login if not authenticated
    }
  }, [user, isLoading, navigate])

  if (isLoading) return <p>Loading...</p>

  return <h1>Welcome, {user?.email}!</h1>
}
export default  Dashboard