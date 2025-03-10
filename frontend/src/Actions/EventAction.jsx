import axios from "axios"
import {
    ALL_EVENTS_REQUEST,
    ALL_EVENTS_SUCCESS,
    ALL_EVENTS_FAIL,
    GET_SINGLE_EVENT_REQUEST,
    GET_SINGLE_EVENT_SUCCESS,
    GET_SINGLE_EVENT_FAIL,
    GET_CLUB_EVENTS_REQUEST,
    GET_CLUB_EVENTS_SUCCESS,
    GET_CLUB_EVENTS_FAIL,
    GET_USER_EVENTS_REQUEST,
    GET_USER_EVENTS_SUCCESS,
    GET_USER_EVENTS_FAIL,
    REGISTER_EVENT_REQUEST,
    REGISTER_EVENT_SUCCESS,
    REGISTER_EVENT_FAIL,
    ADMIN_DELETE_EVENT_REQUEST,
    ADMIN_DELETE_EVENT_SUCCESS,
    ADMIN_DELETE_EVENT_FAIL,
    CREATE_EVENT_REQUEST,
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_FAIL,
    UPDATE_EVENT_REQUEST,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAIL,
    GET_COORDINATOR_EVENTS_REQUEST,
    GET_COORDINATOR_EVENTS_SUCCESS,
    GET_COORDINATOR_EVENTS_FAIL,
    SET_EVENT_SUCCESS_FALSE
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})

const getAllEvents = (params) => async (dispatch) => {
    try {
        dispatch({ type: ALL_EVENTS_REQUEST })
        const response = await axiosInstance.get(`/events?key=${params ? params : ""}`)
        dispatch({
            type: ALL_EVENTS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ALL_EVENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const adminGetAllEvents = (params, isactive) => async (dispatch) => {
    try {
        dispatch({ type: ALL_EVENTS_REQUEST })
        const response = await axiosInstance.get(`/events/admin?key=${params ? params : ""}`)
        dispatch({
            type: ALL_EVENTS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ALL_EVENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const getUserEvents = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_EVENTS_REQUEST })
        const response = await axiosInstance.get(`/events/user/${params}`)
        dispatch({
            type: GET_USER_EVENTS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_USER_EVENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}




const getSingleEvent = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_SINGLE_EVENT_REQUEST })
        const response = await axiosInstance.get(`/events/${params}`)
        dispatch({
            type: GET_SINGLE_EVENT_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: GET_SINGLE_EVENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const adminGetSingleEvent = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_SINGLE_EVENT_REQUEST })
        const response = await axiosInstance.get(`/events/admin/${params}`)
        dispatch({
            type: GET_SINGLE_EVENT_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_SINGLE_EVENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const getClubEvents = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_CLUB_EVENTS_REQUEST })
        const response = await axiosInstance.get(`/events/clubs/${params}`)
        dispatch({
            type: GET_CLUB_EVENTS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_CLUB_EVENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const registerEvents = (_id) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_EVENT_REQUEST })
        const response = await axiosInstance.put(`/events/register/${_id}`)
        dispatch({
            type: REGISTER_EVENT_SUCCESS,
            payload: response.data
        })
        dispatch({ type: ALL_EVENTS_REQUEST })
        const allResponse = await axiosInstance.get('events')
        dispatch({
            type: ALL_EVENTS_SUCCESS,
            payload: allResponse.data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_EVENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const adminDeleteEvent = (params) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_EVENT_REQUEST })
        const response = await axiosInstance.delete(`/events/${params}`)
        dispatch({
            type: ADMIN_DELETE_EVENT_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_EVENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const createEvent = (formData, _id) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_EVENT_REQUEST })
        const response = await axiosInstance.post(`/events/create/${_id}`, formData)
        dispatch({
            type: CREATE_EVENT_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: CREATE_EVENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}



const updateEvent = (formData, _id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_EVENT_REQUEST })
        const response = await axiosInstance.put(`/events/${_id}`, formData)
        dispatch({
            type: UPDATE_EVENT_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_EVENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}



const getCoordinatorEvents = (key) => async (dispatch) => {
    try {
        dispatch({ type: GET_COORDINATOR_EVENTS_REQUEST })
        const response = await axiosInstance.get(`/events/coordinator?key=${key ? key : ""}`,)
        dispatch({
            type: GET_COORDINATOR_EVENTS_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: GET_COORDINATOR_EVENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const setEventSuccessFalse = (formData, _id) => async (dispatch) => {
    dispatch({
        type: SET_EVENT_SUCCESS_FALSE
    })
}
export {
    getAllEvents, getSingleEvent, getClubEvents, getUserEvents, registerEvents,
    adminDeleteEvent, adminGetAllEvents, createEvent, setEventSuccessFalse, updateEvent,
    adminGetSingleEvent, getCoordinatorEvents
}