import { useEffect, useState } from "react"
import "./UpdatePassword.css"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { setIsUpdateFalse, resetPasword } from "../../../Actions/userActions"
import Loading from "../../Loaders/Loading"

import TextField from "@mui/material/TextField";
export default function updatePassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useParams()
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordCon, setShowPasswordCon] = useState(false)
    const [passwords, setPasswords] = useState()
    const [mail, setMail] = useState()
    const { loading, isUpdated } = useSelector(state => state.user)
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (passwords.newpassword == passwords.confirmpassword) {
            dispatch(resetPasword(token, { ...passwords, mail }))
        } else {
            console.log("new password and confirm password not matched")
        }
    }
    useEffect(() => {
        if (isUpdated) {
            dispatch(setIsUpdateFalse())
            navigate("/signin")
        }
    }, [loading])
    if (loading) {
        return <Loading />
    }
    return (
        <main className="update-password-main">
            <form onSubmit={formSubmitHandler}>
                <h1>Reset Password</h1>
                <div>
                    <TextField
                        required
                        id="Mail"
                        label="Mail"
                        variant="outlined"
                        type="email"
                        value={mail}
                        placeholder={`example@gmail.com}`}
                        onChange={(e) =>
                            setMail(e.target.value)
                        }
                    />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword ? 'hide the password' : 'display the password'
                                        }
                                        onClick={() => setShowPassword((show) => !show)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={(e) =>
                                setPasswords(prev => ({ ...prev, newpassword: e.target.value }))
                            }
                            label="Password"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-password"
                            type={showPasswordCon ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPasswordCon ? 'hide the password' : 'display the password'
                                        }
                                        onClick={() => setShowPasswordCon((show) => !show)}
                                        edge="end"
                                    >
                                        {showPasswordCon ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={(e) =>
                                setPasswords(prev => ({ ...prev, confirmpassword: e.target.value }))
                            }
                            label="confirm Password"
                        />
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
            </form>
        </main>
    )
}