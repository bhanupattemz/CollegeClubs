import { createSlice } from '@reduxjs/toolkit';
import {
    ALL_LETTERS_REQUEST,
    ALL_LETTERS_SUCCESS,
    ALL_LETTERS_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initiallettersState = {
    letters: null,
    loading: false,
    error: null,
    success: null,
    lettersCount: 0,
};

// letter Slice
const letterSlice = createSlice({
    name: 'letters',
    initialState: initiallettersState,
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
            .addCase(ALL_LETTERS_REQUEST, (state) => {
                state.loading = true;
                state.letters = null
            })
            .addCase(ALL_LETTERS_SUCCESS, (state, action) => {
                state.loading = false;
                state.letters = action.payload.data;
                state.lettersCount=action.payload.data.length || 0
            })
            .addCase(ALL_LETTERS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const { clearErrors, clearSuccess } = letterSlice.actions;

export default letterSlice.reducer;

