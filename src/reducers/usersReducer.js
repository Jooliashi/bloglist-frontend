import { createSlice } from '@reduxjs/toolkit'
import service from '../services/users'
const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers:
    {
      setUsers(state, action) {
        return action.payload
      }
    }
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const data = await service.getAll()
    dispatch(setUsers(data))
  }
}

export default usersSlice.reducer