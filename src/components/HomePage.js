import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const HomePage = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const handleLogout = async () => {
    try {
      setError('')
      await logout()

      history.push('/login')
    } catch (error) {
      setError('Failed to logout')
    }
  }
  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-2'>Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <p>
            <strong>Email: </strong> {currentUser.email}
          </p>
          <Link
            to='update-profile'
            type='button'
            className='btn btn-primary w-100 mt-3'
          >
            Update profile
          </Link>
        </Card.Body>
      </Card>

      <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default HomePage
