import axios from "axios"
import {
    GET_PAST_MEMBERS_REQUEST,
    GET_PAST_MEMBERS_SUCCESS,
    GET_PAST_MEMBERS_FAIL,
    DELETE_PAST_MEMBER_REQUEST,
    DELETE_PAST_MEMBER_SUCCESS,
    DELETE_PAST_MEMBER_FAIL,
    CREATE_PAST_MEMBER_REQUEST,
    CREATE_PAST_MEMBER_SUCCESS,
    CREATE_PAST_MEMBER_FAIL,
    SET_PAST_MEMBER_SUCCESS_FALSE
} from "../Constants/Constants"
import { BACKENDURL } from "../Components/Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
const getPastMembers = (key) => async (dispatch) => {
    try {
        dispatch({ type: GET_PAST_MEMBERS_REQUEST })
        const response = await axiosInstance.get(`/past_members?key=${key ? key : ""}`)
        dispatch({
            type: GET_PAST_MEMBERS_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: GET_PAST_MEMBERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

const adminDeletePastMember = (_id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PAST_MEMBER_REQUEST })
        const response = await axiosInstance.delete(`/past_members/${_id}`)
        dispatch({
            type: DELETE_PAST_MEMBER_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: DELETE_PAST_MEMBER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const createPastMember = (formData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PAST_MEMBER_REQUEST })
        const response = await axiosInstance.post(`/past_members`, formData)
        dispatch({
            type: CREATE_PAST_MEMBER_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: CREATE_PAST_MEMBER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


const setPastMemberFalse = () => async (dispatch) => {
    dispatch({ type: SET_PAST_MEMBER_SUCCESS_FALSE })
}
export { getPastMembers, adminDeletePastMember, createPastMember, setPastMemberFalse }