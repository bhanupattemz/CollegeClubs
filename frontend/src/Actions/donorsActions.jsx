import axios from "axios"
import {
    TOP_DONARS_REQUEST,
    TOP_DONARS_SUCCESS,
    TOP_DONARS_FAIL,
    GET_ALL_DONARS_REQUEST,
    GET_ALL_DONARS_SUCCESS,
    GET_ALL_DONARS_FAIL,
    ADMIN_DELETE_DONAR_REQUEST,
    ADMIN_DELETE_DONAR_SUCCESS,
    ADMIN_DELETE_DONAR_FAIL,
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
const getTopDonors = (params) => async (dispatch) => {
    try {
        dispatch({ type: TOP_DONARS_REQUEST })
        const response = await axiosInstance.get("/donars/top")
        dispatch({
            type: TOP_DONARS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: TOP_DONARS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
const getAllDonors = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_DONARS_REQUEST })
        const response = await axiosInstance.get(`/donars?key=${params ? params : ""}`)
        dispatch({
            type: GET_ALL_DONARS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_ALL_DONARS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const adminDeleteDonar = (_id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_DONAR_REQUEST })
        const response = await axiosInstance.delete(`/donars/${_id}`)
        dispatch({
            type: ADMIN_DELETE_DONAR_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_DONAR_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
export { getTopDonors, getAllDonors, adminDeleteDonar }