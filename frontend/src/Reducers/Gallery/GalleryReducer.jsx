import { createSlice } from '@reduxjs/toolkit';
import {
    ALL_GALLERY_PHOTOS_REQUEST,
    ALL_GALLERY_PHOTOS_SUCCESS,
    ALL_GALLERY_PHOTOS_FAIL,
    ADMIN_DELETE_GALLERY_PHOTOS_REQUEST,
    ADMIN_DELETE_GALLERY_PHOTOS_SUCCESS,
    ADMIN_DELETE_GALLERY_PHOTOS_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialgalleryState = {
    gallery: null,
    loading: false,
    error: null,
    success: null,
    galleryCount: 0,
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
            })
            .addCase(ADMIN_DELETE_GALLERY_PHOTOS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});


export const { clearErrors, clearSuccess } = gallerySlice.actions;

export default gallerySlice.reducer;

