import axios from "axios"
import {
    GET_ADMINISTRATION_TEAM_REQUEST,
    GET_ADMINISTRATION_TEAM_SUCCESS,
    GET_ADMINISTRATION_TEAM_FAIL
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})

const getallAdministrators = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_ADMINISTRATION_TEAM_REQUEST })
        const response = await axiosInstance.get("/administration")
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

export { getallAdministrators }