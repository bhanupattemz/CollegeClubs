import axios from "axios"
import {
    ALL_CLUBS_REQUEST,
    ALL_CLUBS_SUCCESS,
    ALL_CLUBS_FAIL,
    GET_SINGLE_CLUB_REQUEST,
    GET_SINGLE_CLUB_SUCCESS,
    GET_SINGLE_CLUB_FAIL,
    GET_USER_CLUBS_REQUEST,
    GET_USER_CLUBS_SUCCESS,
    GET_USER_CLUBS_FAIL,
    REGISTER_CLUB_REQUEST,
    REGISTER_CLUB_SUCCESS,
    REGISTER_CLUB_FAIL,
    ADMIN_DELETE_CLUB_REQUEST,
    ADMIN_DELETE_CLUB_SUCCESS,
    ADMIN_DELETE_CLUB_FAIL,
    CREATE_CLUB_REQUEST,
    CREATE_CLUB_SUCCESS,
    CREATE_CLUB_FAIL,
    UPDATE_CLUB_REQUEST,
    UPDATE_CLUB_SUCCESS,
    UPDATE_CLUB_FAIL,
    GET_COORDINATOR_CLUBS_REQUEST,
    GET_COORDINATOR_CLUBS_SUCCESS,
    GET_COORDINATOR_CLUBS_FAIL,
    SET_CLUB_SUCCESS_FALSE
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
const getAllclubs = (params) => async (dispatch) => {
    try {
        dispatch({ type: ALL_CLUBS_REQUEST })
        const response = await axiosInstance.get(`/clubs?key=${params ? params : ""}`)
        dispatch({
            type: ALL_CLUBS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ALL_CLUBS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const getUserclubs = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_USER_CLUBS_REQUEST })
        const response = await axiosInstance.get(`/clubs/user/${params}`)
        dispatch({
            type: GET_USER_CLUBS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_USER_CLUBS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const getSingleClub = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_SINGLE_CLUB_REQUEST })
        const response = await axiosInstance.get(`/clubs/${params}`)
        dispatch({
            type: GET_SINGLE_CLUB_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_SINGLE_CLUB_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const registerClub = (params) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_CLUB_REQUEST })
        const response = await axiosInstance.put(`/clubs/register/${params}`)
        dispatch({
            type: REGISTER_CLUB_SUCCESS,
            payload: response.data
        })
        dispatch({ type: ALL_CLUBS_REQUEST })
        const allResponse = await axiosInstance.get(`/clubs`)
        dispatch({
            type: ALL_CLUBS_SUCCESS,
            payload: allResponse.data
        })

    } catch (error) {
        dispatch({
            type: REGISTER_CLUB_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const adminDeleteClub = (params) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_CLUB_REQUEST })
        const response = await axiosInstance.delete(`/clubs/${params}`)
        dispatch({
            type: ADMIN_DELETE_CLUB_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_CLUB_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const adminCreateClub = (formData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CLUB_REQUEST })
        const response = await axiosInstance.post(`/clubs`, formData)
        dispatch({
            type: CREATE_CLUB_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: CREATE_CLUB_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const updateClub = (formData, _id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CLUB_REQUEST })
        const response = await axiosInstance.put(`/clubs/${_id}`, formData)
        dispatch({
            type: UPDATE_CLUB_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_CLUB_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const getCoordinatorClubs = (key) => async (dispatch) => {
    try {
        dispatch({ type: GET_COORDINATOR_CLUBS_REQUEST })
        const response = await axiosInstance.get(`/clubs/coordinator?key=${key ? key : ""}`)
        dispatch({
            type: GET_COORDINATOR_CLUBS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_COORDINATOR_CLUBS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const setClubSuccessFalse = () => async (dispatch) => {
    dispatch({ type: SET_CLUB_SUCCESS_FALSE })
}



export {
    getAllclubs, getSingleClub, getUserclubs, registerClub,
    adminDeleteClub, adminCreateClub, setClubSuccessFalse, updateClub,
    getCoordinatorClubs
}