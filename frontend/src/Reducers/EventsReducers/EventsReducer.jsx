import { createSlice } from '@reduxjs/toolkit';
import {
    ALL_EVENTS_REQUEST,
    ALL_EVENTS_SUCCESS,
    ALL_EVENTS_FAIL,
    GET_CLUB_EVENTS_REQUEST,
    GET_CLUB_EVENTS_SUCCESS,
    GET_CLUB_EVENTS_FAIL,
    GET_USER_EVENTS_REQUEST,
    GET_USER_EVENTS_SUCCESS,
    GET_USER_EVENTS_FAIL,
    ADMIN_DELETE_EVENT_REQUEST,
    ADMIN_DELETE_EVENT_SUCCESS,
    ADMIN_DELETE_EVENT_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialeventsState = {
    events: null,
    loading: false,
    error: null,
    success: null,
    eventsCount: 0,
};

// event Slice
const eventSlice = createSlice({
    name: 'events',
    initialState: initialeventsState,
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
            .addCase(ALL_EVENTS_REQUEST, (state) => {
                state.loading = true;
                state.events = null
            })
            .addCase(ALL_EVENTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.events = action.payload.data;
                state.eventsCount = action.payload.data.length;
            })
            .addCase(ALL_EVENTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GET_CLUB_EVENTS_REQUEST, (state) => {
                state.loading = true;
                state.events = null
            })
            .addCase(GET_CLUB_EVENTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.events = action.payload.data;
                state.eventsCount = action.payload.data.length;
            })
            .addCase(GET_CLUB_EVENTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GET_USER_EVENTS_REQUEST, (state) => {
                state.loading = true;
                state.events = null
            })
            .addCase(GET_USER_EVENTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.events = action.payload.data.length != 0 && action.payload.data;
                state.eventsCount = action.payload.data.length;
            })
            .addCase(GET_USER_EVENTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_DELETE_EVENT_REQUEST, (state) => {
                state.loading = true;
                state.events = null
            })
            .addCase(ADMIN_DELETE_EVENT_SUCCESS, (state, action) => {
                state.loading = false;
                state.events = action.payload.data.length != 0 && action.payload.data;
                state.eventsCount = action.payload.data.length;
            })
            .addCase(ADMIN_DELETE_EVENT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const { clearErrors, clearSuccess } = eventSlice.actions;

export default eventSlice.reducer;

