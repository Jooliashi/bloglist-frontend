import { TextField, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { notify } from '../../reducers/notificationReducer'
import { setUser, saveToLocal } from '../../reducers/userReducer'
import { useField } from '../../hooks'
import service from '../../services/login'
const LoginForm = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const username = useField('text', 'username')
  const password = useField('password', 'password')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await service.login({
        username: username.value,
        password: password.value,
      });
      dispatch(setUser(user))
      saveToLocal(user)
      dispatch(notify(`welcome`))
      navigate('/')
    } catch {
      dispatch(notify('wrong credentials'))
    }
  }

  if (user) {
    return null
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <TextField {...username} />
          </div>
          <div>
            <TextField {...password} />
          </div>  
          <div>
            <Button variant="contained" color="primary" type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm