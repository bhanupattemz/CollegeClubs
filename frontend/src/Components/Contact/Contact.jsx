import "./Contact.css"
import Banner from "../Clubs/Banner"
import Map from "./Map"
import { useSelector, useDispatch } from "react-redux"
import { sendContactMsg } from "../../Actions/ContactAction"
import { useEffect, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha";
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from "@mui/material/TextField";
import { BACKENDURL } from "../Functionalities/functionalites"
import axios from "axios"
import Loading from "../Loaders/Loading"
export default function Contact() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const dispatch = useDispatch()
    const [formData, setFormData] = useState()
    const { loading } = useSelector(state => state.contacts)
    const [capLoading, setCapLoading] = useState(false)
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.mail || !formData.subject || !formData.message) {
            alert("Please fill all required fields");
            return;
        }
        if (!CaptchaValue) {
            alert("Please complete the CAPTCHA");
            return;
        }
        dispatch(sendContactMsg(formData));
    };

    const [CaptchaValue, setCaptchaValue] = useState()
    function onChange(value) {
        setCaptchaValue(value)
    }
    const [recapchaKey, setRecapchaKey] = useState()
    useEffect(() => {
        async function getrecaptchaKey() {
            try {
                setCapLoading(true)
                const response = await axiosInstance.get("/recaptcha/key")
                setRecapchaKey(response.data.data)
            } catch (err) {
                console.log(err)
            }
            setCapLoading(false)
        }
        if (!recapchaKey) {
            getrecaptchaKey()
        }

    }, [recapchaKey])
    if (loading || capLoading) {
        return <Loading />
    }
    return (

        < main className="contact-us-main">
            <section>
                <Banner heading={"Contact Us"}
                    discription={"We're here to help with any questions or feedback you have.Feel free to reach out to us anytime!"}
                    link={"https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"} />
            </section>
            <section className="contact-us-content-section">
                <div className="contact-us-content-card">
                    <div className="map-wrap">
                        <Map />
                    </div>
                    <div className="contact-us-content">
                        <form onSubmit={formSubmitHandler} className="contact-form">
                            <div>
                                <TextField
                                    required
                                    id="name"
                                    label="Enter Full Name"
                                    variant="outlined"
                                    placeholder={`Firstname Lastname`}
                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, name: e.target.value }))
                                    }
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    id="Mail"
                                    label="Mail"
                                    variant="outlined"
                                    type="email"
                                    placeholder={`example@gmail.com`}
                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, mail: e.target.value }))
                                    }
                                />
                                <TextField
                                    id="mobile-no"
                                    label="Mobile No"
                                    variant="outlined"
                                    type="number"
                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, mobileNo: e.target.value }))
                                    }
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    id="subject"
                                    label="subject"
                                    variant="outlined"
                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, subject: e.target.value }))
                                    }
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    id="message"
                                    label="Message"
                                    variant="outlined"
                                    placeholder={`write you message Here`}
                                    multiline
                                    rows={4}

                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, message: e.target.value }))
                                    }
                                />
                            </div>
                            {recapchaKey &&
                                <div>
                                    <ReCAPTCHA
                                        sitekey={recapchaKey}
                                        onChange={onChange}
                                    />
                                </div>
                            }
                            <LoadingButton
                                id="contact-submit-btn"
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                type="submit"
                            >
                                SUBMIT
                            </LoadingButton>
                        </form>
                    </div>
                </div>
            </section>
        </main >
    )
}