import AdminSetup from "../AdminSetUp"
import { useState, useEffect } from "react";
import "./UpdateUser.css"
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useParams } from "react-router-dom"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BACKENDURL } from "../../../Functionalities/functionalites"
import axios from "axios"
import dayjs from "dayjs";
import LoadingButton from '@mui/lab/LoadingButton';
import Loading from "../../../Loaders/Loading";
import { adminUpdateUser } from "../../../../Actions/userActions"
import { clearSuccess } from "../../../../Reducers/User/usersReducer"
import { useSelector, useDispatch } from "react-redux"

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UpdateUser() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    });
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const { success, loading: usersLoading } = useSelector(state => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [profile, setProfile] = useState();

    const { _id } = useParams();
    const [profilePrev, setProfilePrev] = useState("https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721047699/Epic%20Essentials/pjlmvwy41tdhblpskhnj.png");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [username, setUsername] = useState();
    const [personalInformation, setPersonalInformation] = useState(undefined);
    const [academic, setAcademic] = useState({});
    const [description, setDescription] = useState("");
    const [department, setDepartment] = useState(user.role === "admin" ? user.department : undefined);

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

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('firstname', personalInformation.firstname);
        fd.append('lastname', personalInformation.lastname);
        fd.append('personalMail', personalInformation.personalMail);
        fd.append('mobileNo', personalInformation.mobileNo);
        fd.append('gender', personalInformation.gender);
        fd.append('DOB', dayjs(personalInformation.DOB).toISOString());
        fd.append('profile', profile);
        fd.append('username', username);

        if (user.role === 'student' || user.role == "coordinator") {
            fd.append('admissionNo', academic.admissionNo);
            fd.append('course', academic.course);
            fd.append('branch', academic.branch);
            fd.append('academicYear', academic.academicYear);
        }

        if (["coordinator", "admin"].includes(user.role)) {
            fd.append("description", description);
        }

        if (user.role == "admin") {
            fd.append("department", department);
        }
        dispatch(adminUpdateUser(fd, _id));
    };

    useEffect(() => {
        if (user && user.personalInformation) {
            setPersonalInformation({
                ...user.personalInformation,
                DOB: dayjs(user.personalInformation.DOB),
            });
            setAcademic({
                course: user.course,
                branch: user.branch,
                academicYear: user.academicYear,
            });
            setUsername(user.username);
            setProfilePrev(user.personalInformation.profile.url || "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721047699/Epic%20Essentials/pjlmvwy41tdhblpskhnj.png");
            setDescription(user.description);
        }
    }, [user]);

    useEffect(() => {
        async function getuser(params) {
            try {
                setLoading(true);
                const respounce = await axiosInstance.get(`/users/${_id}`);
                setUser(respounce.data.data);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }

        if (_id) {
            getuser();
        }
    }, [_id]);
    useEffect(() => {
        if (success) {
            dispatch(clearSuccess())
            navigate("/admin/users")
        }
    }, [success])

    if (loading || usersLoading) return <AdminSetup current={"users"} option={"update-user"} element={<Loading />} />;
    return (
        <AdminSetup current={"users"} option={"update-user"} element={
            <section className="admin-update-user">
                <form onSubmit={formSubmitHandler} noValidate>
                    {personalInformation && (
                        <div className="profile-section">
                            <h2>Personal Information</h2>
                            <div className="profile-fields">
                                <TextField required label="First Name" variant="outlined" value={personalInformation.firstname} onChange={(e) => setPersonalInformation({ ...personalInformation, firstname: e.target.value })} />
                                <TextField required label="Last Name" variant="outlined" value={personalInformation.lastname} onChange={(e) => setPersonalInformation({ ...personalInformation, lastname: e.target.value })} />
                                <TextField required label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <TextField required select label="Gender" value={personalInformation.gender} onChange={(e) => setPersonalInformation({ ...personalInformation, gender: e.target.value })}>
                                    {genders.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                                </TextField>
                            </div>
                            <div className="contact-fields">
                                <TextField required label="Personal Mail" variant="outlined" type="email" value={personalInformation.personalMail} onChange={(e) => setPersonalInformation({ ...personalInformation, personalMail: e.target.value })} />
                                <TextField required label="Mobile Number" variant="outlined" type="number" value={personalInformation.mobileNo} onChange={(e) => setPersonalInformation({ ...personalInformation, mobileNo: e.target.value })} />
                                {user.role === "admin" && (
                                    <TextField required select label="Department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                                        {branches.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                                    </TextField>
                                )}
                            </div>
                            <div className="admin-update-user-row-3">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker label="Date Of Birth" value={personalInformation.DOB} onChange={(val) => setPersonalInformation({ ...personalInformation, DOB: val })} />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <div className="profile-img-picker">
                                    <img src={profilePrev} alt="profile-prev" />
                                    <Button
                                        component="label"
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload files
                                        <VisuallyHiddenInput
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
                                    </Button>
                                </div>
                            </div>

                        </div>
                    )}

                    {["student", "coordinator"].includes(user.role) && (
                        <div className="academic-section">
                            <h2>Academic Information</h2>
                            <div className="academic-fields">
                                <TextField disabled label="Admission Number" variant="outlined" value={user.admissionNo} />
                                <TextField required select label="Degree" value={academic.course} onChange={(e) => setAcademic({ ...academic, course: e.target.value })}>
                                    {degrees.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                                </TextField>
                                <TextField required select label="Branch" value={academic.branch} onChange={(e) => setAcademic({ ...academic, branch: e.target.value })}>
                                    {branches.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                                </TextField>
                                <TextField required select label="Year" value={academic.academicYear} onChange={(e) => setAcademic({ ...academic, academicYear: e.target.value })}>
                                    {years.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                                </TextField>
                            </div>
                        </div>
                    )}

                    {["admin", "coordinator"].includes(user.role) && (
                        <div className="description-section">
                            <h2>Description</h2>
                            <TextField label="Description" variant="outlined" multiline fullWidth rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    )}

                    <LoadingButton type="submit" loading={loading} loadingPosition="end" variant="contained">SUBMIT</LoadingButton>
                </form>
            </section>
        } />
    );
}
