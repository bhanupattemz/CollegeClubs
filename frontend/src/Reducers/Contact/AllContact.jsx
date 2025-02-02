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
    msg: null,
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
        },
        clearSuccessMsg: (state) => {
            state.msg = null
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
                state.msg = "Your message has been sent successfully!";
            })
            .addCase(SEND_CONTACT_MSG_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});


export const { clearErrors, clearSuccess, clearSuccessMsg } = contactMsgSlice.actions;

export default contactMsgSlice.reducer;

