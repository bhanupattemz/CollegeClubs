import { createSlice } from '@reduxjs/toolkit';
import {
    GET_ADMINISTRATION_TEAM_REQUEST,
    GET_ADMINISTRATION_TEAM_SUCCESS,
    GET_ADMINISTRATION_TEAM_FAIL,
    DELETE_ADMINISTRATION_TEAM_REQUEST,
    DELETE_ADMINISTRATION_TEAM_SUCCESS,
    DELETE_ADMINISTRATION_TEAM_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialadministrationTeamState = {
    administrationTeam: null,
    loading: false,
    error: null,
    success: null,
    administrationTeamsCount: 0,
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
            })
            .addCase(DELETE_ADMINISTRATION_TEAM_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const { clearErrors, clearSuccess } = administrationTeamSlice.actions;

export default administrationTeamSlice.reducer;

