import "./AdminSignUp.css"
import { useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { adminSignup } from "../../../Actions/userActions";
import Loading from "../../Loaders/Loading";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  mail: Yup.string().email("Invalid email address").required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string().min(6, "Must be 6 characters or more").required("Required"),
  passwordCon: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  personalMail: Yup.string().email("Invalid email address").required("Required"),
  mobileNo: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  description: Yup.string().min(300, "Must be at least 300 characters").required("Required"),
  DOB: Yup.date().required("Required")
});

export default function AdminSignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCon, setShowPasswordCon] = useState(false);
    const [profile, setProfile] = useState();
    const [profilePrev, setProfilePrev] = useState("https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721047699/Epic%20Essentials/pjlmvwy41tdhblpskhnj.png");
    const { _id } = useParams();
    const { loading, user } = useSelector(state => state.user);

    const formik = useFormik({
        initialValues: {
            mail: "",
            username: "",
            password: "",
            passwordCon: "",
            firstname: "",
            lastname: "",
            personalMail: "",
            mobileNo: "",
            gender: "",
            department: "",
            description: "",
            DOB: null
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const fd = new FormData();
            fd.append('mail', values.mail);
            fd.append('username', values.username);
            fd.append('password', values.password);
            fd.append('firstname', values.firstname);
            fd.append('lastname', values.lastname);
            fd.append('personalMail', values.personalMail);
            fd.append('mobileNo', values.mobileNo);
            fd.append('gender', values.gender);
            fd.append('DOB', dayjs(values.DOB).toISOString());
            fd.append('description', values.description);
            fd.append('department', values.department);
            if (profile) {
                fd.append('profile', profile);
            }
            dispatch(adminSignup(fd, _id));
        },
    });

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

    if (user) {
        navigate("/profile");
    }

    if (loading) return <Loading />;

    return (
        <main className="admin-signup-main">
            <form onSubmit={formik.handleSubmit} className="admin-signup-form">
                <h2>Account Information</h2>
                <div className="admin-signup-account-information">
                    <TextField
                        id="mail"
                        name="mail"
                        label="Mail"
                        variant="outlined"
                        type="email"
                        value={formik.values.mail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.mail && Boolean(formik.errors.mail)}
                        helperText={formik.touched.mail && formik.errors.mail}
                        placeholder="example@gmail.com"
                    />
                    <div>
                        <TextField
                            disabled
                            id="Role"
                            label="Role"
                            variant="outlined"
                            value="Admin"
                        />
                        <TextField
                            id="department"
                            name="department"
                            select
                            label="Department"
                            value={formik.values.department}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.department && Boolean(formik.errors.department)}
                            helperText={formik.touched.department && formik.errors.department}
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
                        id="username"
                        name="username"
                        label="Username"
                        variant="outlined"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="passwordCon">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="passwordCon"
                            name="passwordCon"
                            type={showPasswordCon ? 'text' : 'password'}
                            value={formik.values.passwordCon}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.passwordCon && Boolean(formik.errors.passwordCon)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPasswordCon(!showPasswordCon)}
                                        edge="end"
                                    >
                                        {showPasswordCon ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm Password"
                        />
                    </FormControl>
                </div>

                <h2>Personal Information</h2>
                <div className="admin-signup-personal-information-div-1">
                    <TextField
                        id="firstname"
                        name="firstname"
                        label="First Name"
                        variant="outlined"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                        helperText={formik.touched.firstname && formik.errors.firstname}
                    />
                    <TextField
                        id="lastname"
                        name="lastname"
                        label="Last Name"
                        variant="outlined"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                        helperText={formik.touched.lastname && formik.errors.lastname}
                    />
                    <TextField
                        id="gender"
                        name="gender"
                        select
                        label="Gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                        helperText={formik.touched.gender && formik.errors.gender}
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
                        id="personalMail"
                        name="personalMail"
                        label="Personal Mail"
                        variant="outlined"
                        type="email"
                        value={formik.values.personalMail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.personalMail && Boolean(formik.errors.personalMail)}
                        helperText={formik.touched.personalMail && formik.errors.personalMail}
                    />
                    <TextField
                        id="mobileNo"
                        name="mobileNo"
                        label="Mobile Number"
                        variant="outlined"
                        type="number"
                        value={formik.values.mobileNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
                        helperText={formik.touched.mobileNo && formik.errors.mobileNo}
                    />
                </div>

                <div className="admin-signup-personal-infor-div3">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                label="Date Of Birth"
                                value={formik.values.DOB}
                                onChange={(value) => formik.setFieldValue("DOB", value)}
                                onBlur={formik.handleBlur}
                                error={formik.touched.DOB && Boolean(formik.errors.DOB)}
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
                                setProfile(file);
                                const reader = new FileReader();
                                reader.onload = () => {
                                    if (reader.readyState === 2) {
                                        setProfilePrev(reader.result);
                                    }
                                };
                                reader.readAsDataURL(file);
                            }}
                        />
                    </div>
                </div>

                <h2>Description</h2>
                <div className="admin-signup-description">
                    <TextField
                        id="description"
                        name="description"
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
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
    );
}