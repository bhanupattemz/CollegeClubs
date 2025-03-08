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
    ADMIN_DELETE_ANNOUNCEMENT_FAIL,
    CREATE_ANNOUNCEMENTS_REQUEST,
    CREATE_ANNOUNCEMENTS_SUCCESS,
    CREATE_ANNOUNCEMENTS_FAIL,
    UPDATE_ANNOUNCEMENTS_REQUEST,
    UPDATE_ANNOUNCEMENTS_SUCCESS,
    UPDATE_ANNOUNCEMENTS_FAIL,
    SET_ANNOUNCEMENT_SUCCESS_FALSE,
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


const adminCreateAnnouncement = (formData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ANNOUNCEMENTS_REQUEST })
        const response = await axiosInstance.post(`/announcements`, formData)
        dispatch({
            type: CREATE_ANNOUNCEMENTS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ANNOUNCEMENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}



const adminUpdateAnnouncement = (formData, _id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ANNOUNCEMENTS_REQUEST })
        const response = await axiosInstance.put(`/announcements/${_id}`, formData)
        dispatch({
            type: UPDATE_ANNOUNCEMENTS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ANNOUNCEMENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const setAnnounceSuccessFalse = (params) => async (dispatch) => {
    dispatch({ type: SET_ANNOUNCEMENT_SUCCESS_FALSE })
}
export {
    getTopAnnouncements, getAllAnnouncements, admindeleteAnnouncement,
    adminCreateAnnouncement, setAnnounceSuccessFalse, adminUpdateAnnouncement
}