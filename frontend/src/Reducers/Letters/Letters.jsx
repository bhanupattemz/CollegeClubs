import { createSlice } from '@reduxjs/toolkit';
import {
    ALL_LETTERS_REQUEST,
    ALL_LETTERS_SUCCESS,
    ALL_LETTERS_FAIL,
    ADMIN_DELETE_LETTER_REQUEST,
    ADMIN_DELETE_LETTER_SUCCESS,
    ADMIN_DELETE_LETTER_FAIL,
    ADMIN_CREATE_LETTER_REQUEST,
    ADMIN_CREATE_LETTER_SUCCESS,
    ADMIN_CREATE_LETTER_FAIL,
    UPDATE_LETTER_REQUEST,
    UPDATE_LETTER_SUCCESS,
    UPDATE_LETTER_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initiallettersState = {
    letters: null,
    loading: false,
    error: null,
    success: null,
    lettersCount: 0,
    msg: null
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
        },
        clearSuccessMsg: (state) => {
            state.msg = null
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
                state.lettersCount = action.payload.data.length || 0
            })
            .addCase(ALL_LETTERS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_DELETE_LETTER_REQUEST, (state) => {
                state.loading = true;
                state.letters = null
            })
            .addCase(ADMIN_DELETE_LETTER_SUCCESS, (state, action) => {
                state.loading = false;
                state.letters = action.payload.data;
                state.lettersCount = action.payload.data.length || 0
                state.msg = "Letter deleted successfully!";
            })
            .addCase(ADMIN_DELETE_LETTER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_CREATE_LETTER_REQUEST, (state) => {
                state.loading = true;
                state.letters = null
                
            })
            .addCase(ADMIN_CREATE_LETTER_SUCCESS, (state, action) => {
                state.loading = false;
                state.letters = action.payload.data;
                state.lettersCount = action.payload.data.length || 0
                state.success = true
                state.msg = "Letter created successfully!";

            })
            .addCase(ADMIN_CREATE_LETTER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UPDATE_LETTER_REQUEST, (state) => {
                state.loading = true;
                state.letters = null
            })
            .addCase(UPDATE_LETTER_SUCCESS, (state, action) => {
                state.loading = false;
                state.letters = action.payload.data;
                state.lettersCount = action.payload.data.length || 0
                state.success = true
                state.msg = "Letter updated successfully!";
            })
            .addCase(UPDATE_LETTER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});


export const { clearErrors, clearSuccess, clearSuccessMsg } = letterSlice.actions;

export default letterSlice.reducer;

