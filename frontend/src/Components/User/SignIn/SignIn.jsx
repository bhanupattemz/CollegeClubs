import "./SignIn.css"
import { signInUser } from "../../../Actions/userActions"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loading from "../../Loaders/Loading"
import TextField from "@mui/material/TextField";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom"
export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    const [userData, setUserData] = useState({ username: null, password: null })
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const { prevLocation } = useSelector(state => state.prevLocation)
    const navigate = useNavigate()
    const { user, loading } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const signInFormSubmitHandler = (e) => {
        e.preventDefault();
        console.log(userData)
        dispatch(signInUser(userData))
    }
    useEffect(() => {
        if (user) {
            navigate(prevLocation)
        }
    }, [user])

    if (loading) {
        return <Loading />
    }
    return (
        <main className="signin-main">
            <form className="signin-form" onSubmit={signInFormSubmitHandler}>

                <TextField
                    required
                    id="username"
                    label="Username"
                    variant="outlined"
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            username: e.target.value,
                        }))
                    }
                />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={(e) =>
                            setUserData((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                        label="Password"
                    />
                </FormControl>
                <div>
                    <Link to="/signup">Register</Link>
                </div>
                <div>
                    <Link to="/password/reset">Forgot Password</Link>
                </div>
                <button >Submit</button>
            </form>
        </main>
    )
}