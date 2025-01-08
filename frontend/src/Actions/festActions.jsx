import axios from "axios"
import {
    GET_FEST_EVENTS_REQUEST,
    GET_FEST_EVENTS_SUCCESS,
    GET_FEST_EVENTS_FAIL
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

export { getFestEvents }