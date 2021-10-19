import { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const SignUp = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()
  const history = useHistory()

  const handleSignIn = async e => {
    e.preventDefault()
    if (passwordRef.current.value !== confirmPasswordRef.current.value)
      return setError('Passwords do not match')

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push('/login')
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          <Form onSubmit={handleSignIn}>
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

            <Form.Group id='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                ref={confirmPasswordRef}
                required
              ></Form.Control>
            </Form.Group>
            {error && (
              <Alert className='mt-2' variant='danger'>
                {error}
              </Alert>
            )}

            <Button className='w-100 mt-3' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='login'>Log In</Link>
      </div>
    </>
  )
}

export default SignUp
