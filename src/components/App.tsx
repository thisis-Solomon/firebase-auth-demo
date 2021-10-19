import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import HomePage from './HomePage'
import SignUp from './SignUp'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgetPassword from './ForgetPassword'
import UpdateProfile from './UpdateProfile';

function App () {
  return (
    <AuthProvider>
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <div className='w-100' style={{ maxWidth: '600px' }}>
          <BrowserRouter>
            <PrivateRoute path='/' exact component={HomePage} />
            <PrivateRoute path='/update-profile' component={UpdateProfile} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
            <Route path='/forgot-password' component={ForgetPassword} />
          </BrowserRouter>
        </div>
      </Container>
    </AuthProvider>
  )
}

export default App
