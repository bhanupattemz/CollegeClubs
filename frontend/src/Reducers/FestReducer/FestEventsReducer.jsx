import { createSlice } from '@reduxjs/toolkit';
import {
    GET_FEST_EVENTS_REQUEST,
    GET_FEST_EVENTS_SUCCESS,
    GET_FEST_EVENTS_FAIL,
    DELETE_FEST_EVENT_REQUEST,
    DELETE_FEST_EVENT_SUCCESS,
    DELETE_FEST_EVENT_FAIL,
    ADMIN_GET_ALL_FEST_EVENTS_REQUEST,
    ADMIN_GET_ALL_FEST_EVENTS_SUCCESS,
    ADMIN_GET_ALL_FEST_EVENTS_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialFestEventsState = {
    festEvents: null,
    loading: false,
    error: null,
    success: null,
    length: null,
    msg: null
};

// fest Slice
const festEventsSlice = createSlice({
    name: 'fest',
    initialState: initialFestEventsState,
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
            .addCase(GET_FEST_EVENTS_REQUEST, (state) => {
                state.loading = true;
                state.festEvents = null
            })
            .addCase(GET_FEST_EVENTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.festEvents = action.payload.data;
                state.length = action.payload.length
            })
            .addCase(GET_FEST_EVENTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DELETE_FEST_EVENT_REQUEST, (state) => {
                state.loading = true;
                state.festEvents = null
            })
            .addCase(DELETE_FEST_EVENT_SUCCESS, (state, action) => {
                state.loading = false;
                state.festEvents = action.payload.data;
                state.length = action.payload.length
                state.msg = "Fest event deleted successfully!";
            })
            .addCase(DELETE_FEST_EVENT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_GET_ALL_FEST_EVENTS_REQUEST, (state) => {
                state.loading = true;
                state.festEvents = null
            })
            .addCase(ADMIN_GET_ALL_FEST_EVENTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.festEvents = action.payload.data;
                state.length = action.payload.length
            })
            .addCase(ADMIN_GET_ALL_FEST_EVENTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});


export const { clearErrors, clearSuccess, clearSuccessMsg } = festEventsSlice.actions;

export default festEventsSlice.reducer;

