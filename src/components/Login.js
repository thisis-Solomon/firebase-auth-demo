import { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const history = useHistory()

  const handleLogIn = async e => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch {
      setError('Failed to log in')
    }

    setLoading(false)
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          <Form onSubmit={handleLogIn}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required></Form.Control>
            </Form.Group>

            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>

            {error && (
              <Alert className='mt-2' variant='danger'>
                {error}
              </Alert>
            )}

            <Button className='w-100 mt-3' type='submit'>
              Log In
            </Button>
          </Form>

          <div className='w-100 text-center mt-2'>
            <Link to='forgot-password'>Forgot password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='signup'>Sign Up</Link>
      </div>
    </>
  )
}

export default Login
