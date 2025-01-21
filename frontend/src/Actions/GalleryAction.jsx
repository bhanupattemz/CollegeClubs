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
    ADMIN_DELETE_GALLERY_PHOTOS_FAIL
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

const getMainGallery = (params, key) => async (dispatch) => {
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
        const response = await axiosInstance.delete(`/gallery/admins/${_id}`)
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

export { getClubGallery, getMainGallery, getAdminGalleryPhotos, deleteAdminGalleryPhotos }