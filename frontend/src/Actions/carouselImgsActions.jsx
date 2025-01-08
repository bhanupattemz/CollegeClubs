import axios from "axios"
import {
    GET_CAROUSEL_IMGS_REQUEST,
    GET_CAROUSEL_IMGS_SUCCESS,
    GET_CAROUSEL_IMGS_FAIL
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
const getCarouselImgs = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_CAROUSEL_IMGS_REQUEST })
        const response = await axiosInstance.get("/carousel")
        dispatch({
            type: GET_CAROUSEL_IMGS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_CAROUSEL_IMGS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export { getCarouselImgs }