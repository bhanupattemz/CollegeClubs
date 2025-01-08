import axios from "axios"
import {
    TOP_ANNOUCEMENTS_REQUEST,
    TOP_ANNOUCEMENTS_SUCCESS,
    TOP_ANNOUCEMENTS_FAIL,
    ALL_ANNOUCEMENTS_REQUEST,
    ALL_ANNOUCEMENTS_SUCCESS,
    ALL_ANNOUCEMENTS_FAIL
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})

const getTopAnnoucements = (params) => async (dispatch) => {
    try {
        dispatch({ type: TOP_ANNOUCEMENTS_REQUEST })
        const response = await axiosInstance.get("/announcements/top")
        dispatch({
            type: TOP_ANNOUCEMENTS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: TOP_ANNOUCEMENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const getAllAnnoucements = (params) => async (dispatch) => {
    try {
        dispatch({ type: ALL_ANNOUCEMENTS_REQUEST })
        const response = await axiosInstance.get("/announcements")
        dispatch({
            type: ALL_ANNOUCEMENTS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ALL_ANNOUCEMENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export { getTopAnnoucements, getAllAnnoucements }