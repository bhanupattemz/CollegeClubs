import { createSlice } from '@reduxjs/toolkit';
import {
    GET_ACADEMIC_BOOKS_REQUEST,
    GET_ACADEMIC_BOOKS_SUCCESS,
    GET_ACADEMIC_BOOKS_FAIL,
    ADMIN_DELETE_ACADEMIC_BOOKS_REQUEST,
    ADMIN_DELETE_ACADEMIC_BOOKS_SUCCESS,
    ADMIN_DELETE_ACADEMIC_BOOKS_FAIL,
    ADMIN_CREATE_ACADEMIC_BOOKS_REQUEST,
    ADMIN_CREATE_ACADEMIC_BOOKS_SUCCESS,
    ADMIN_CREATE_ACADEMIC_BOOKS_FAIL,
    ADMIN_UPDATE_ACADEMIC_BOOKS_REQUEST,
    ADMIN_UPDATE_ACADEMIC_BOOKS_SUCCESS,
    ADMIN_UPDATE_ACADEMIC_BOOKS_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialacademicBooksState = {
    academicBooks: null,
    loading: false,
    error: null,
    success: null,
    academicBooksCount: 0,
};

// academicBook Slice
const academicBookSlice = createSlice({
    name: 'academicBooks',
    initialState: initialacademicBooksState,
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
            .addCase(GET_ACADEMIC_BOOKS_REQUEST, (state) => {
                state.loading = true;
                state.academicBooks = null
            })
            .addCase(GET_ACADEMIC_BOOKS_SUCCESS, (state, action) => {
                state.loading = false;
                state.academicBooks = action.payload.data;
                state.academicBooksCount = action.payload.data.length || 0
            })
            .addCase(GET_ACADEMIC_BOOKS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_DELETE_ACADEMIC_BOOKS_REQUEST, (state) => {
                state.loading = true;
                state.academicBooks = null
            })
            .addCase(ADMIN_DELETE_ACADEMIC_BOOKS_SUCCESS, (state, action) => {
                state.loading = false;
                state.academicBooks = action.payload.data;
                state.academicBooksCount = action.payload.data.length || 0
            })
            .addCase(ADMIN_DELETE_ACADEMIC_BOOKS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_CREATE_ACADEMIC_BOOKS_REQUEST, (state) => {
                state.loading = true;
                state.academicBooks = null
            })
            .addCase(ADMIN_CREATE_ACADEMIC_BOOKS_SUCCESS, (state, action) => {
                state.loading = false;
                state.success = true
            })
            .addCase(ADMIN_CREATE_ACADEMIC_BOOKS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_UPDATE_ACADEMIC_BOOKS_REQUEST, (state) => {
                state.loading = true;
                state.academicBooks = null
            })
            .addCase(ADMIN_UPDATE_ACADEMIC_BOOKS_SUCCESS, (state, action) => {
                state.loading = false;
                state.success = true
            })
            .addCase(ADMIN_UPDATE_ACADEMIC_BOOKS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const { clearErrors, clearSuccess } = academicBookSlice.actions;

export default academicBookSlice.reducer;

