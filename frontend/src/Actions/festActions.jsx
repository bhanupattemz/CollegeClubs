import axios from "axios"
import {
    GET_FEST_EVENTS_REQUEST,
    GET_FEST_EVENTS_SUCCESS,
    GET_FEST_EVENTS_FAIL,
    GET_SINGLE_FEST_EVENT_REQUEST,
    GET_SINGLE_FEST_EVENT_SUCCESS,
    GET_SINGLE_FEST_EVENT_FAIL,
    DELETE_FEST_EVENT_REQUEST,
    DELETE_FEST_EVENT_SUCCESS,
    DELETE_FEST_EVENT_FAIL,
    CREATE_FEST_EVENT_REQUEST,
    CREATE_FEST_EVENT_SUCCESS,
    CREATE_FEST_EVENT_FAIL,
    ADMIN_GET_ALL_FEST_EVENTS_REQUEST,
    ADMIN_GET_ALL_FEST_EVENTS_SUCCESS,
    ADMIN_GET_ALL_FEST_EVENTS_FAIL,
    UPDATE_FEST_EVENT_REQUEST,
    UPDATE_FEST_EVENT_SUCCESS,
    UPDATE_FEST_EVENT_FAIL,
    SET_FEST_EVENT_SUCCESS_FALSE
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
const getFestEvents = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_FEST_EVENTS_REQUEST })
        const response = await axiosInstance.get(`/fest/events?key=${params ? params : ""}`)
        dispatch({
            type: GET_FEST_EVENTS_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: GET_FEST_EVENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const getFestEventDetails = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_SINGLE_FEST_EVENT_REQUEST })
        const response = await axiosInstance.get(`/fest/events/${params}`)
        dispatch({
            type: GET_SINGLE_FEST_EVENT_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: GET_SINGLE_FEST_EVENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const adminGetFestEventDetails = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_SINGLE_FEST_EVENT_REQUEST })
        const response = await axiosInstance.get(`/fest/events/admin/${params}`)
        dispatch({
            type: GET_SINGLE_FEST_EVENT_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: GET_SINGLE_FEST_EVENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const adminDeleteFestEvent = (params) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_FEST_EVENT_REQUEST })
        const response = await axiosInstance.delete(`/fest/events/${params}`)
        dispatch({
            type: DELETE_FEST_EVENT_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: DELETE_FEST_EVENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const createFestEvent = (formData, _id) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_FEST_EVENT_REQUEST })
        const response = await axiosInstance.post(`/fest/events/${_id}`, formData)
        dispatch({
            type: CREATE_FEST_EVENT_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: CREATE_FEST_EVENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const setFestEventFalse = (params) => async (dispatch) => {
    dispatch({ type: SET_FEST_EVENT_SUCCESS_FALSE })
}

const adminGetFestEvents = (params) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GET_ALL_FEST_EVENTS_REQUEST })
        const response = await axiosInstance.get(`/fest/events/all?key=${params ? params : ""}`)
        dispatch({
            type: ADMIN_GET_ALL_FEST_EVENTS_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_GET_ALL_FEST_EVENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const updateFestEvent = (formData, _id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_FEST_EVENT_REQUEST })
        const response = await axiosInstance.put(`/fest/events/${_id}`, formData)
        dispatch({
            type: UPDATE_FEST_EVENT_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_FEST_EVENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export {
    getFestEvents, getFestEventDetails,
    adminDeleteFestEvent, createFestEvent, setFestEventFalse, adminGetFestEvents, updateFestEvent,
    adminGetFestEventDetails
}