import { createSlice } from '@reduxjs/toolkit';
import {
    GET_SINGLE_EVENT_REQUEST,
    GET_SINGLE_EVENT_SUCCESS,
    GET_SINGLE_EVENT_FAIL,
    REGISTER_EVENT_REQUEST,
    REGISTER_EVENT_SUCCESS,
    REGISTER_EVENT_FAIL,
    CREATE_EVENT_REQUEST,
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_FAIL,
    UPDATE_EVENT_REQUEST,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAIL,
    SET_EVENT_SUCCESS_FALSE,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialsingleEventState = {
    singleEvent: null,
    loading: false,
    error: null,
    success: null,
    msg: null
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
        },
        clearSuccessMsg: (state) => {
            state.msg = null
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
                state.msg = "Successfully registered for the event!";
            })
            .addCase(REGISTER_EVENT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(CREATE_EVENT_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(CREATE_EVENT_SUCCESS, (state, action) => {
                state.loading = false;
                state.singleEvent = action.payload.data;
                state.success = true
                state.msg = "Event created successfully!";
            })
            .addCase(CREATE_EVENT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UPDATE_EVENT_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(UPDATE_EVENT_SUCCESS, (state, action) => {
                state.loading = false;
                state.singleEvent = action.payload.data;
                state.success = true
                state.msg = "Event updated successfully!";
            })
            .addCase(UPDATE_EVENT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(SET_EVENT_SUCCESS_FALSE, (state, action) => {
                state.success = false
            })


    },
});


export const { clearErrors, clearSuccess, clearSuccessMsg } = singleEventlice.actions;

export default singleEventlice.reducer;

