import "./DonationForm.css";
import ReCAPTCHA from "react-google-recaptcha";
import TextField from "@mui/material/TextField";
import { BACKENDURL } from "../Functionalities/functionalites";
import axios from "axios";
import Loading from "../Loaders/Loading";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, Button } from "@mui/material";
import { getAllclubs } from "../../Actions/clubsAction";
import PaymentButton from "./PaymentBtn";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function DonationForm() {
    const [anonymous, setAnonymous] = useState(false);
    const dispatch = useDispatch();
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    });

    const { loading } = useSelector((state) => state.donars);
    const { clubs } = useSelector((state) => state.clubs);
    const { user } = useSelector((state) => state.user);
    const [CaptchaValue, setCaptchaValue] = useState();
    const [recapchaKey, setRecapchaKey] = useState();
    const [capLoading, setCapLoading] = useState(false);

    useEffect(() => {
        async function getrecaptchaKey() {
            try {
                setCapLoading(true);
                const response = await axiosInstance.get("/recaptcha/key");
                setRecapchaKey(response.data.data);
            } catch (err) {
                console.log(err);
            }
            setCapLoading(false);
        }
        if (!recapchaKey) {
            getrecaptchaKey();
        }
    }, [recapchaKey]);

    useEffect(() => {
        if (!clubs) {
            dispatch(getAllclubs());
        }
    }, [clubs]);

    const initialValues = {
        name: user ? `${user.personalInformation.firstname} ${user.personalInformation.lastname}` : "",
        mail: user ? user.mail : "",
        mobileNo: user ? user.personalInformation.mobileNo : "",
        message: "",
        club: "",
        amount: "",
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().when("anonymous", {
            is: false,
            then: Yup.string().required("Name is required"),
        }),
        mail: Yup.string()
            .email("Invalid email format")
            .when("anonymous", {
                is: false,
                then: Yup.string().required("Email is required"),
            }),
        mobileNo: Yup.string()
            .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
            .when("anonymous", {
                is: false,
                then: Yup.string().required("Mobile number is required"),
            }),
        message: Yup.string().max(200, "Message cannot exceed 200 characters"),
        club: Yup.string().required("Please select a club"),
        amount: Yup.number()
            .typeError("Amount must be a number")
            .min(10, "Minimum donation is ₹10")
            .required("Donation amount is required"),
    });

    if (loading || capLoading) {
        return <Loading />;
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
        >
            {({ values, setFieldValue }) => (
                <Form className="donation-form">
                    <div>
                        <Field
                            as={TextField}
                            disabled={anonymous}
                            id="name"
                            label="Enter Full Name"
                            variant="outlined"
                            name="name"
                            error={!values.name && !values.anonymous}
                            helperText={<ErrorMessage name="name" />}
                        />
                        <Field
                            as={TextField}
                            disabled={anonymous}
                            id="mobile-no"
                            label="Mobile No"
                            variant="outlined"
                            type="text"
                            name="mobileNo"
                            error={!values.mobileNo && !values.anonymous}
                            helperText={<ErrorMessage name="mobileNo" />}
                        />
                        <Field
                            as={TextField}
                            disabled={anonymous}
                            fullWidth
                            id="mail"
                            label="Mail"
                            variant="outlined"
                            type="email"
                            name="mail"
                            error={!values.mail && !values.anonymous}
                            helperText={<ErrorMessage name="mail" />}
                        />
                    </div>
                    <Field
                        as={TextField}
                        fullWidth
                        id="note"
                        label="Note"
                        variant="outlined"
                        placeholder="Write your note here"
                        multiline
                        rows={2}
                        name="message"
                        helperText={<ErrorMessage name="message" />}
                    />

                    <Field
                        as={TextField}
                        select
                        fullWidth
                        label="Select Club"
                        name="club"
                        helperText={<ErrorMessage name="club" />}
                    >
                        {clubs &&
                            clubs.map((option) => (
                                <MenuItem key={option._id} value={option._id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        <MenuItem value="General">General</MenuItem>
                    </Field>

                    <Field
                        as={TextField}
                        required
                        fullWidth
                        id="amount"
                        label="Enter Amount"
                        variant="outlined"
                        type="number"
                        name="amount"
                        helperText={<ErrorMessage name="amount" />}
                    />

                    <div className="donation-form-amount-btns">
                        {[1000, 2000, 5000].map((val) => (
                            <Button
                                key={val}
                                variant="contained"
                                color="primary"
                                onClick={() => setFieldValue("amount", val)}
                            >
                                ₹{val}
                            </Button>
                        ))}
                    </div>


                    <div className="donation-form-checkBox-div">
                        {recapchaKey && (
                            <ReCAPTCHA sitekey={recapchaKey} onChange={setCaptchaValue} />
                        )}

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={anonymous}
                                    onChange={() => setAnonymous((prev) => !prev)}
                                />
                            }
                            label="Donate Money Anonymously"
                        />
                    </div>
                    <PaymentButton
                        formData={values}
                        amount={values.amount}
                        CaptchaValue={CaptchaValue}
                        anonymous={anonymous}
                    />
                </Form>
            )}
        </Formik>
    );
}
