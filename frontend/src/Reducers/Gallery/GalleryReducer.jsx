import { createSlice } from '@reduxjs/toolkit';
import {
    ALL_GALLERY_PHOTOS_REQUEST,
    ALL_GALLERY_PHOTOS_SUCCESS,
    ALL_GALLERY_PHOTOS_FAIL,
    ADMIN_DELETE_GALLERY_PHOTOS_REQUEST,
    ADMIN_DELETE_GALLERY_PHOTOS_SUCCESS,
    ADMIN_DELETE_GALLERY_PHOTOS_FAIL,
    ADMIN_CREATE_GALLERY_REQUEST,
    ADMIN_CREATE_GALLERY_SUCCESS,
    ADMIN_CREATE_GALLERY_FAIL,
    SET_GALLERY_SUCCESS_FALSE,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialgalleryState = {
    gallery: null,
    loading: false,
    error: null,
    success: null,
    galleryCount: 0,
    msg: null
};

// gallery Slice
const gallerySlice = createSlice({
    name: 'gallery',
    initialState: initialgalleryState,
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
            .addCase(ALL_GALLERY_PHOTOS_REQUEST, (state) => {
                state.loading = true;
                state.gallery = null
            })
            .addCase(ALL_GALLERY_PHOTOS_SUCCESS, (state, action) => {
                state.loading = false;
                state.gallery = action.payload.data;
                state.galleryCount = action.payload.data.length || 0
            })
            .addCase(ALL_GALLERY_PHOTOS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_DELETE_GALLERY_PHOTOS_REQUEST, (state) => {
                state.loading = true;
                state.gallery = null
            })
            .addCase(ADMIN_DELETE_GALLERY_PHOTOS_SUCCESS, (state, action) => {
                state.loading = false;
                state.gallery = action.payload.data;
                state.galleryCount = action.payload.data.length || 0
                state.msg = "Gallery album deleted successfully!";
            })
            .addCase(ADMIN_DELETE_GALLERY_PHOTOS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_CREATE_GALLERY_REQUEST, (state) => {
                state.loading = true;
                state.gallery = null
            })
            .addCase(ADMIN_CREATE_GALLERY_SUCCESS, (state, action) => {
                state.loading = false;
                state.gallery = action.payload.data;
                state.galleryCount = action.payload.data.length || 0
                state.success = true
                state.msg = "Gallery album created successfully!";
            })
            .addCase(ADMIN_CREATE_GALLERY_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(SET_GALLERY_SUCCESS_FALSE, (state, action) => {
                state.success = false
            })
    },
});


export const { clearErrors, clearSuccess, clearSuccessMsg } = gallerySlice.actions;

export default gallerySlice.reducer;

