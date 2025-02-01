import { createSlice } from '@reduxjs/toolkit';
import {
    GET_SINGLE_FEST_EVENT_REQUEST,
    GET_SINGLE_FEST_EVENT_SUCCESS,
    GET_SINGLE_FEST_EVENT_FAIL,
    CREATE_FEST_EVENT_REQUEST,
    CREATE_FEST_EVENT_SUCCESS,
    CREATE_FEST_EVENT_FAIL,
    UPDATE_FEST_EVENT_REQUEST,
    UPDATE_FEST_EVENT_SUCCESS,
    UPDATE_FEST_EVENT_FAIL,
    SET_FEST_EVENT_SUCCESS_FALSE,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialsingleFestEventState = {
    singleFestEvent: null,
    loading: false,
    error: null,
    success: null,
};

// singleFestEvent Slice
const singleFestEventSlice = createSlice({
    name: 'singleFestEvent',
    initialState: initialsingleFestEventState,
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
            .addCase(GET_SINGLE_FEST_EVENT_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(GET_SINGLE_FEST_EVENT_SUCCESS, (state, action) => {
                state.loading = false;
                state.singleFestEvent = action.payload.data;
            })
            .addCase(GET_SINGLE_FEST_EVENT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(CREATE_FEST_EVENT_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(CREATE_FEST_EVENT_SUCCESS, (state, action) => {
                state.loading = false;
                state.singleFestEvent = action.payload.data;
                state.success = true
            })
            .addCase(CREATE_FEST_EVENT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UPDATE_FEST_EVENT_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(UPDATE_FEST_EVENT_SUCCESS, (state, action) => {
                state.loading = false;
                state.success = true
            })
            .addCase(UPDATE_FEST_EVENT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(SET_FEST_EVENT_SUCCESS_FALSE, (state, action) => {
                state.success = false
            })
    },
});


export const { clearErrors, clearSuccess } = singleFestEventSlice.actions;

export default singleFestEventSlice.reducer;

