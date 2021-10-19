import { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const UpdateProfile = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { currentUser, updateEmail, updatePassword } = useAuth()
  const history = useHistory()

  const handleSignIn = e => {
    e.preventDefault()

    setError('')
    setLoading(false)

    const promises = []
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        setError('Failed to update the credentials')
      })
      .finally(setLoading(false))
    // if (passwordRef.current.value !== confirmPasswordRef.current.value)
    //   return setError('Passwords do not match')

    // try {
    //   setError('')
    //   setLoading(true)
    //   await signup(emailRef.current.value, passwordRef.current.value)
    //   history.push('/login')
    // } catch {
    //   setError('Failed to create an account')
    // }

    // setLoading(false)
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          <Form onSubmit={handleSignIn}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              ></Form.Control>
            </Form.Group>

            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                placeholder='Leave blank to keep same password'
              ></Form.Control>
            </Form.Group>

            <Form.Group id='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                ref={confirmPasswordRef}
                placeholder='Leave blank to keep same password'
              ></Form.Control>
            </Form.Group>
            {error && (
              <Alert className='mt-2' variant='danger'>
                {error}
              </Alert>
            )}

            <Button className='w-100 mt-3' type='submit'>
              Update profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/'>Cancel</Link>
      </div>
    </>
  )
}

export default UpdateProfile
