import { createSlice } from '@reduxjs/toolkit';
import {
    TOP_ANNOUCEMENTS_REQUEST,
    TOP_ANNOUCEMENTS_SUCCESS,
    TOP_ANNOUCEMENTS_FAIL,
    ALL_ANNOUCEMENTS_REQUEST,
    ALL_ANNOUCEMENTS_SUCCESS,
    ALL_ANNOUCEMENTS_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialannoucementsState = {
    annoucements: null,
    loading: false,
    error: null,
    success: null,
    annoucementsCount: 0,
};

// annoucement Slice
const annoucementSlice = createSlice({
    name: 'annoucements',
    initialState: initialannoucementsState,
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
            .addCase(TOP_ANNOUCEMENTS_REQUEST, (state) => {
                state.loading = true;
                state.annoucements = null
            })
            .addCase(TOP_ANNOUCEMENTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.annoucements = action.payload.data;
                state.annoucementsCount=action.payload.data.length || 0
            })
            .addCase(TOP_ANNOUCEMENTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ALL_ANNOUCEMENTS_REQUEST, (state) => {
                state.loading = true;
                state.annoucements = null
            })
            .addCase(ALL_ANNOUCEMENTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.annoucements = action.payload.data;
                state.annoucementsCount=action.payload.data.length || 0
            })
            .addCase(ALL_ANNOUCEMENTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const { clearErrors, clearSuccess } = annoucementSlice.actions;

export default annoucementSlice.reducer;

