import "./Contact.css";
import Banner from "../Clubs/Banner";
import Map from "./Map";
import { useSelector, useDispatch } from "react-redux";
import { sendContactMsg } from "../../Actions/ContactAction";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { BACKENDURL } from "../Functionalities/functionalites";
import axios from "axios";
import Loading from "../Loaders/Loading";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function Contact() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    });

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.contacts);
    const [capLoading, setCapLoading] = useState(false);
    const [recapchaKey, setRecapchaKey] = useState("");
    const [captchaValue, setCaptchaValue] = useState("");

    useEffect(() => {
        async function getRecaptchaKey() {
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
            getRecaptchaKey();
        }
    }, [recapchaKey]);

    const ContactSchema = Yup.object().shape({
        name: Yup.string().required("Full Name is required"),
        mail: Yup.string().email("Invalid email format").required("Email is required"),
        mobileNo: Yup.string().matches(/^\d{10}$/, "Invalid mobile number").required("Mobile No is required"),
        subject: Yup.string().required("Subject is required"),
        message: Yup.string().required("Message cannot be empty")
    });

    const formSubmitHandler = (values, { setSubmitting }) => {
        if (!captchaValue) {
            alert("Please complete the CAPTCHA");
            setSubmitting(false);
            return;
        }

        dispatch(sendContactMsg(values));
        setSubmitting(false);
    };

    if (loading || capLoading) {
        return <Loading />;
    }

    return (
        <main className="contact-us-main">
            <section>
                <Banner
                    heading={"Contact Us"}
                    discription={"We're here to help with any questions or feedback you have. Feel free to reach out to us anytime!"}
                    link={"https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"}
                />
            </section>

            <section className="contact-us-content-section">
                <div className="contact-us-content-card">
                    <div className="map-wrap">
                        <Map />
                    </div>

                    <div className="contact-us-content">
                        <Formik
                            initialValues={{
                                name: "",
                                mail: "",
                                mobileNo: "",
                                subject: "",
                                message: ""
                            }}
                            validationSchema={ContactSchema}
                            onSubmit={formSubmitHandler}
                        >
                            {({ errors, touched, handleChange, handleBlur, isSubmitting }) => (
                                <Form className="contact-form" noValidate>
                                    <div>
                                        <TextField
                                            required
                                            id="name"
                                            label="Enter Full Name"
                                            variant="outlined"
                                            placeholder="Firstname Lastname"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.name && errors.name}
                                            helperText={touched.name && errors.name}
                                        />
                                    </div>

                                    <div>
                                        <TextField
                                            required
                                            id="mail"
                                            label="Mail"
                                            variant="outlined"
                                            type="email"
                                            placeholder="example@gmail.com"
                                            name="mail"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.mail && errors.mail}
                                            helperText={touched.mail && errors.mail}
                                        />
                                        <TextField
                                            id="mobile-no"
                                            label="Mobile No"
                                            variant="outlined"
                                            type="text"
                                            name="mobileNo"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.mobileNo && errors.mobileNo}
                                            helperText={touched.mobileNo && errors.mobileNo}
                                        />
                                    </div>

                                    <div>
                                        <TextField
                                            required
                                            id="subject"
                                            label="Subject"
                                            variant="outlined"
                                            name="subject"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.subject && errors.subject}
                                            helperText={touched.subject && errors.subject}
                                        />
                                    </div>

                                    <div>
                                        <TextField
                                            required
                                            id="message"
                                            label="Message"
                                            variant="outlined"
                                            placeholder="Write your message here"
                                            multiline
                                            rows={4}
                                            name="message"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.message && errors.message}
                                            helperText={touched.message && errors.message}
                                        />
                                    </div>

                                    {recapchaKey && (
                                        <div>
                                            <ReCAPTCHA sitekey={recapchaKey} onChange={setCaptchaValue} />
                                        </div>
                                    )}

                                    <LoadingButton
                                        id="contact-submit-btn"
                                        loading={isSubmitting}
                                        loadingPosition="end"
                                        variant="contained"
                                        type="submit"
                                    >
                                        SUBMIT
                                    </LoadingButton>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </section>
        </main>
    );
}
