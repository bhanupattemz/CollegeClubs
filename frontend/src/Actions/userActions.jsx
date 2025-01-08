import axios from "axios"
import {
    GET_CURRENT_USER_REQUEST,
    GET_CURRENT_USER_SUCCESS,
    GET_CURRENT_USER_FAIL,
    SIGN_IN_USER_REQUEST,
    SIGN_IN_USER_SUCCESS,
    SIGN_IN_USER_FAIL,
    SIGN_UP_USER_REQUEST,
    SIGN_UP_USER_SUCCESS,
    SIGN_UP_USER_FAIL,
    SIGNOUT_USER_REQUEST,
    SIGNOUT_USER_SUCCESS,
    SIGNOUT_USER_FAIL,
    DELETE_CURRENT_USER_REQUEST,
    DELETE_CURRENT_USER_SUCCESS,
    DELETE_CURRENT_USER_FAIL,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    UPDATE_PROFILE_PASSWORD_REQUEST,
    UPDATE_PROFILE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_PASSWORD_FAIL,
    RESET_PASSWORD_TOKEN_GENERATE_REQUEST,
    RESET_PASSWORD_TOKEN_GENERATE_SUCCESS,
    RESET_PASSWORD_TOKEN_GENERATE_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    SET_IS_UPDATE_FALSE
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})

const signInUser = (params) => async (dispatch) => {
    try {
        dispatch({ type: SIGN_IN_USER_REQUEST })
        const response = await axiosInstance.post("/signin", params)

        dispatch({
            type: SIGN_IN_USER_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: SIGN_IN_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const signUpUser = (params) => async (dispatch) => {
    try {
        dispatch({ type: SIGN_UP_USER_REQUEST })
        const response = await axiosInstance.post("/signup", params)

        dispatch({
            type: SIGN_UP_USER_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: SIGN_UP_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const getCurrentUser = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_CURRENT_USER_REQUEST })
        const response = await axiosInstance.get("/profile")

        dispatch({
            type: GET_CURRENT_USER_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_CURRENT_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const userSignout = (params) => async (dispatch) => {
    try {
        dispatch({ type: SIGNOUT_USER_REQUEST })
        const response = await axiosInstance.get("/signout")

        dispatch({
            type: SIGNOUT_USER_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: SIGNOUT_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const deleteCurrentUser = (params) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CURRENT_USER_REQUEST })
        const response = await axiosInstance.delete("/users")

        dispatch({
            type: DELETE_CURRENT_USER_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: DELETE_CURRENT_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const updateUserProfile = (body) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_PROFILE_REQUEST })
        const response = await axiosInstance.put(`/profile`, body)

        dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const updateProfilePassword = (body) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_PASSWORD_REQUEST })
        const response = await axiosInstance.put(`/users/password/update`, body)

        dispatch({
            type: UPDATE_PROFILE_PASSWORD_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_PASSWORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
const setIsUpdateFalse = (body) => async (dispatch) => {
    dispatch({ type: SET_IS_UPDATE_FALSE })
}


const resetPaswordToken = (body) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_TOKEN_GENERATE_REQUEST })
        const response = await axiosInstance.post(`/users/password/reset`, body)

        dispatch({
            type: RESET_PASSWORD_TOKEN_GENERATE_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_TOKEN_GENERATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const resetPasword = (token, body) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST })
        const response = await axiosInstance.put(`/users/password/reset/${token}`, body)

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
export {
    signInUser, signUpUser, getCurrentUser,
    userSignout, deleteCurrentUser, updateUserProfile,
    setIsUpdateFalse, updateProfilePassword, resetPaswordToken,
    resetPasword
}