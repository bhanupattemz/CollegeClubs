
import {
    SET_PREV_LOCATION_REQUEST,
    SET_PREV_LOCATION_SUCCESS,
    SET_PREV_LOCATION_FAIL
} from "../Constants/Constants"


const setPrevLocation = (params) => async (dispatch) => {
    try {
        dispatch({ type: SET_PREV_LOCATION_REQUEST })

        dispatch({
            type: SET_PREV_LOCATION_SUCCESS,
            payload: params
        })

    } catch (error) {
        dispatch({
            type: SET_PREV_LOCATION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
export { setPrevLocation }