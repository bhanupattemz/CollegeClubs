import { createSlice } from '@reduxjs/toolkit';
import {
    GET_SINGLE_CLUB_REQUEST,
    GET_SINGLE_CLUB_SUCCESS,
    GET_SINGLE_CLUB_FAIL,
    REGISTER_CLUB_REQUEST,
    REGISTER_CLUB_SUCCESS,
    REGISTER_CLUB_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialsingleClubState = {
    singleClub: null,
    loading: false,
    error: null,
    success: null,
};

// singleClub Slice
const singleClubSlice = createSlice({
    name: 'singleClub',
    initialState: initialsingleClubState,
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
            .addCase(GET_SINGLE_CLUB_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(GET_SINGLE_CLUB_SUCCESS, (state, action) => {
                state.loading = false;
                state.singleClub = action.payload.data;
            })
            .addCase(GET_SINGLE_CLUB_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(REGISTER_CLUB_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(REGISTER_CLUB_SUCCESS, (state, action) => {
                state.loading = false;
                state.singleClub = action.payload.data;
            })
            .addCase(REGISTER_CLUB_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});


export const { clearErrors, clearSuccess } = singleClubSlice.actions;

export default singleClubSlice.reducer;

