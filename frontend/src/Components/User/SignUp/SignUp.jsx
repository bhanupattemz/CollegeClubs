import "./SignUp.css"
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
import { Link, useNavigate, useLocation } from "react-router-dom"
import { signUpUser } from "../../../Actions/userActions"
import Loading from "../../Loaders/Loading"
import axios from "axios";
import { BACKENDURL } from "../../Functionalities/functionalites"
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
export default function SignUp() {
    const dispatch = useDispatch()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCon, setShowPasswordCon] = useState(false);
    const [profile, setProfile] = useState()
    const [role, setRole] = useState()
    const [profilePrev, setProfilePrev] = useState("https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721047699/Epic%20Essentials/pjlmvwy41tdhblpskhnj.png")
    const [credensials, setLoginCredensials] = useState({ username: undefined, password: undefined, passwordCon: undefined })
    const { loading, isauthenticate } = useSelector(state => state.user)
    const { prevLocation } = useSelector(state => state.prevLocation)
    const [cLoading, setCLoading] = useState(false)
    const [personalInformation, setPersonalInformation] = useState({ firstname: undefined, lastname: undefined, personalMail: undefined, mobileNo: undefined });
    const [academic, setAcademic] = useState({ course: undefined, admissionNo: undefined, gender: undefined, academicYear: undefined });
    const [step, setStep] = useState(1);
    const [mail, setMail] = useState(queryParams.get('mail'))
    const [otp, setotp] = useState()
    const navigate = useNavigate()
    const formSubmitHandler = (e) => {
        e.preventDefault();
        async function sendData() {
            if (step == 1) {
                try {
                    const data = mail.split("@");
                    if (role == "student" && data[1] != "jntua.ac.in") {
                        console.log("Students must use their college email (e.g., name@jntua.ac.in) to register for this role.")
                    } else {
                        setAcademic(prev => ({ ...prev, admissionNo: data[0] }))
                        setCLoading(true)
                        const respounce = await axiosInstance.post("/signup/generate", { mail, role })
                        setStep(2)
                    }
                } catch (err) {
                    console.log(err)
                }
                setCLoading(false)
            } else if (step == 2) {
                try {
                    setCLoading(true)
                    const respounce = await axiosInstance.post("/signup/verify", { mail, otp })
                    setStep(3)
                } catch (err) {
                    console.log(err)
                }
                setCLoading(false)
            } else if (step == 3) {
                const fd = new FormData();
                fd.append('mail', mail);
                fd.append('username', credensials.username)
                fd.append('password', credensials.password);
                fd.append('firstname', personalInformation.firstname);
                fd.append('lastname', personalInformation.lastname);
                fd.append('personalMail', personalInformation.personalMail);
                fd.append('mobileNo', personalInformation.mobileNo);
                fd.append('gender', personalInformation.gender);
                fd.append('DOB', dayjs(personalInformation.DOB).toISOString());
                if (profile) {
                    fd.append('profile', profile);
                }
                if (role === 'student') {
                    fd.append('admissionNo', academic.admissionNo);
                    fd.append('course', academic.course);
                    fd.append('branch', academic.branch);
                    fd.append('academicYear', academic.academicYear);
                }
                dispatch(signUpUser(fd))
            }
        }
        sendData()
    }
    useEffect(() => {
        if (isauthenticate) {
            navigate(prevLocation)
        }
    }, [isauthenticate])
    const genders = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
    ];
    const degrees = [
        { value: "b-tech", label: "B.Tech" },
        { value: "mba", label: "MBA" },
        { value: "mca", label: "MCA" },
        { value: "m-tech", label: "M.Tech" },
    ];
    const branches = [
        { value: "cse", label: "CSE" },
        { value: "ece", label: "ECE" },
        { value: "eee", label: "EEE" },
        { value: "civ", label: "Civil" },
        { value: "mech", label: "Mechanical" },
        { value: "chem", label: "Chemical" },
    ];
    const years = [
        { value: 1, label: "1st Year" },
        { value: 2, label: "2nd Year" },
        { value: 3, label: "3rd Year" },
        { value: 4, label: "4th Year" },
    ];
    const roles = [
        { value: "student", label: "Student" },
        { value: "general", label: "General" }
    ]
    if (loading) {
        return <Loading />
    }
    return (
        <main className="signup-main">
            <form onSubmit={formSubmitHandler} >
                <h1>Register</h1>
                <div className="verification">
                    <h2>Verification</h2>
                    <div>
                        <TextField
                            required
                            disabled={step != 1}
                            id="Mail"
                            label="Mail"
                            variant="outlined"
                            type="email"
                            value={mail}
                            placeholder={`example@${role == "general" ? "gmail.com" : "jntua.ac.in"}`}
                            onChange={(e) =>
                                setMail(e.target.value)
                            }
                        />

                        <TextField
                            required
                            select
                            label="Role"
                            disabled={step != 1}
                            value={academic.course}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                        >
                            {roles.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <LoadingButton
                            endIcon={<SendIcon />}
                            loading={cLoading}
                            loadingPosition="end"
                            variant="contained"
                            type="submit"
                            disabled={step !== 1}
                        >
                            SEND
                        </LoadingButton>


                    </div>

                    {step > 1 &&
                        <div>
                            <TextField
                                required
                                disabled={step != 2}
                                id="otp"
                                label="Enter OTP"
                                variant="outlined"
                                value={personalInformation.personalMail}
                                type="number"
                                onChange={(e) =>
                                    setotp(e.target.value)
                                }
                            />

                            <LoadingButton
                                disabled={step != 2}
                                loading={cLoading}
                                loadingPosition="end"
                                variant="contained"
                                type="submit"
                            >
                                VERIFY
                            </LoadingButton>
                        </div>
                    }
                </div>
                {step > 2 &&
                    <Fragment>
                        <div className="sigup-login-credentials">
                            <h2>Login Credentials</h2>
                            <div>
                                <TextField

                                    required
                                    id="UserName"
                                    label="Username"
                                    variant="outlined"
                                    value={credensials.username}
                                    onChange={(e) =>
                                        setLoginCredensials((prev) => ({
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
                                            setLoginCredensials((prev) => ({
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
                                            setLoginCredensials((prev) => ({
                                                ...prev,
                                                password: e.target.value,
                                            }))
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="signup-personal">
                            <h2>Personal Information</h2>
                            <div>
                                <TextField
                                    required
                                    id="firstname"
                                    label="First Name"
                                    variant="outlined"
                                    value={personalInformation.firstname}
                                    onChange={(e) =>
                                        setPersonalInformation((prev) => ({
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
                                    value={personalInformation.lastname}
                                    onChange={(e) =>
                                        setPersonalInformation((prev) => ({
                                            ...prev,
                                            lastname: e.target.value,
                                        }))
                                    }
                                />
                                <TextField
                                    required
                                    select
                                    label="Gender"
                                    value={personalInformation.gender}
                                    onChange={(e) =>
                                        setPersonalInformation((prev) => ({
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
                            <div>
                                <TextField
                                    required
                                    id="personalMail"
                                    label="Personal Mail"
                                    variant="outlined"
                                    type="email"
                                    value={personalInformation.personalMail}
                                    onChange={(e) =>
                                        setPersonalInformation((prev) => ({
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
                                    value={personalInformation.mobileNo}
                                    onChange={(e) =>
                                        setPersonalInformation((prev) => ({
                                            ...prev,
                                            mobileNo: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="signup-personal-feilds">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker
                                            label="Date Of Birth"
                                            value={personalInformation.DOB}
                                            onChange={(val) =>
                                                setPersonalInformation((prev) => ({
                                                    ...prev,
                                                    DOB: val,
                                                }))
                                            }
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <div className="signup-img-picker">
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
                        </div>

                        {role == "student" &&
                            <div className="signup-academic-information">
                                <h2>Academic Information</h2>
                                <div>
                                    <TextField
                                        disabled
                                        id="adno"
                                        label="Admission Number"
                                        variant="outlined"
                                        value={academic.admissionNo}
                                    />
                                    <TextField
                                        required
                                        select
                                        label="Degree"
                                        value={academic.course}
                                        onChange={(e) =>
                                            setAcademic((prev) => ({
                                                ...prev,
                                                course: e.target.value,
                                            }))
                                        }
                                    >
                                        {degrees.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        required
                                        select
                                        label="Branch"
                                        value={academic.branch}
                                        onChange={(e) =>
                                            setAcademic((prev) => ({
                                                ...prev,
                                                branch: e.target.value,
                                            }))
                                        }
                                    >
                                        {branches.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        required
                                        select
                                        label="Year"
                                        value={academic.academicYear}
                                        onChange={(e) =>
                                            setAcademic((prev) => ({
                                                ...prev,
                                                academicYear: e.target.value,
                                            }))
                                        }
                                    >
                                        {years.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                        }
                        <LoadingButton
                            id="signup-submit-btn"
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            type="submit"
                        >
                            SUBMIT
                        </LoadingButton>
                    </Fragment>
                }

            </form>
        </main>
    )
}