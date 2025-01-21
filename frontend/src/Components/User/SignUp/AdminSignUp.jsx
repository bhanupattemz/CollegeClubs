import "./AdminSignUp.css"
import { useState, useEffect, Fragment } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector, useDispatch } from "react-redux";
import SendIcon from '@mui/icons-material/Send';
import dayjs from "dayjs";
import LoadingButton from '@mui/lab/LoadingButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import { adminSignup } from "../../../Actions/userActions"
import Loading from "../../Loaders/Loading"
import axios from "axios";
import { BACKENDURL } from "../../Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
export default function AdminSignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setformData] = useState({})
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCon, setShowPasswordCon] = useState(false);
    const [profile, setProfile] = useState()
    const [profilePrev, setProfilePrev] = useState("https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721047699/Epic%20Essentials/pjlmvwy41tdhblpskhnj.png")
    const { _id } = useParams()
    const { loading, user } = useSelector(state => state.user)
    const genders = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ];
    const departments = [
        { value: "cse", label: "CSE" },
        { value: "ece", label: "ECE" },
        { value: "eee", label: "EEE" },
        { value: "civ", label: "Civil" },
        { value: "mech", label: "Mechanical" },
        { value: "chem", label: "Chemical" },
    ];
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (formData.password == formData.passwordCon) {
            const fd = new FormData();
            fd.append('mail', formData.mail);
            fd.append('username', formData.username)
            fd.append('password', formData.password);
            fd.append('firstname', formData.firstname);
            fd.append('lastname', formData.lastname);
            fd.append('personalMail', formData.personalMail);
            fd.append('mobileNo', formData.mobileNo);
            fd.append('gender', formData.gender);
            fd.append('DOB', dayjs(formData.DOB).toISOString());
            fd.append('description', formData.description);
            fd.append('department', formData.department);
            if (profile) {
                fd.append('profile', profile);
            }
            dispatch(adminSignup(fd, _id))
        } else {
            console.log("password not matches")
        }

    }
    if (user) {
        navigate("/profile")
    }
    return (
        <main className="admin-signup-main">
            <form onSubmit={formSubmitHandler} className="admin-signup-form">

                <h2>Account Information </h2>
                <div className="admin-signup-account-information">
                    <TextField
                        required
                        id="Mail"
                        label="Mail"
                        variant="outlined"
                        type="email"
                        value={formData.mail}
                        placeholder={`example@gmail.com`}
                        onChange={(e) =>
                            setformData(prev => ({ ...prev, mail: e.target.value }))
                        }
                    />
                    <div>
                        <TextField
                            required
                            disabled
                            id="Role"
                            label="Role"
                            variant="outlined"
                            value="Admin"
                        />

                        <TextField
                            required
                            select
                            label="Department"
                            onChange={(e) =>
                                setformData((prev) => ({
                                    ...prev,
                                    department: e.target.value,
                                }))
                            }
                        >
                            {departments.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                </div>


                <h2>Login Credentials</h2>
                <div className="admin-signup-credentials">
                    <TextField
                        required
                        id="UserName"
                        label="Username"
                        variant="outlined"
                        onChange={(e) =>
                            setformData((prev) => ({
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
                                        onClick={() => setShowPassword((show) => !show)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={(e) =>
                                setformData((prev) => ({
                                    ...prev,
                                    passwordCon: e.target.value,
                                }))
                            }
                            label="Password"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
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
                                setformData((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                }))
                            }
                            label="Password"
                        />
                    </FormControl>
                </div>


                <h2>Personal Information</h2>
                <div >
                    <TextField
                        required
                        id="firstname"
                        label="First Name"
                        variant="outlined"
                        onChange={(e) =>
                            setformData((prev) => ({
                                ...prev,
                                firstname: e.target.value,
                            }))
                        }
                    />
                    <TextField
                        required
                        id="lastname"
                        label="Last Name"
                        variant="outlined"
                        onChange={(e) =>
                            setformData((prev) => ({
                                ...prev,
                                lastname: e.target.value,
                            }))
                        }
                    />
                    <TextField
                        required
                        select
                        label="Gender"
                        onChange={(e) =>
                            setformData((prev) => ({
                                ...prev,
                                gender: e.target.value,
                            }))
                        }
                    >
                        {genders.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className="admin-signup-personal-infor-div2">
                    <TextField
                        required
                        id="personalMail"
                        label="Personal Mail"
                        variant="outlined"
                        type="email"
                        onChange={(e) =>
                            setformData((prev) => ({
                                ...prev,
                                personalMail: e.target.value,
                            }))
                        }
                    />
                    <TextField
                        required
                        id="mobileno"
                        label="Mobile Number"
                        variant="outlined"
                        type="number"
                        onChange={(e) =>
                            setformData((prev) => ({
                                ...prev,
                                mobileNo: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="admin-signup-personal-infor-div3">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                label="Date Of Birth"
                                required
                                onChange={(val) =>
                                    setformData((prev) => ({
                                        ...prev,
                                        DOB: val,
                                    }))
                                }
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <div className="admin-signup-img-picker">
                        <img src={profilePrev} alt="profile-prev" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setProfile(file)
                                const reader = new FileReader();
                                reader.onload = () => {
                                    if (reader.readyState === 2) {
                                        setProfilePrev(reader.result);
                                    }
                                };
                                reader.readAsDataURL(file);
                            }
                            }
                        />
                    </div>
                </div>


                <h2>Description</h2>
                <div className="admin-signup-description">
                    <TextField
                        required
                        id="description"
                        label="Description"
                        variant="outlined"
                        minLength={300}
                        multiline
                        rows={4}
                        error={formData.description && formData.description.length < 300}
                        helperText={(formData.description && formData.description.length) < 300 ? "Description must be at least 300 characters" : ""}
                        onChange={(e) =>
                            setformData((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                    />
                </div>

                <div className="admmin-signup-btn">
                    <LoadingButton
                        id="signup-submit-btn"
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                        type="submit"
                    >
                        Register
                    </LoadingButton>
                </div>
            </form>
        </main>
    )
}