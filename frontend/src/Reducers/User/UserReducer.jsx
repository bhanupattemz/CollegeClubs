import { createSlice } from '@reduxjs/toolkit';
import {
    GET_CURRENT_USER_REQUEST,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_FAIL,
    SIGN_IN_USER_REQUEST,
    SIGN_IN_USER_SUCCESS,
    SIGN_IN_USER_FAIL,
    SIGN_UP_USER_REQUEST,
    SIGN_UP_USER_SUCCESS,
    SIGN_UP_USER_FAIL,
    SIGNOUT_USER_REQUEST,
    SIGNOUT_USER_SUCCESS,
    SIGNOUT_USER_FAIL,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    DELETE_CURRENT_USER_REQUEST,
    DELETE_CURRENT_USER_SUCCESS,
    DELETE_CURRENT_USER_FAIL,
    UPDATE_PROFILE_PASSWORD_REQUEST,
    UPDATE_PROFILE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_TOKEN_GENERATE_REQUEST,
    RESET_PASSWORD_TOKEN_GENERATE_SUCCESS,
    RESET_PASSWORD_TOKEN_GENERATE_FAIL,
    GENERATE_ADMIN_REQUEST,
    GENERATE_ADMIN_SUCCESS,
    GENERATE_ADMIN_FAIL,
    ADMIN_SIGNUP_REQUEST,
    ADMIN_SIGNUP_SUCCESS,
    ADMIN_SIGNUP_FAIL,
    COORDINATOR_VERIFY_REQUEST,
    COORDINATOR_VERIFY_SUCCESS,
    COORDINATOR_VERIFY_FAIL,
    SET_IS_UPDATE_FALSE,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialuserState = {
    user: null,
    loading: false,
    error: null,
    success: null,
    isauthenticate: false,
    isUpdated: false,
    msg: null
};

// user Slice
const userSlice = createSlice({
    name: 'users',
    initialState: initialuserState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        },
        clearSuccessMsg: (state) => {
            state.msg = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SIGN_IN_USER_REQUEST, (state) => {
                state.loading = true;
                state.user = null
            })
            .addCase(SIGN_IN_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.isauthenticate = action.payload.isauthenticate
                state.msg = "Sign-in successful! Welcome aboard!"
            })
            .addCase(SIGN_IN_USER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(SIGNOUT_USER_REQUEST, (state) => {
                state.loading = true;
                state.user = null
            })
            .addCase(SIGNOUT_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.isauthenticate = action.payload.isauthenticate
                state.msg = "Sign-out successful. You have been logged out successfully"
            })
            .addCase(SIGNOUT_USER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DELETE_CURRENT_USER_REQUEST, (state) => {
                state.loading = true;
                state.user = null
            })
            .addCase(DELETE_CURRENT_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.isauthenticate = action.payload.isauthenticate
                state.msg = "Account deletion successful. Your account has been removed."
            })
            .addCase(DELETE_CURRENT_USER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GET_CURRENT_USER_REQUEST, (state) => {
                state.loading = true;
                state.user = null
            })
            .addCase(GET_CURRENT_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.isauthenticate = action.payload.isauthenticate
            })
            .addCase(GET_CURRENT_USER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(SIGN_UP_USER_REQUEST, (state) => {
                state.loading = true;
                state.user = null
            })
            .addCase(SIGN_UP_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.isauthenticate = action.payload.isauthenticate
                state.msg = "Sign-up successful! Welcome to our platform."
            })
            .addCase(SIGN_UP_USER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UPDATE_USER_PROFILE_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(UPDATE_USER_PROFILE_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.isUpdated = true
                state.msg = "Profile updated successfully. Your changes have been saved."
            })
            .addCase(UPDATE_USER_PROFILE_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(SET_IS_UPDATE_FALSE, (state, action) => {
                state.isUpdated = false
            })
            .addCase(UPDATE_PROFILE_PASSWORD_REQUEST, (state) => {
                state.loading = true;
                state.user = null
            })
            .addCase(UPDATE_PROFILE_PASSWORD_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.isUpdated = true
                state.msg = "Password updated successfully. Your changes have been applied."
            })
            .addCase(UPDATE_PROFILE_PASSWORD_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(RESET_PASSWORD_TOKEN_GENERATE_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(RESET_PASSWORD_TOKEN_GENERATE_SUCCESS, (state, action) => {
                state.loading = false;
                state.isUpdated = true
                state.msg = "Password reset request successful. Please check your email for further instructions."
            })
            .addCase(RESET_PASSWORD_TOKEN_GENERATE_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(RESET_PASSWORD_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(RESET_PASSWORD_SUCCESS, (state, action) => {
                state.loading = false;
                state.isUpdated = true
                state.msg = "Password reset successful. You can now log in with your new password."
            })
            .addCase(RESET_PASSWORD_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GENERATE_ADMIN_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(GENERATE_ADMIN_SUCCESS, (state, action) => {
                state.loading = false;
                state.msg = "Admin transfer successful. Email sent. Account will be deleted after sign-up."
            })
            .addCase(GENERATE_ADMIN_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_SIGNUP_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(ADMIN_SIGNUP_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.isauthenticate = action.payload.isauthenticate
                state.msg = "Admin sign-up successful. Welcome aboard!"
            })
            .addCase(ADMIN_SIGNUP_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(COORDINATOR_VERIFY_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(COORDINATOR_VERIFY_SUCCESS, (state, action) => {
                state.loading = false;
                state.isUpdated = true
                state.msg = "Coordinator verification request successful."
            })
            .addCase(COORDINATOR_VERIFY_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })
    },
});


export const { clearErrors, clearSuccess, clearSuccessMsg } = userSlice.actions;

export default userSlice.reducer;

