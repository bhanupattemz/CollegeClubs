import "./UpdateProfile.css";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import LoadingButton from '@mui/lab/LoadingButton';
import { updateUserProfile, setIsUpdateFalse } from "../../Actions/userActions"
import Loading from "../Loaders/Loading";
export default function UpdateProfile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [profile, setProfile] = useState()
    const [profilePrev, setProfilePrev] = useState("https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721047699/Epic%20Essentials/pjlmvwy41tdhblpskhnj.png")
    let { user, loading, isUpdated } = useSelector((state) => state.user);
    const [username, setusername] = useState()
    const [personalInformation, setPersonalInformation] = useState(undefined);
    const [academic, setAcademic] = useState({});
    const [description, setDescription] = useState("");
    const [department, setDepartment] = useState(user.role == "admin" ? user.department : undefined);
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
            fd.append("description", description)
        }
        if (user.role == "admin") {
            fd.append("department", department)
        }
        dispatch(updateUserProfile(fd))
    };
    useEffect(() => {
        if (user) {
            setPersonalInformation({
                ...user.personalInformation,
                DOB: dayjs(user.personalInformation.DOB),
            });
            setAcademic({
                course: user.course,
                branch: user.branch,
                academicYear: user.academicYear,
            });
            setusername(user.username)
            setProfilePrev(user.personalInformation.profile.url || "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721047699/Epic%20Essentials/pjlmvwy41tdhblpskhnj.png")
            setDescription(user.description);
        }
        if (isUpdated) {
            dispatch(setIsUpdateFalse())
            navigate("/profile")
        }
    }, [user]);

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
    if (loading) {
        return <Loading />
    }
    return (
        <main>
            <section className="update-profile-section">
                <form onSubmit={formSubmitHandler} noValidate>
                    {personalInformation && (
                        <div className="update-profile-personal">
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
                                    id="username"
                                    label="Username"
                                    variant="outlined"
                                    value={username}
                                    onChange={(e) =>
                                        setusername(e.target.value)
                                    }
                                />
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
                                {user.role == "admin" &&
                                    <TextField
                                        required
                                        select
                                        label="Department"
                                        value={department}
                                        onChange={(e) =>
                                            setDepartment(e.target.value)
                                        }
                                    >
                                        {branches.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                }

                            </div>
                            <div className="update-profile-personal-feilds">
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
                                <div className="profile-img-picker">
                                    <img src={profilePrev} alt="profile-prev" />
                                    <input
                                        type="file"
                                        accept="image/* "
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
                    )}
                    {["student", "coordinator"].includes(user.role) && (
                        <div className="update-profile-academic-information">
                            <h2>Academic Information</h2>
                            <div>
                                <TextField
                                    disabled
                                    id="adno"
                                    label="Admission Number"
                                    variant="outlined"
                                    value={user.admissionNo}
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
                    )}
                    {["admin", "coordinator"].includes(user.role) && (
                        <div className="update-profile-description">
                            <h2>Description</h2>
                            <TextField
                                id="description"
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                placeholder="Write about yourself"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    )}
                    <LoadingButton
                        type="submit"
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        SUBMIT
                    </LoadingButton>

                </form>
            </section>
        </main>
    );
}
