import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: null,
  type: null,
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    },
    clearNotification(state) {
      return initialState
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notify = (message, type, timeout) => {
  return (dispatch) => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer
