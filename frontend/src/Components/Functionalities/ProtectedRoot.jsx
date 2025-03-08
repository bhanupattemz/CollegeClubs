import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loaders/Loading";
import { setPrevLocation } from "../../Actions/prevLocation";
import Restricted from "./Restricted";
import { getCurrentUser } from "../../Actions/userActions";

function ProtectedRoute({ isIn, element }) {
    const { loading, isauthenticate, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isauthenticate && !loading) {
            dispatch(setPrevLocation(location.pathname));
        }
    }, [isauthenticate, loading, location.pathname, dispatch]);

    useEffect(() => {
        if (!user) {
            dispatch(getCurrentUser());
        }
    }, [dispatch, user]);

    if (loading) {
        return <Loader />;
    }

    if (isauthenticate && user) {
        if (isIn) {
            if (user && isIn.includes(user.role)) {
                return element;
            } else {
                return <Restricted />;
            }
        }
        return element;
    } else {
        return <Navigate to="/signin" />

    }
}

export default ProtectedRoute;
