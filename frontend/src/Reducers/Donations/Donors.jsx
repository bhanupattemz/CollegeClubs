import { createSlice } from '@reduxjs/toolkit';
import {
    TOP_DONARS_REQUEST,
    TOP_DONARS_SUCCESS,
    TOP_DONARS_FAIL,
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
                state.donarsCount=action.payload.data.length || 0
            })
            .addCase(TOP_DONARS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const { clearErrors, clearSuccess } = donarSlice.actions;

export default donarSlice.reducer;

