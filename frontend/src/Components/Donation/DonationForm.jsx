import "./DonationForm.css"
import ReCAPTCHA from "react-google-recaptcha";
import TextField from "@mui/material/TextField";
import { BACKENDURL } from "../Functionalities/functionalites"
import axios from "axios"
import Loading from "../Loaders/Loading"
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import {
    useSelector, useDispatch
} from "react-redux";
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormControlLabel } from "@mui/material";
import { getAllclubs } from "../../Actions/clubsAction"
import PaymentButton from "./PaymentBtn";



export default function DonationForm() {
    const [anonymous, setAnonymous] = useState(false)
    const dispatch = useDispatch()
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const [amount, setamount] = useState(0)
    const [formData, setFormData] = useState({})
    const { loading } = useSelector(state => state.donars)
    const [capLoading, setCapLoading] = useState(false)
    const { clubs } = useSelector(state => state.clubs)

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
    useEffect(() => {
        if (!clubs) {
            dispatch(getAllclubs())
        }
    }, [])
    if (loading || capLoading) {
        return <Loading />
    }
    return (
        <form className="donation-form">
            <div>
                <TextField
                    disabled={anonymous}
                    required
                    id="name"
                    label="Enter Full Name"
                    variant="outlined"
                    placeholder={`Firstname Lastname`}
                    onChange={(e) =>
                        setFormData(prev => ({ ...prev, name: e.target.value }))
                    }
                />
                 <TextField
                    disabled={anonymous}
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
                    disabled={anonymous}
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
                    id="Note"
                    label="Note"
                    variant="outlined"
                    placeholder={`Write you Note Here`}
                    multiline
                    rows={2}
                    onChange={(e) =>
                        setFormData(prev => ({ ...prev, message: e.target.value }))
                    }
                />
            </div>
            <div className="donation-form-amount">
                <TextField
                    select
                    label="Club"
                    onChange={(e) =>
                        setFormData(prev => ({ ...prev, club: e.target.value }))
                    }
                >
                    {clubs && clubs.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                            {option.name}
                        </MenuItem>
                    ))}
                    <MenuItem value={undefined}>
                        General
                    </MenuItem>
                </TextField>
                <TextField
                    required
                    id="amount"
                    label="Enter Amount"
                    variant="outlined"
                    type="number"
                    value={amount}
                    onChange={(e) =>
                        setamount(e.target.value)
                    }
                />
                <div className="donation-form-amount-btns">
                    <div onClick={(e) => setamount(100)}>₹100</div>
                    <div onClick={(e) => setamount(500)}>₹500</div>
                    <div onClick={(e) => setamount(1000)}>₹1000</div>
                </div>


            </div>

            <div className="donation-form-checkBox-div">
                {recapchaKey &&
                    <div>
                        <ReCAPTCHA
                            sitekey={recapchaKey}
                            onChange={onChange}
                        />
                    </div>
                }
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={anonymous}
                            onClick={() => setAnonymous(prev => !prev)}
                        />
                    }
                    label="Donate Money Anonymously"
                />

            </div>
            <PaymentButton formData={formData} amount={amount} CaptchaValue={CaptchaValue} anonymous={anonymous} />
        </form>
    )
}