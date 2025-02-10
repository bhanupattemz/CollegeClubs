import { useEffect, useState } from "react";
import "./ForgotPassword.css"
import { useNavigate } from "react-router-dom"
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { resetPaswordToken, setIsUpdateFalse } from "../../Actions/userActions"
import LoadingButton from '@mui/lab/LoadingButton';
import Loading from "../Loaders/Loading";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";


export default function ForgotPassword() {
    const dispatch = useDispatch()
    const { loading, isathenticate, isUpdated } = useSelector(state => state.user)
    const { prevLocation } = useSelector(state => state.prevLocation)
    const [mail, setMail] = useState()
    const navigate = useNavigate()
    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPaswordToken({ mail }))
    }
    const [sent, setSent] = useState(false)
    useEffect(() => {
        if (isUpdated) {
            setSent(true)
            dispatch(setIsUpdateFalse())
        }
    })
    useEffect(() => {
        if (isathenticate) {
            navigate(prevLocation)
        }
    })
    return (
        <main className="forgot-password-main">
            {sent ? <div className="forgot-password-mail-send">
                <h1><IoCheckmarkDoneCircleSharp />Mail Sent, check your mail to reset password</h1>
            </div> :
                <form onSubmit={formSubmitHandler}>
                    <h1>Forgot Password</h1>
                    <div>
                        <TextField
                            required
                            id="mail"
                            label="Mail"
                            variant="outlined"
                            type="mail"
                            placeholder="example@gmail.com"
                            onChange={(e) =>
                                setMail(e.target.value)
                            }
                        />
                        <LoadingButton
                            id="forgot-password-submit-btn"
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            type="submit"
                        >
                            SUBMIT
                        </LoadingButton>
                    </div>

                </form>
            }
        </main>
    )
}