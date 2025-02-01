import { createSlice } from '@reduxjs/toolkit';
import {
    TOP_DONARS_REQUEST,
    TOP_DONARS_SUCCESS,
    TOP_DONARS_FAIL,
    GET_ALL_DONARS_REQUEST,
    GET_ALL_DONARS_SUCCESS,
    GET_ALL_DONARS_FAIL,
    ADMIN_DELETE_DONAR_REQUEST,
    ADMIN_DELETE_DONAR_SUCCESS,
    ADMIN_DELETE_DONAR_FAIL,
    ADMIN_CREATE_DONAR_REQUEST,
    ADMIN_CREATE_DONAR_SUCCESS,
    ADMIN_CREATE_DONAR_FAIL,
    ADMIN_UPDATE_DONAR_REQUEST,
    ADMIN_UPDATE_DONAR_SUCCESS,
    ADMIN_UPDATE_DONAR_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialdonarsState = {
    donars: null,
    loading: false,
    error: null,
    success: null,
    donarsCount: 0,
};

// donar Slice
const donarSlice = createSlice({
    name: 'donars',
    initialState: initialdonarsState,
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
            .addCase(TOP_DONARS_REQUEST, (state) => {
                state.loading = true;
                state.donars = null
            })
            .addCase(TOP_DONARS_SUCCESS, (state, action) => {
                state.loading = false;
                state.donars = action.payload.data;
                state.donarsCount = action.payload.data.length || 0
            })
            .addCase(TOP_DONARS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(GET_ALL_DONARS_REQUEST, (state) => {
                state.loading = true;
                state.donars = null
            })
            .addCase(GET_ALL_DONARS_SUCCESS, (state, action) => {
                state.loading = false;
                state.donars = action.payload.data;
                state.donarsCount = action.payload.data.length || 0
            })
            .addCase(GET_ALL_DONARS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_DELETE_DONAR_REQUEST, (state) => {
                state.loading = true;
                state.donars = null
            })
            .addCase(ADMIN_DELETE_DONAR_SUCCESS, (state, action) => {
                state.loading = false;
                state.donars = action.payload.data;
                state.donarsCount = action.payload.data.length || 0
            })
            .addCase(ADMIN_DELETE_DONAR_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_CREATE_DONAR_REQUEST, (state) => {
                state.loading = true;
                state.donars = null
            })
            .addCase(ADMIN_CREATE_DONAR_SUCCESS, (state, action) => {
                state.loading = false;
                state.success = true
            })
            .addCase(ADMIN_CREATE_DONAR_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_UPDATE_DONAR_REQUEST, (state) => {
                state.loading = true;
                state.donars = null
            })
            .addCase(ADMIN_UPDATE_DONAR_SUCCESS, (state, action) => {
                state.loading = false;
                state.success = true
            })
            .addCase(ADMIN_UPDATE_DONAR_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const { clearErrors, clearSuccess } = donarSlice.actions;

export default donarSlice.reducer;

