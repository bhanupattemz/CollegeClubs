import axios from "axios"
import {
    TOP_ANNOUNCEMENTS_REQUEST,
    TOP_ANNOUNCEMENTS_SUCCESS,
    TOP_ANNOUNCEMENTS_FAIL,
    ALL_ANNOUNCEMENTS_REQUEST,
    ALL_ANNOUNCEMENTS_SUCCESS,
    ALL_ANNOUNCEMENTS_FAIL,
    ADMIN_DELETE_ANNOUNCEMENT_REQUEST,
    ADMIN_DELETE_ANNOUNCEMENT_SUCCESS,
    ADMIN_DELETE_ANNOUNCEMENT_FAIL
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})

const getTopAnnouncements = (params) => async (dispatch) => {
    try {
        dispatch({ type: TOP_ANNOUNCEMENTS_REQUEST })
        const response = await axiosInstance.get("/announcements/top")
        dispatch({
            type: TOP_ANNOUNCEMENTS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: TOP_ANNOUNCEMENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const getAllAnnouncements = (params) => async (dispatch) => {
    try {
        dispatch({ type: ALL_ANNOUNCEMENTS_REQUEST })
        const response = await axiosInstance.get(`/announcements?key=${params ? params : ""}`)
        dispatch({
            type: ALL_ANNOUNCEMENTS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ALL_ANNOUNCEMENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const admindeleteAnnouncement = (params) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_ANNOUNCEMENT_REQUEST })
        const response = await axiosInstance.delete(`/announcements/${params}`)
        dispatch({
            type: ADMIN_DELETE_ANNOUNCEMENT_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_ANNOUNCEMENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
export { getTopAnnouncements, getAllAnnouncements, admindeleteAnnouncement }