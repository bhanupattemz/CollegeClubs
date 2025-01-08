import axios from "axios"
import {

    ALL_LETTERS_REQUEST,
    ALL_LETTERS_SUCCESS,
    ALL_LETTERS_FAIL
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
const getAllLetters = (params) => async (dispatch) => {
    try {
        dispatch({ type: ALL_LETTERS_REQUEST })
        const response = await axiosInstance.get("/letters")
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

export { getAllLetters }