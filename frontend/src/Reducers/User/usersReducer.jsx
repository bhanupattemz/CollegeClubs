import { createSlice } from '@reduxjs/toolkit';
import {
    ADMIN_GET_ALL_USERS_REQUEST,
    ADMIN_GET_ALL_USERS_SUCCESS,
    ADMIN_GET_ALL_USERS_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialuserState = {
    users: null,
    loading: false,
    error: null,
    success: null,
    usersCount:0
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

    },
});


export const { clearErrors, clearSuccess } = userSlice.actions;

export default userSlice.reducer;

