import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        isLoggedIn: false,
        user: null,
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value.isLoggedIn = true;
            state.value.user = action.payload;
        },
        logout: (state) => {
            state.value.isLoggedIn = false;
            state.value.user = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
