import { createSlice } from '@reduxjs/toolkit';
import {
    SEND_CONTACT_MSG_REQUEST,
    SEND_CONTACT_MSG_SUCCESS,
    SEND_CONTACT_MSG_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Constants';

const initialcontactMsgsState = {
    contactMsgs: null,
    loading: false,
    error: null,
    success: null,
    contactMsgsCount: 0,
};

// contactMsg Slice
const contactMsgSlice = createSlice({
    name: 'contactMsgs',
    initialState: initialcontactMsgsState,
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
            .addCase(SEND_CONTACT_MSG_REQUEST, (state) => {
                state.loading = true;
                state.contactMsgs = null
            })
            .addCase(SEND_CONTACT_MSG_SUCCESS, (state, action) => {
                state.loading = false;
            })
            .addCase(SEND_CONTACT_MSG_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const { clearErrors, clearSuccess } = contactMsgSlice.actions;

export default contactMsgSlice.reducer;

