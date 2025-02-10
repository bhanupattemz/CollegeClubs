import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./UpdatePassword.css";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, updateProfilePassword, setIsUpdateFalse } from "../../../Actions/userActions";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Loading from "../../Loaders/Loading";

export default function UpdatePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, isUpdated } = useSelector((state) => state.user);
    
    const formik = useFormik({
        initialValues: {
            oldpassword: "",
            newpassword: "",
            confirmpassword: ""
        },
        validationSchema: Yup.object({
            oldpassword: Yup.string().required("Old password is required"),
            newpassword: Yup.string().min(6, "Password must be at least 6 characters").required("New password is required"),
            confirmpassword: Yup.string()
                .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
                .required("Confirm password is required")
        }),
        onSubmit: (values) => {
            dispatch(updateProfilePassword(values));
        }
    });

    useEffect(() => {
        if (isUpdated) {
            dispatch(setIsUpdateFalse());
            navigate("/profile");
        }
    }, [isUpdated, dispatch, navigate]);

    useEffect(() => {
        if (!user) {
            dispatch(getCurrentUser());
        }
    }, [user, dispatch]);

    if (loading) {
        return <Loading />;
    }

    return (
        <main className="update-password-main" style={{
            backgroundImage: "url('https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822532/cld-sample-3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>
            <form onSubmit={formik.handleSubmit}>
                <h1>Update Password</h1>
                <div>
                    {["oldpassword", "newpassword", "confirmpassword"].map((field, index) => {
                        const label = field === "oldpassword" ? "Old Password" : field === "newpassword" ? "New Password" : "Confirm Password";
                        return (
                            <FormControl key={index} sx={{ m: 1, width: "25ch" }} variant="outlined">
                                <InputLabel htmlFor={field}>{label}</InputLabel>
                                <OutlinedInput
                                    id={field}
                                    name={field}
                                    type={formik.values[field].show ? "text" : "password"}
                                    value={formik.values[field]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    formik.setFieldValue(field + "Show", !formik.values[field + "Show"])
                                                }
                                                edge="end"
                                            >
                                                {formik.values[field + "Show"] ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label={label}
                                />
                                {formik.touched[field] && formik.errors[field] && (
                                    <p className="error-text">{formik.errors[field]}</p>
                                )}
                            </FormControl>
                        );
                    })}
                </div>
                <LoadingButton
                    id="update-password"
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    type="submit"
                >
                    SUBMIT
                </LoadingButton>
            </form>
        </main>
    );
}
