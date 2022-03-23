import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    remove() {
      return null
    }
  }
})

export const { remove, set } = notificationSlice.actions

export const notify = (message, second = 3, duration = 1000) => {
  return dispatch => {
    dispatch(set(message))
    setTimeout(
      () => dispatch(remove()),
      second * duration
    )
  }
}

export default notificationSlice.reducer