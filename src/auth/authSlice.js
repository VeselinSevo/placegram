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
