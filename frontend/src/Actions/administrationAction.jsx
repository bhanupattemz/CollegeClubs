import axios from "axios"
import {
    GET_ADMINISTRATION_TEAM_REQUEST,
    GET_ADMINISTRATION_TEAM_SUCCESS,
    GET_ADMINISTRATION_TEAM_FAIL,
    DELETE_ADMINISTRATION_TEAM_REQUEST,
    DELETE_ADMINISTRATION_TEAM_SUCCESS,
    DELETE_ADMINISTRATION_TEAM_FAIL,
    CREATE_ADMINISTRATION_TEAM_REQUEST,
    CREATE_ADMINISTRATION_TEAM_SUCCESS,
    CREATE_ADMINISTRATION_TEAM_FAIL,
    UPDATE_ADMINISTRATION_TEAM_REQUEST,
    UPDATE_ADMINISTRATION_TEAM_SUCCESS,
    UPDATE_ADMINISTRATION_TEAM_FAIL
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})

const getallAdministrators = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_ADMINISTRATION_TEAM_REQUEST })
        const response = await axiosInstance.get(`/administration?key=${params ? params : ""}`)
        dispatch({
            type: GET_ADMINISTRATION_TEAM_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_ADMINISTRATION_TEAM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const admindeleteAdministrationMember = (_id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ADMINISTRATION_TEAM_REQUEST })
        const response = await axiosInstance.delete(`/administration/${_id}`)
        dispatch({
            type: DELETE_ADMINISTRATION_TEAM_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: DELETE_ADMINISTRATION_TEAM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const adminCreateAdministrationMember = (formData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ADMINISTRATION_TEAM_REQUEST })
        const response = await axiosInstance.post(`/administration`, formData)
        dispatch({
            type: CREATE_ADMINISTRATION_TEAM_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ADMINISTRATION_TEAM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const adminUpdateAdministrationMember = (formData, _id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ADMINISTRATION_TEAM_REQUEST })
        const response = await axiosInstance.put(`/administration/${_id}`, formData)
        dispatch({
            type: UPDATE_ADMINISTRATION_TEAM_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ADMINISTRATION_TEAM_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
export { getallAdministrators, admindeleteAdministrationMember, adminCreateAdministrationMember, adminUpdateAdministrationMember }