import axios from "axios"
import {
    ALL_CLUB_GALLERY_REQUEST,
    ALL_CLUB_GALLERY_SUCCESS,
    ALL_CLUB_GALLERY_FAIL,
    ALL_GALLERY_PHOTOS_REQUEST,
    ALL_GALLERY_PHOTOS_SUCCESS,
    ALL_GALLERY_PHOTOS_FAIL,
    ADMIN_DELETE_GALLERY_PHOTOS_REQUEST,
    ADMIN_DELETE_GALLERY_PHOTOS_SUCCESS,
    ADMIN_DELETE_GALLERY_PHOTOS_FAIL,
    ADMIN_CREATE_GALLERY_REQUEST,
    ADMIN_CREATE_GALLERY_SUCCESS,
    ADMIN_CREATE_GALLERY_FAIL,
    GET_COORDINATOR_GALLERY_REQUEST,
    GET_COORDINATOR_GALLERY_SUCCESS,
    GET_COORDINATOR_GALLERY_FAIL,
    COORDINATOR_DELETE_GALLERY_REQUEST,
    COORDINATOR_DELETE_GALLERY_SUCCESS,
    COORDINATOR_DELETE_GALLERY_FAIL,
    SET_GALLERY_SUCCESS_FALSE
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
const getClubGallery = (params) => async (dispatch) => {
    try {
        dispatch({ type: ALL_CLUB_GALLERY_REQUEST })
        const response = await axiosInstance.get(`/gallery/clubs/${params}`)
        dispatch({
            type: ALL_CLUB_GALLERY_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ALL_CLUB_GALLERY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const getMainGallery = (key) => async (dispatch) => {
    try {
        dispatch({ type: ALL_GALLERY_PHOTOS_REQUEST })
        const response = await axiosInstance.get(`/gallery?key=${key ? key : ""}`)
        dispatch({
            type: ALL_GALLERY_PHOTOS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ALL_GALLERY_PHOTOS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const getAdminGalleryPhotos = (key) => async (dispatch) => {
    try {
        dispatch({ type: ALL_GALLERY_PHOTOS_REQUEST })
        const response = await axiosInstance.get(`/gallery/admins?key=${key ? key : ""}`)
        dispatch({
            type: ALL_GALLERY_PHOTOS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ALL_GALLERY_PHOTOS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const deleteAdminGalleryPhotos = (_id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_GALLERY_PHOTOS_REQUEST })
        const response = await axiosInstance.delete(`/gallery/${_id}`)
        dispatch({
            type: ADMIN_DELETE_GALLERY_PHOTOS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_GALLERY_PHOTOS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const adminCreateGallery = (formData) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CREATE_GALLERY_REQUEST })
        const response = await axiosInstance.post(`/gallery/admins`, formData)
        dispatch({
            type: ADMIN_CREATE_GALLERY_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CREATE_GALLERY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const getCoordinatorGallery = (key) => async (dispatch) => {
    try {
        dispatch({ type: GET_COORDINATOR_GALLERY_REQUEST })
        const response = await axiosInstance.get(`/gallery/coordinator?key=${key ? key : ""}`)
        dispatch({
            type: GET_COORDINATOR_GALLERY_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_COORDINATOR_GALLERY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const coordinatorDeleteGallery = (_id) => async (dispatch) => {
    try {
        dispatch({ type: COORDINATOR_DELETE_GALLERY_REQUEST })
        const response = await axiosInstance.delete(`/gallery/clubs/${_id}`)
        dispatch({
            type: COORDINATOR_DELETE_GALLERY_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: COORDINATOR_DELETE_GALLERY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
const setMainGalleryFalse = (_id) => async (dispatch) => {
    dispatch({ type: SET_GALLERY_SUCCESS_FALSE })
}

export {
    getClubGallery, getMainGallery, getAdminGalleryPhotos,
    deleteAdminGalleryPhotos, adminCreateGallery, setMainGalleryFalse,
    getCoordinatorGallery, coordinatorDeleteGallery
}