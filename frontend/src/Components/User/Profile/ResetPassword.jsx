import { useEffect, useState } from "react";
import "./UpdatePassword.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { setIsUpdateFalse, resetPasword } from "../../../Actions/userActions";
import Loading from "../../Loaders/Loading";

const validationSchema = Yup.object({
    mail: Yup.string().email("Invalid email").required("Email is required"),
    newpassword: Yup.string().min(8, "Password must be at least 8 characters").required("New password is required"),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
        .required("Confirm password is required"),
});

export default function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const { loading, isUpdated } = useSelector((state) => state.user);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCon, setShowPasswordCon] = useState(false);

    useEffect(() => {
        if (isUpdated) {
            dispatch(setIsUpdateFalse());
            navigate("/signin");
        }
    }, [isUpdated, dispatch, navigate]);

    if (loading) {
        return <Loading />;
    }

    return (
        <main className="update-password-main" style={{
            backgroundImage: "url('https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822532/cld-sample-3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>
            <Formik
                initialValues={{ mail: "", newpassword: "", confirmpassword: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    dispatch(resetPasword(token, values));
                }}
            >
                {({ handleChange, values }) => (
                    <Form>
                        <h1>Reset Password</h1>
                        <div>
                            <Field
                                as={TextField}
                                required
                                id="Mail"
                                name="mail"
                                label="Mail"
                                variant="outlined"
                                type="email"
                                value={values.mail}
                                onChange={handleChange}
                                helperText={<ErrorMessage name="mail" component="div" className="error-text" />}
                            />
                            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                <OutlinedInput
                                    required
                                    id="newpassword"
                                    name="newpassword"
                                    type={showPassword ? "text" : "password"}
                                    value={values.newpassword}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="New Password"
                                />
                                <ErrorMessage name="newpassword" component="div" className="error-text" />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                                <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
                                <OutlinedInput
                                    required
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    type={showPasswordCon ? "text" : "password"}
                                    value={values.confirmpassword}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPasswordCon((show) => !show)} edge="end">
                                                {showPasswordCon ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                />
                                <ErrorMessage name="confirmpassword" component="div" className="error-text" />
                            </FormControl>
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
                    </Form>
                )}
            </Formik>
        </main>
    );
}
