import { createSlice } from '@reduxjs/toolkit';
import {
    GET_SINGLE_EVENT_REQUEST,
    GET_SINGLE_EVENT_SUCCESS,
    GET_SINGLE_EVENT_FAIL,
    REGISTER_EVENT_REQUEST,
    REGISTER_EVENT_SUCCESS,
    REGISTER_EVENT_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialsingleEventState = {
    singleEvent: null,
    loading: false,
    error: null,
    success: null,
};

// singleEvent Slice
const singleEventlice = createSlice({
    name: 'singleEvent',
    initialState: initialsingleEventState,
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
            .addCase(GET_SINGLE_EVENT_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(GET_SINGLE_EVENT_SUCCESS, (state, action) => {
                state.loading = false;
                state.singleEvent = action.payload.data;
            })
            .addCase(GET_SINGLE_EVENT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(REGISTER_EVENT_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(REGISTER_EVENT_SUCCESS, (state, action) => {
                state.loading = false;
                state.singleEvent = action.payload.data;
            })
            .addCase(REGISTER_EVENT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const { clearErrors, clearSuccess } = singleEventlice.actions;

export default singleEventlice.reducer;

