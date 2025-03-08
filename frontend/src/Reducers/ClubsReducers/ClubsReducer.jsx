import { createSlice } from '@reduxjs/toolkit';
import {
    ALL_CLUBS_REQUEST,
    ALL_CLUBS_SUCCESS,
    ALL_CLUBS_FAIL,
    GET_USER_CLUBS_REQUEST,
    GET_USER_CLUBS_SUCCESS,
    GET_USER_CLUBS_FAIL,
    ADMIN_DELETE_CLUB_REQUEST,
    ADMIN_DELETE_CLUB_SUCCESS,
    ADMIN_DELETE_CLUB_FAIL,
    GET_COORDINATOR_CLUBS_REQUEST,
    GET_COORDINATOR_CLUBS_SUCCESS,
    GET_COORDINATOR_CLUBS_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialclubsState = {
    clubs: null,
    loading: false,
    error: null,
    success: null,
    clubsCount: 0,
    msg: null
};

// club Slice
const clubSlice = createSlice({
    name: 'clubs',
    initialState: initialclubsState,
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
            .addCase(ALL_CLUBS_REQUEST, (state) => {
                state.loading = true;
                state.clubs = null
            })
            .addCase(ALL_CLUBS_SUCCESS, (state, action) => {
                state.loading = false;
                state.clubs = action.payload.data;
            })
            .addCase(ALL_CLUBS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GET_USER_CLUBS_REQUEST, (state) => {
                state.loading = true;
                state.clubs = null
            })
            .addCase(GET_USER_CLUBS_SUCCESS, (state, action) => {
                state.loading = false;
                state.clubs = action.payload.data.length != 0 && action.payload.data;
            })
            .addCase(GET_USER_CLUBS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_DELETE_CLUB_REQUEST, (state) => {
                state.loading = true;
                state.clubs = null
            })
            .addCase(ADMIN_DELETE_CLUB_SUCCESS, (state, action) => {
                state.loading = false;
                state.clubs = action.payload.data.length != 0 && action.payload.data;
                state.msg = "Club deleted successfully!";
            })
            .addCase(ADMIN_DELETE_CLUB_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GET_COORDINATOR_CLUBS_REQUEST, (state) => {
                state.loading = true;
                state.clubs = null
            })
            .addCase(GET_COORDINATOR_CLUBS_SUCCESS, (state, action) => {
                state.loading = false;
                state.clubs = action.payload.data.length != 0 && action.payload.data;
            })
            .addCase(GET_COORDINATOR_CLUBS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});


export const { clearErrors, clearSuccess, clearSuccessMsg } = clubSlice.actions;

export default clubSlice.reducer;

