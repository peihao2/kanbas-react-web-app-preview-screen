// /Users/phoebelin/2024/summer/webdev/kanbas-react-web-app/src/Kanbas/Account/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,

  // Add userRole with type
  userRole: null, 
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;

      // Store userRole in Redux
      state.userRole = action.payload?.role || null;
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
