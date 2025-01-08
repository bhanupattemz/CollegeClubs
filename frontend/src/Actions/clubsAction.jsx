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
    REGISTER_CLUB_FAIL
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



export { getAllclubs, getSingleClub, getUserclubs, registerClub }