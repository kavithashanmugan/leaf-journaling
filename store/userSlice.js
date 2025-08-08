import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailAddress: "",
  isPremiumMember: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addEmail(state, action) {
      state.emailAddress = action.payload;
    },
  },
});

export const { addEmail } = userSlice.actions;
export default userSlice.reducer;
