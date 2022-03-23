import { setToken } from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const loggedAppUser = 'loggedAppUser'

export const saveToLocal = (user) => {
  window.localStorage.setItem(
    loggedAppUser,
    JSON.stringify(user)
  )
}

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      if (action.payload) {
        setToken(action.payload.token)
      }
      return action.payload
    }
  }
}) 

export const { setUser } = userSlice.actions

export const logout = () => {
  window.localStorage.removeItem(loggedAppUser)
}

export default userSlice.reducer