import axios from "axios"
import {
    GET_CAROUSEL_IMGS_REQUEST,
    GET_CAROUSEL_IMGS_SUCCESS,
    GET_CAROUSEL_IMGS_FAIL,
    DELETE_CAROUSEL_IMGS_REQUEST,
    DELETE_CAROUSEL_IMGS_SUCCESS,
    DELETE_CAROUSEL_IMGS_FAIL
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
const getCarouselImgs = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_CAROUSEL_IMGS_REQUEST })
        const response = await axiosInstance.get(`/carousel?key=${params ? params : ""}`)
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

const deleteCarouselImg = (_id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CAROUSEL_IMGS_REQUEST })
        const response = await axiosInstance.delete(`/carousel/${_id}`)
        dispatch({
            type: DELETE_CAROUSEL_IMGS_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: DELETE_CAROUSEL_IMGS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


export { getCarouselImgs, deleteCarouselImg }