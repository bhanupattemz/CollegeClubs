import axios from "axios"
import {
    GET_ACADEMIC_BOOKS_REQUEST,
    GET_ACADEMIC_BOOKS_SUCCESS,
    GET_ACADEMIC_BOOKS_FAIL,
    ADMIN_DELETE_ACADEMIC_BOOKS_REQUEST,
    ADMIN_DELETE_ACADEMIC_BOOKS_SUCCESS,
    ADMIN_DELETE_ACADEMIC_BOOKS_FAIL
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
const getAcademicBooks = (params, key) => async (dispatch) => {
    try {
        dispatch({ type: GET_ACADEMIC_BOOKS_REQUEST })
        const response = await axiosInstance.get(`/library/academic`, { params: { ...params, key: key ? key : "" } })
        dispatch({
            type: GET_ACADEMIC_BOOKS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_ACADEMIC_BOOKS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const adminDeleteAcademicBook = (_id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_ACADEMIC_BOOKS_REQUEST })
        const response = await axiosInstance.delete(`/library/academic/${_id}`)
        dispatch({
            type: ADMIN_DELETE_ACADEMIC_BOOKS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_ACADEMIC_BOOKS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export { getAcademicBooks, adminDeleteAcademicBook }