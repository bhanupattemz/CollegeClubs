import { createSlice } from '@reduxjs/toolkit';
import {
    GET_ADMINISTRATION_TEAM_REQUEST,
    GET_ADMINISTRATION_TEAM_SUCCESS,
    GET_ADMINISTRATION_TEAM_FAIL,
    DELETE_ADMINISTRATION_TEAM_REQUEST,
    DELETE_ADMINISTRATION_TEAM_SUCCESS,
    DELETE_ADMINISTRATION_TEAM_FAIL,
    CREATE_ADMINISTRATION_TEAM_REQUEST,
    CREATE_ADMINISTRATION_TEAM_SUCCESS,
    CREATE_ADMINISTRATION_TEAM_FAIL,
    UPDATE_ADMINISTRATION_TEAM_REQUEST,
    UPDATE_ADMINISTRATION_TEAM_SUCCESS,
    UPDATE_ADMINISTRATION_TEAM_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialadministrationTeamState = {
    administrationTeam: null,
    loading: false,
    error: null,
    success: null,
    administrationTeamsCount: 0,
    msg: null,
};

// administrationTeam Slice
const administrationTeamSlice = createSlice({
    name: 'administrationTeams',
    initialState: initialadministrationTeamState,
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
            .addCase(GET_ADMINISTRATION_TEAM_REQUEST, (state) => {
                state.loading = true;
                state.administrationTeam = null
            })
            .addCase(GET_ADMINISTRATION_TEAM_SUCCESS, (state, action) => {
                state.loading = false;
                state.administrationTeam = action.payload.data;
                state.administrationTeamsCount = action.payload.data.length || 0
            })
            .addCase(GET_ADMINISTRATION_TEAM_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DELETE_ADMINISTRATION_TEAM_REQUEST, (state) => {
                state.loading = true;
                state.administrationTeam = null
            })
            .addCase(DELETE_ADMINISTRATION_TEAM_SUCCESS, (state, action) => {
                state.loading = false;
                state.administrationTeam = action.payload.data;
                state.administrationTeamsCount = action.payload.data.length || 0
                state.msg = "Person removed from the administration team successfully!";
            })
            .addCase(DELETE_ADMINISTRATION_TEAM_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(CREATE_ADMINISTRATION_TEAM_REQUEST, (state) => {
                state.loading = true;
                state.administrationTeam = null
            })
            .addCase(CREATE_ADMINISTRATION_TEAM_SUCCESS, (state, action) => {
                state.loading = false;
                state.administrationTeam = action.payload.data;
                state.administrationTeamsCount = action.payload.data.length || 0
                state.success = true
                state.msg = "Person added to the administration team successfully!";
            })
            .addCase(CREATE_ADMINISTRATION_TEAM_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UPDATE_ADMINISTRATION_TEAM_REQUEST, (state) => {
                state.loading = true;
                state.administrationTeam = null
            })
            .addCase(UPDATE_ADMINISTRATION_TEAM_SUCCESS, (state, action) => {
                state.loading = false;
                state.success = true
                state.msg = "Administration team member updated successfully!";
            })
            .addCase(UPDATE_ADMINISTRATION_TEAM_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});


export const { clearErrors, clearSuccess, clearSuccessMsg } = administrationTeamSlice.actions;

export default administrationTeamSlice.reducer;

