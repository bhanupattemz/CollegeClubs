import { useEffect } from "react";
import { useFormik } from "formik";
import "./CoordinatorVerify.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setIsUpdateFalse, verfyCoordinator } from "../../Actions/userActions";
import Loading from "../Loaders/Loading";

export default function CoordinatorVerify() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useParams();
    const { loading, isUpdated } = useSelector((state) => state.user);

    const formik = useFormik({
        initialValues: {
            mail: "",
            description: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.mail) {
                errors.mail = "Required";
            } else if (!/\S+@\S+\.\S+/.test(values.mail)) {
                errors.mail = "Invalid email address";
            }
            if (!values.description) {
                errors.description = "Required";
            } else if (values.description.length < 300) {
                errors.description = "The description must exceed 300 characters.";
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(verfyCoordinator(values, _id));
        },
    });

    useEffect(() => {
        if (isUpdated) {
            dispatch(setIsUpdateFalse());
            navigate("/");
        }
    }, [isUpdated]);

    if (loading) return <Loading />;

    return (
        <main className="coordinator-verify-main">
            <img
                src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822532/cld-sample-3.jpg"
                alt="Coordinator Verification"
                className="coordinator-image"
            />
            <div>
                <h1>Coordinator verification</h1>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        id="mail"
                        label="Mail"
                        variant="outlined"
                        type="email"
                        fullWidth
                        value={formik.values.mail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.mail && Boolean(formik.errors.mail)}
                        helperText={formik.touched.mail && formik.errors.mail}
                        required
                    />
                    <TextField
                        id="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        required
                    />
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </form>
            </div>

        </main>
    );
}
