import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  photo: "",
  age: "",
  gender: "",
  about: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    adduser: (state, action) => {
      return action.payload;
    },
    removeuser: () => {
      return initialState; // Reset to default empty user
    },
  },
});

export const { adduser, removeuser } = userSlice.actions;
export default userSlice.reducer;
