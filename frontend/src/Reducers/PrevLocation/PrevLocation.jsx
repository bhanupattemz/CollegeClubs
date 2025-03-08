import { createSlice } from '@reduxjs/toolkit';
import {
    SET_PREV_LOCATION_REQUEST,
    SET_PREV_LOCATION_SUCCESS,
    SET_PREV_LOCATION_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialprevLocationState = {
    prevLocation: "/",
    loading: false,
    error: null,
    success: null,
};

// prevLocation Slice
const prevLocationSlice = createSlice({
    name: 'prevLocations',
    initialState: initialprevLocationState,
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
            .addCase(SET_PREV_LOCATION_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(SET_PREV_LOCATION_SUCCESS, (state, action) => {
                state.loading = false;
                state.prevLocation = action.payload;
            })
            .addCase(SET_PREV_LOCATION_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const { clearErrors, clearSuccess } = prevLocationSlice.actions;

export default prevLocationSlice.reducer;

