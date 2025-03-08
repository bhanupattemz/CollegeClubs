import { createSlice } from '@reduxjs/toolkit';
import {
    ADMIN_GET_ALL_USERS_REQUEST,
    ADMIN_GET_ALL_USERS_SUCCESS,
    ADMIN_GET_ALL_USERS_FAIL,
    ADMIN_SET_BLOCK_STATUS_REQUEST,
    ADMIN_SET_BLOCK_STATUS_SUCCESS,
    ADMIN_SET_BLOCK_STATUS_FAIL,
    ADMIN_DELETE_USER_REQUEST,
    ADMIN_DELETE_USER_SUCCESS,
    ADMIN_DELETE_USER_FAIL,
    ADMIN_UPDATE_USER_REQUEST,
    ADMIN_UPDATE_USER_SUCCESS,
    ADMIN_UPDATE_USER_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialuserState = {
    users: null,
    loading: false,
    error: null,
    success: null,
    usersCount: 0,
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
            .addCase(ADMIN_GET_ALL_USERS_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(ADMIN_GET_ALL_USERS_SUCCESS, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
            })
            .addCase(ADMIN_GET_ALL_USERS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_SET_BLOCK_STATUS_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(ADMIN_SET_BLOCK_STATUS_SUCCESS, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                state.msg = "User block status updated successfully."
            })
            .addCase(ADMIN_SET_BLOCK_STATUS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_DELETE_USER_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(ADMIN_DELETE_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
                state.msg = "User deleted successfully."
            })
            .addCase(ADMIN_DELETE_USER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_UPDATE_USER_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(ADMIN_UPDATE_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.success = true
                state.users = action.payload.data;
                state.msg = "User updated successfully."
            })
            .addCase(ADMIN_UPDATE_USER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const { clearErrors, clearSuccess, clearSuccessMsg } = userSlice.actions;

export default userSlice.reducer;

