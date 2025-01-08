import { createSlice } from '@reduxjs/toolkit';
import {
    ALL_CLUB_GALLERY_REQUEST,
    ALL_CLUB_GALLERY_SUCCESS,
    ALL_CLUB_GALLERY_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialclubGalleryState = {
    clubGallery: null,
    loading: false,
    error: null,
    success: null,
    clubGalleryCount: 0,
};

// clubGallery Slice
const clubGallerySlice = createSlice({
    name: 'clubGallerys',
    initialState: initialclubGalleryState,
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
            .addCase(ALL_CLUB_GALLERY_REQUEST, (state) => {
                state.loading = true;
                state.clubGallery = null
            })
            .addCase(ALL_CLUB_GALLERY_SUCCESS, (state, action) => {
                state.loading = false;
                state.clubGallery = action.payload.data;
                state.clubGalleryCount = action.payload.data.length || 0
            })
            .addCase(ALL_CLUB_GALLERY_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const { clearErrors, clearSuccess } = clubGallerySlice.actions;

export default clubGallerySlice.reducer;

