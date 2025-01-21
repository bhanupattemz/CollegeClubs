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
    DELETE_FEST_EVENT_FAIL
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

export {
    getFestEvents, getFestEventDetails,
    adminDeleteFestEvent
}