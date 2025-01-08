import axios from "axios"
import {
    TOP_DONARS_REQUEST,
    TOP_DONARS_SUCCESS,
    TOP_DONARS_FAIL
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

export { getTopDonors }