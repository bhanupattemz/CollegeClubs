import { createSlice } from '@reduxjs/toolkit';
import {
    GET_FEST_EVENTS_REQUEST,
    GET_FEST_EVENTS_SUCCESS,
    GET_FEST_EVENTS_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialFestEventsState = {
    festEvents: null,
    loading: false,
    error: null,
    success: null,
    length: null
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

    },
});


export const { clearErrors, clearSuccess } = festEventsSlice.actions;

export default festEventsSlice.reducer;

