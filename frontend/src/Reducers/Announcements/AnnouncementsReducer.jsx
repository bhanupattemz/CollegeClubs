import { createSlice } from '@reduxjs/toolkit';
import {
    TOP_ANNOUNCEMENTS_REQUEST,
    TOP_ANNOUNCEMENTS_SUCCESS,
    TOP_ANNOUNCEMENTS_FAIL,
    ALL_ANNOUNCEMENTS_REQUEST,
    ALL_ANNOUNCEMENTS_SUCCESS,
    ALL_ANNOUNCEMENTS_FAIL,
    ADMIN_DELETE_ANNOUNCEMENT_REQUEST,
    ADMIN_DELETE_ANNOUNCEMENT_SUCCESS,
    ADMIN_DELETE_ANNOUNCEMENT_FAIL,
    CREATE_ANNOUNCEMENTS_REQUEST,
    CREATE_ANNOUNCEMENTS_SUCCESS,
    CREATE_ANNOUNCEMENTS_FAIL,
    UPDATE_ANNOUNCEMENTS_REQUEST,
    UPDATE_ANNOUNCEMENTS_SUCCESS,
    UPDATE_ANNOUNCEMENTS_FAIL,
    SET_ANNOUNCEMENT_SUCCESS_FALSE,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialannouncementsState = {
    announcements: null,
    loading: false,
    error: null,
    success: null,
    announcementsCount: 0,
};

// announcement Slice
const announcementSlice = createSlice({
    name: 'announcements',
    initialState: initialannouncementsState,
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
            .addCase(TOP_ANNOUNCEMENTS_REQUEST, (state) => {
                state.loading = true;
                state.announcements = null
            })
            .addCase(TOP_ANNOUNCEMENTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.announcements = action.payload.data;
                state.announcementsCount = action.payload.data.length || 0
            })
            .addCase(TOP_ANNOUNCEMENTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ALL_ANNOUNCEMENTS_REQUEST, (state) => {
                state.loading = true;
                state.announcements = null
            })
            .addCase(ALL_ANNOUNCEMENTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.announcements = action.payload.data;
                state.announcementsCount = action.payload.data.length || 0
            })
            .addCase(ALL_ANNOUNCEMENTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ADMIN_DELETE_ANNOUNCEMENT_REQUEST, (state) => {
                state.loading = true;
                state.announcements = null
            })
            .addCase(ADMIN_DELETE_ANNOUNCEMENT_SUCCESS, (state, action) => {
                state.loading = false;
                state.announcements = action.payload.data;
                state.announcementsCount = action.payload.data.length || 0
            })
            .addCase(ADMIN_DELETE_ANNOUNCEMENT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(CREATE_ANNOUNCEMENTS_REQUEST, (state) => {
                state.loading = true;
                state.announcements = null
            })
            .addCase(CREATE_ANNOUNCEMENTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.announcements = action.payload.data;
                state.announcementsCount = action.payload.data.length || 0
                state.success = true
            })
            .addCase(CREATE_ANNOUNCEMENTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UPDATE_ANNOUNCEMENTS_REQUEST, (state) => {
                state.loading = true;
                state.announcements = null
            })
            .addCase(UPDATE_ANNOUNCEMENTS_SUCCESS, (state, action) => {
                state.loading = false;
                state.announcements = action.payload.data;
                state.announcementsCount = action.payload.data.length || 0
                state.success = true
            })
            .addCase(UPDATE_ANNOUNCEMENTS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(SET_ANNOUNCEMENT_SUCCESS_FALSE, (state, action) => {
                state.success = false
            })
    },
});


export const { clearErrors, clearSuccess } = announcementSlice.actions;

export default announcementSlice.reducer;

