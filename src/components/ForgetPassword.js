import { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ForgetPassword = () => {
  const emailRef = useRef()
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { resetPassword } = useAuth()

  const handleForgetPassword = async e => {
    e.preventDefault()
    try {
      setSuccessMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setSuccessMessage('Check your mailbox for password reset instructions')
    } catch {
      setError('Failed to log in')
    }

    setLoading(false)
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>
          <Form onSubmit={handleForgetPassword}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required></Form.Control>
            </Form.Group>
            {successMessage && (
              <Alert variant='success' className='mt-3 w-100'>
                {successMessage}
              </Alert>
            )}
            {error && (
              <Alert className='mt-2' variant='danger'>
                {error}
              </Alert>
            )}

            <Button disabled={loading} className='w-100 mt-3' type='submit'>
              Reset password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/login'>Log In</Link>
      </div>
    </>
  )
}

export default ForgetPassword
