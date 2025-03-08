import { createSlice } from '@reduxjs/toolkit';
import {
    GET_CAROUSEL_IMGS_REQUEST,
    GET_CAROUSEL_IMGS_SUCCESS,
    GET_CAROUSEL_IMGS_FAIL,
    DELETE_CAROUSEL_IMGS_REQUEST,
    DELETE_CAROUSEL_IMGS_SUCCESS,
    DELETE_CAROUSEL_IMGS_FAIL,
    CREATE_CAROUSEL_IMGS_REQUEST,
    CREATE_CAROUSEL_IMGS_SUCCESS,
    CREATE_CAROUSEL_IMGS_FAIL,
    UPDATE_CAROUSEL_IMGS_REQUEST,
    UPDATE_CAROUSEL_IMGS_SUCCESS,
    UPDATE_CAROUSEL_IMGS_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialcarouselImgsState = {
    carouselImgs: null,
    loading: false,
    error: null,
    success: null,
    carouselImgsCount: 0,
    msg: null
};

// carousel imgs Slice
const carouselImgslice = createSlice({
    name: 'carouselImgs',
    initialState: initialcarouselImgsState,
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
            .addCase(GET_CAROUSEL_IMGS_REQUEST, (state) => {
                state.loading = true;
                state.carouselImgs = null
            })
            .addCase(GET_CAROUSEL_IMGS_SUCCESS, (state, action) => {
                state.loading = false;
                state.carouselImgs = action.payload.data
            })
            .addCase(GET_CAROUSEL_IMGS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DELETE_CAROUSEL_IMGS_REQUEST, (state) => {
                state.loading = true;
                state.carouselImgs = null
            })
            .addCase(DELETE_CAROUSEL_IMGS_SUCCESS, (state, action) => {
                state.loading = false;
                state.carouselImgs = action.payload.data
                state.msg = "Image removed from carousel successfully!";
            })
            .addCase(DELETE_CAROUSEL_IMGS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(CREATE_CAROUSEL_IMGS_REQUEST, (state) => {
                state.loading = true;
                state.carouselImgs = null
            })
            .addCase(CREATE_CAROUSEL_IMGS_SUCCESS, (state, action) => {
                state.loading = false;
                state.success = true
                state.msg = "Image added to carousel successfully!";
            })
            .addCase(CREATE_CAROUSEL_IMGS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UPDATE_CAROUSEL_IMGS_REQUEST, (state) => {
                state.loading = true;
                state.carouselImgs = null
            })
            .addCase(UPDATE_CAROUSEL_IMGS_SUCCESS, (state, action) => {
                state.loading = false;
                state.success = true
                state.msg = "Carousel image updated successfully!";
            })
            .addCase(UPDATE_CAROUSEL_IMGS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});


export const { clearErrors, clearSuccess, clearSuccessMsg } = carouselImgslice.actions;

export default carouselImgslice.reducer;

