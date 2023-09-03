import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'loginUser',
  initialState: {
    value: localStorage.getItem("user")? JSON.parse( localStorage.getItem("user")): null,
  },
  reducers: {
    logedUser: (state, action) => {
      state.value = action.payload
    },


  }
})

// Action creators are generated for each case reducer function
export const { logedUser } = userSlice.actions

export default userSlice.reducer