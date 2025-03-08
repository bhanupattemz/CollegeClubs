import "./UpsertClub.css"
import AdminSetUp from "../AdminSetUp"
import { useSelector, useDispatch } from "react-redux"
import { setClubSuccessFalse } from "../../../../Actions/clubsAction"
import { Fragment, useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate } from "react-router-dom"
import { adminGetAllUsers } from "../../../../Actions/userActions"
import { adminCreateClub } from "../../../../Actions/clubsAction"
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DataGrid } from "@mui/x-data-grid";
import { IoMdCloseCircle } from "react-icons/io";
import dayjs from "dayjs";
import Banner from "../../../Clubs/Banner"
export default function CreateClub() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { users, loading } = useSelector(state => state.users)
    const { singleClub, loading: clubLoading, success } = useSelector(state => state.singleClub)
    const [userKey, setUserKey] = useState("")
    const [coordinators, setCordinators] = useState([])
    const [skill, setSkill] = useState()
    const [day, setDay] = useState()
    const [timing, setTiming] = useState({ starting: null, ending: null })
    const [registration, setRegistration] = useState({})
    const [formData, setFormData] = useState({})
    const [logoPrev, setLogoPrev] = useState("https://res.cloudinary.com/delc5g3p5/image/upload/v1729762295/Clubs/n3eov9yrilskbwzr4006.png")
    const [bannerPrev, setBannerPrev] = useState("https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg")
    const clubTypes = [
        { "value": "cultural", "label": "Cultural" },
        { "value": "technical", "label": "Technical" },
        { "value": "sports", "label": "Sports" },
        { "value": "social", "label": "Social" },
        { "value": "academic", "label": "Academic" },
        { "value": "other", "label": "Other" }
    ]
    const days = [
        { "value": "Sun", "label": "Sun" },
        { "value": "Mon", "label": "Mon" },
        { "value": "Tue", "label": "Tue" },
        { "value": "Wed", "label": "Wed" },
        { "value": "Thu", "label": "Thu" },
        { "value": "Fri", "label": "Fri" },
        { "value": "Sat", "label": "Sat" }
    ]
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
    const columns = [
        { field: "id", headerName: "Admisson No", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "department", headerName: "Department", flex: 0.15 },
        { field: "mail", headerName: "Mail", flex: 0.2 },
        {
            field: "makeCoordinator", headerName: "Coordinator", flex: 0.18,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div >
                            <Checkbox
                                defaultChecked={formData.coordinators && formData.coordinators.includes(params.value._id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setCordinators(prev => [...prev, params.value]);
                                        setFormData(prev => ({
                                            ...prev,
                                            coordinators: prev.coordinators ? [...prev.coordinators, params.value._id] : [params.value._id]
                                        }));
                                    } else {
                                        setCordinators(prev => prev.filter(item => item._id !== params.value._id));
                                        setFormData(prev => ({
                                            ...prev,
                                            coordinators: prev.coordinators.filter(item => item !== params.value._id)
                                        }));
                                    }
                                }}
                            />


                        </div>
                    )

                }
            }
        },

    ]
    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (!formData.bannerImage || !formData.logo || !formData.skills ||
            formData.skills.length <= 0 || !formData.timings || formData.timings.length <= 0) {
            alert("required fleids are missing")
        } else {
            const fd = new FormData();
            fd.append('bannerImage', formData.bannerImage);
            fd.append('coordinators', JSON.stringify(formData.coordinators));
            fd.append('registrationTiming', JSON.stringify(registration));
            fd.append('description', formData.description);
            fd.append('landMark', formData.landMark);
            fd.append('logo', formData.logo);
            fd.append('name', formData.name);
            fd.append('skills', JSON.stringify(formData.skills));
            fd.append('timings', JSON.stringify(formData.timings));
            fd.append('type', formData.type);
            fd.append('venueName', formData.venueName);
            dispatch(adminCreateClub(fd))
        }

    }
    useEffect(() => {
        if (success) {
            dispatch(setClubSuccessFalse())
            navigate(`/clubs/${singleClub._id}`)

        }
    }, [singleClub])
    if (clubLoading) {
        return <AdminSetUp current={"clubs"} option={"create"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"clubs"} option={"create"} element={
            <Fragment>
                <Banner link={bannerPrev} heading={formData.name || "Club Name"} btntext={"Register Now Demo"} btnFunction={() => { }} /> :
                <form onSubmit={formSubmitHandler} className="Upsert-club-form">
                    <section className="Upsert-club-section-1">
                        <TextField
                            required
                            id="clubName"
                            value={formData.name}
                            label="Name"
                            variant="outlined"
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            required
                            select
                            label="Type"
                            value={formData.type}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    type: e.target.value,
                                }))
                            }
                        >
                            {clubTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>


                    </section>
                    <section className="Upsert-club-section-2">
                        <div className="Upsert-club-skills">
                            <h2>Skills</h2>
                            <div >
                                <TextField
                                    id="Skill"
                                    label="Skills"
                                    variant="outlined"
                                    value={skill}
                                    onChange={(e) => { setSkill(e.target.value) }}
                                />
                                <Button variant="contained" onClick={() => {
                                    if (skill && skill.length > 1) {
                                        setFormData(prev => ({ ...prev, skills: prev.skills ? [...prev.skills, skill] : [skill] }))
                                        setSkill("")
                                    }
                                }}>Add</Button>
                            </div>
                            <div>
                                {(formData.skills && formData.skills.length > 0) ? formData.skills.map((item, inx) => {
                                    return (
                                        <div className="Upsert-club-skill-item" key={inx}>
                                            {item}
                                            <span className="Upsert-club-close-icon" onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev, skills: prev.skills.filter((data) => {
                                                        if (data != item) {
                                                            return data
                                                        }
                                                    })
                                                }))
                                            }}><IoMdCloseCircle /></span>
                                        </div>
                                    )
                                }) : <div className="Upsert-club-now-data">Not have any skills Yet!</div>}
                            </div>
                        </div>
                        <div className="Upsert-club-location">
                            <h2>Location</h2>
                            <div>
                                <TextField
                                    required
                                    id="VenueName"
                                    label="Venue Name"
                                    variant="outlined"
                                    value={formData.venueName}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            venueName: e.target.value,
                                        }))
                                    }
                                />
                                <TextField
                                    required
                                    id="landmark"
                                    label="LandMark"
                                    variant="outlined"
                                    value={formData.landMark}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            landMark: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </section>
                    <section className="Upsert-club-section-3">
                        <h2>Weekly Timings</h2>
                        <div>
                            <TextField
                                select
                                label="Day"
                                onChange={(e) =>
                                    setDay(e.target.value)
                                }
                            >
                                {days.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["TimePicker"]}>
                                    <TimePicker
                                        label="Starting Time"
                                        value={timing.starting}
                                        onChange={(time) => setTiming((prev) => ({ ...prev, starting: time }))}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["TimePicker"]}>
                                    <TimePicker
                                        label="Ending Time"
                                        value={timing.ending}
                                        onChange={(time) => setTiming((prev) => ({ ...prev, ending: time }))}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <Button variant="contained" onClick={() => {
                                if (timing.starting && timing.ending && day) {
                                    setFormData((prev) => ({
                                        ...prev,
                                        timings: [
                                            ...(prev.timings || []),
                                            { day: day, time: `${timing.starting.format("hh:mm A")} - ${timing.ending.format("hh:mm A")}` },
                                        ],
                                    }));
                                    setDay(null);
                                    setTiming({ starting: null, ending: null });
                                }
                            }}>Add</Button>

                        </div>
                        <div className="Upsert-club-timings">
                            {(formData.timings && formData.timings.length > 0) ? formData.timings.map((item, inx) => {
                                return (
                                    <div className="Upsert-club-timing-item" key={inx}>{item.day} {item.time}
                                        <span className="Upsert-club-close-icon" onClick={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                timings: prev.timings.filter((_, index) => index !== inx)
                                            }));
                                        }}><IoMdCloseCircle /></span></div>
                                )
                            }) : <div className="Upsert-club-now-data"><h3>Not have any timings yet!</h3></div>}
                        </div>
                    </section>
                    <section className="Upsert-club-section-4">
                        <h2>Description</h2>
                        <TextField
                            required
                            id="description"
                            label="Description"
                            variant="outlined"
                            value={formData.description}
                            multiline
                            rows={3}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                        />
                    </section>
                    <section className="Upsert-club-section-5">
                        <div>
                            <h2>Registration timings</h2>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker
                                            label="Starting"
                                            required={true}
                                            value={new dayjs(registration.starting)}
                                            onChange={(val) =>
                                                setRegistration((prev) => ({
                                                    ...prev,
                                                    starting: dayjs(val).toISOString(),
                                                }))
                                            }
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker
                                            label="Ending"
                                            required={true}
                                            value={new dayjs(registration.ending)}
                                            onChange={(val) =>
                                                setRegistration((prev) => ({
                                                    ...prev,
                                                    ending: dayjs(val).toISOString(),
                                                }))
                                            }
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div className="Upsert-club-files">
                            <h2>Upload files</h2>
                            <div className="Upsert-club-logo-file">
                                <img className="Upsert-club-logo-prev-img" src={logoPrev} alt="logo-prev" />
                                <Button
                                    component="label"
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload Logo Image
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setFormData(prev => ({ ...prev, logo: file }))
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                if (reader.readyState === 2) {
                                                    setLogoPrev(reader.result);
                                                }
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                        }

                                    />
                                </Button>
                            </div>
                            <div>
                                <Button
                                    component="label"
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload Banner Image
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            setFormData(prev => ({ ...prev, bannerImage: file }))
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                if (reader.readyState === 2) {
                                                    setBannerPrev(reader.result);
                                                }
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                        }

                                    />
                                </Button>
                            </div>

                        </div>
                    </section>
                    <section className="Upsert-club-section-6">
                        <h2>Coordinators</h2>
                        <div className="Upsert-club-search-coordinators">
                            <input type="text" id="user" placeholder="Name/Id..." onChange={(e) => setUserKey(e.target.value)} />
                            <Button variant="contained" onClick={() => { dispatch(adminGetAllUsers(userKey)) }}>Search</Button>
                        </div>
                        <div className="Upsert-club-coordinators">
                            {(coordinators && coordinators.length > 0) ? coordinators.map((item, inx) => {
                                return (
                                    <div className="Upsert-club-coordinator">{item.admissionNo.toUpperCase()} {item.personalInformation.firstname} {item.personalInformation.lastname}</div>
                                )
                            }) : <div className="Upsert-club-now-data">Not selected any coordinator yet!</div>}
                        </div>
                        <div className="Upsert-club-data-grid">
                            <DataGrid
                                columns={columns}
                                loading={loading}
                                rows={users
                                    ?.filter(user => ["student", "coordinator"].includes(user.role))
                                    .map((user, inx) => ({
                                        name: `${user.personalInformation.firstname} ${user.personalInformation.lastname}`,
                                        id: user.admissionNo.toUpperCase(),
                                        department: user.branch,
                                        makeCoordinator: user,
                                        mail: user.mail
                                    }))
                                }
                                sx={{ minHeight: "40vh", backgroundColor: "white" }}
                            />
                        </div>
                    </section>
                    <section className="Upsert-club-section-7">
                        <button>Submit</button>
                    </section>
                </form>
            </Fragment>
        }
        />
    )
}


