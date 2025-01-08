import axios from "axios"
import {
    SEND_CONTACT_MSG_REQUEST,
    SEND_CONTACT_MSG_SUCCESS,
    SEND_CONTACT_MSG_FAIL
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
const sendContactMsg = (params) => async (dispatch) => {
    try {
        dispatch({ type: SEND_CONTACT_MSG_REQUEST })
        const response = await axiosInstance.post("/contact", params)
        dispatch({
            type: SEND_CONTACT_MSG_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: SEND_CONTACT_MSG_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export { sendContactMsg }