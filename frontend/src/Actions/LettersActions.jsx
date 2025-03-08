import axios from "axios"
import {
    ALL_LETTERS_REQUEST,
    ALL_LETTERS_SUCCESS,
    ALL_LETTERS_FAIL,
    ADMIN_DELETE_LETTER_REQUEST,
    ADMIN_DELETE_LETTER_SUCCESS,
    ADMIN_DELETE_LETTER_FAIL,
    ADMIN_CREATE_LETTER_REQUEST,
    ADMIN_CREATE_LETTER_SUCCESS,
    ADMIN_CREATE_LETTER_FAIL,
    UPDATE_LETTER_REQUEST,
    UPDATE_LETTER_SUCCESS,
    UPDATE_LETTER_FAIL
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
const getAllLetters = (params) => async (dispatch) => {
    try {
        dispatch({ type: ALL_LETTERS_REQUEST })
        const response = await axiosInstance.get(`/letters?key=${params ? params : ""}`)
        dispatch({
            type: ALL_LETTERS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ALL_LETTERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const adminDeleteLetter = (_id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_LETTER_REQUEST })
        const response = await axiosInstance.delete(`/letters/${_id}`)
        dispatch({
            type: ADMIN_DELETE_LETTER_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_LETTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}



const adminCreateLetter = (formData) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CREATE_LETTER_REQUEST })
        const response = await axiosInstance.post(`/letters`, formData)
        dispatch({
            type: ADMIN_CREATE_LETTER_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CREATE_LETTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}



const updateLetter = (formData, _id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_LETTER_REQUEST })
        const response = await axiosInstance.put(`/letters/${_id}`, formData)
        dispatch({
            type: UPDATE_LETTER_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_LETTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export { getAllLetters, adminDeleteLetter, adminCreateLetter, updateLetter }