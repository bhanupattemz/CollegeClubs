import { createSlice } from '@reduxjs/toolkit';
import {
    GET_PAST_MEMBERS_REQUEST,
    GET_PAST_MEMBERS_SUCCESS,
    GET_PAST_MEMBERS_FAIL,
    DELETE_PAST_MEMBER_REQUEST,
    DELETE_PAST_MEMBER_SUCCESS,
    DELETE_PAST_MEMBER_FAIL,
    CREATE_PAST_MEMBER_REQUEST,
    CREATE_PAST_MEMBER_SUCCESS,
    CREATE_PAST_MEMBER_FAIL,
    SET_PAST_MEMBER_SUCCESS_FALSE,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialpastMembersState = {
    pastMembers: null,
    loading: false,
    error: null,
    success: null,
    pastMembersCount: 0,
};

// pastMember Slice
const pastMemberSlice = createSlice({
    name: 'pastMembers',
    initialState: initialpastMembersState,
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
            .addCase(GET_PAST_MEMBERS_REQUEST, (state) => {
                state.loading = true;
                state.pastMembers = null
            })
            .addCase(GET_PAST_MEMBERS_SUCCESS, (state, action) => {
                state.loading = false;
                state.pastMembers = action.payload.data;
                state.pastMembersCount = action.payload.data.length || 0
            })
            .addCase(GET_PAST_MEMBERS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DELETE_PAST_MEMBER_REQUEST, (state) => {
                state.loading = true;
                state.pastMembers = null
            })
            .addCase(DELETE_PAST_MEMBER_SUCCESS, (state, action) => {
                state.loading = false;
                state.pastMembers = action.payload.data;
                state.pastMembersCount = action.payload.data.length || 0
            })
            .addCase(DELETE_PAST_MEMBER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(CREATE_PAST_MEMBER_REQUEST, (state) => {
                state.loading = true;
                state.pastMembers = null
            })
            .addCase(CREATE_PAST_MEMBER_SUCCESS, (state, action) => {
                state.loading = false;
                state.pastMembers = action.payload.data;
                state.pastMembersCount = action.payload.data.length || 0
                state.success = true
            })
            .addCase(CREATE_PAST_MEMBER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(SET_PAST_MEMBER_SUCCESS_FALSE, (state, action) => {
                state.success = false
            })

    },
});


export const { clearErrors, clearSuccess } = pastMemberSlice.actions;

export default pastMemberSlice.reducer;

