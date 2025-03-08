import "./UpsertEvent.css"
import AdminSetup from "../AdminSetUp"
import { getAllclubs } from "../../../../Actions/clubsAction"
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DataGrid } from "@mui/x-data-grid";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent, setEventSuccessFalse, adminGetSingleEvent } from "../../../../Actions/EventAction"
import Loading from "../../../Loaders/Loading"
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs"
export default function CreateEvent() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { _id } = useParams()
    const [formdata, setFormData] = useState({})
    const [clubKey, setClubKey] = useState()
    const [wantWinner, setWantWinners] = useState(false)
    const [conductedClubs, setConductedClubs] = useState([])
    const { clubs, loading: clubLoading } = useSelector(state => state.clubs)
    const { singleEvent, loading, success } = useSelector(state => state.singleEvent)
    const [imgPrev, setImgPrev] = useState("https://res.cloudinary.com/delc5g3p5/image/upload/v1729762210/cld-sample-3.jpg")
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
    const isActive = [
        { value: true, text: "Active" },
        { value: false, text: "Inactive" }
    ]
    const columns = [
        { field: "id", headerName: "Sl. No", flex: 0.1 },
        {
            field: "logo", headerName: "Logo", flex: 0.2,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div style={{ width: "100%" }}>
                            <img style={{ width: "50px", objectFit: "contain", margin: "10px auto" }} src={params.value} alt="club-logo" />
                        </div>
                    )
                }
            }
        },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "type", headerName: "Type", flex: 0.15 },
        { field: "skills", headerName: "Skills", flex: 0.2 },
        {
            field: "club", headerName: "Conducted Club", flex: 0.2,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div >
                            <Checkbox
                                defaultChecked={formdata.conductedClubs && formdata.conductedClubs.includes(params.value._id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setConductedClubs(prev => [...prev, params.value]);
                                        setFormData(prev => ({
                                            ...prev,
                                            conductedClubs: prev.conductedClubs ? [...prev.conductedClubs, params.value._id] : [params.value._id]
                                        }));
                                    } else {
                                        setConductedClubs(prev => prev.filter(item => item._id !== params.value._id));
                                        setFormData(prev => ({
                                            ...prev,
                                            conductedClubs: prev.conductedClubs.filter(item => item !== params.value._id)
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
        e.preventDefault();
        console.log(formdata.createdClub, formdata.conductedClubs)
        if (!formdata.conductedClubs || formdata.conductedClubs.length <= 0) {
            alert("Conducted club is required")
        } else if (!formdata.conductedClubs.includes(formdata.createdClub)) {
            alert("Created club must includes in conducted Club.")
        } else {
            const fd = new FormData();
            fd.append('conductedClub', JSON.stringify(formdata.conductedClubs));
            fd.append('createdClub', formdata.createdClub);
            fd.append('description', formdata.description);
            fd.append('landMark', formdata.landMark);
            fd.append('name', formdata.name);
            fd.append('venueName', formdata.venueName);
            fd.append('starting', formdata.starting.toISOString());
            fd.append('ending', formdata.ending.toISOString());
            fd.append('Regstarting', formdata.Regstarting.toISOString());
            fd.append('Regending', formdata.Regending.toISOString());
            fd.append('image', formdata.image)
            fd.append("isactive", formdata.isactive)
            dispatch(updateEvent(fd, _id))
        }
    }
    useEffect(() => {
        if (success && singleEvent) {
            dispatch(setEventSuccessFalse())
            navigate(`/events/${singleEvent._id}`)
        }
        if (singleEvent) {
            setFormData({
                name: singleEvent.name,
                description: singleEvent.description,
                venueName: singleEvent.venue.venueName,
                landMark: singleEvent.venue.landMark,
                starting: dayjs(singleEvent.timings.starting),
                ending: dayjs(singleEvent.timings.ending),
                Regstarting: dayjs(singleEvent.registration.starting),
                Regending: dayjs(singleEvent.registration.ending),
                image: singleEvent.image,
                conductedClubs: singleEvent.conductedClub.map((item) => item._id),
                createdClub: singleEvent.createdClub,
                isactive: singleEvent.isactive
            })
            setImgPrev(singleEvent.image.url)
            setConductedClubs(singleEvent.conductedClub)
            if (dayjs(singleEvent.timings.ending) < Date.now()) {
                setWantWinners(true)
            } else {
                setWantWinners(false)
            }
        }
    }, [success, singleEvent])

    useEffect(() => {
        if (_id) {
            dispatch(adminGetSingleEvent(_id))
        }
    }, [_id])
    if (loading) { return <AdminSetup current={"events"} option={"update"} element={<Loading />} /> }
    return (
        <AdminSetup current={"events"} option={"update"} element={
            <section className="Upsert-event-main-section">
                <form onSubmit={formSubmitHandler}>
                    <section className="Upsert-event-section-1">
                        <div className="Upsert-event-basic-details">
                            <h2>Basic Details</h2>
                            <div>
                                <TextField
                                    required
                                    id="name"
                                    label="Name"
                                    value={formdata.name}
                                    variant="outlined"
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                        }))
                                    }
                                />
                                <TextField
                                    select
                                    label="Active Fest"
                                    value={formdata.isactive}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            isactive: e.target.value,
                                        }))
                                    }
                                >
                                    {isActive.map((option, inx) => (
                                        <MenuItem key={inx} value={option.value}>
                                            {option.text}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    required
                                    id="description"
                                    label="Description"
                                    variant="outlined"
                                    value={formdata.description}
                                    multiline
                                    rows={3}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="Upsert-event-timings">

                            <div>
                                <h2>Timings</h2>
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker required label="Starting" value={formdata.starting} onChange={(time) => {
                                                setFormData(prev => ({ ...prev, starting: time }))
                                            }} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker required label="Ending" value={formdata.ending} onChange={(time) => {
                                                setFormData(prev => ({ ...prev, ending: time }))
                                            }} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div>
                                <h2>Registration Timings</h2>
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker required label="Starting" value={formdata.Regstarting} onChange={(time) => {
                                                setFormData(prev => ({ ...prev, Regstarting: time }))
                                            }} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker required label="Ending" value={formdata.Regending} onChange={(time) => {
                                                setFormData(prev => ({ ...prev, Regending: time }))
                                            }} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="Upsert-event-section-2">
                        <div className="Upsert-event-venue">
                            <h2>Venue</h2>
                            <div>
                                <TextField
                                    required
                                    id="VenueName"
                                    label="Venue Name"
                                    variant="outlined"
                                    value={formdata.venueName}
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
                                    value={formdata.landMark}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            landMark: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="Upsert-event-img-file">

                            <img className="Upsert-event-img-prev-img" src={imgPrev} alt="logo-prev" />
                            <Button
                                component="label"
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Image
                                <VisuallyHiddenInput
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setFormData(prev => ({ ...prev, image: file }))
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            if (reader.readyState === 2) {
                                                setImgPrev(reader.result);
                                            }
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                    }

                                />
                            </Button>

                        </div>
                    </section>
                    <section>
                        <h2>Conducting Clubs</h2>
                        <div className="Upsert-event-search-clubs">
                            <div>
                                <input type="text" id="club" placeholder="Name/Id..." onChange={(e) => setClubKey(e.target.value)} />
                                <Button variant="contained" onClick={() => { dispatch(getAllclubs(clubKey)) }}>Search</Button>
                            </div>
                            <div>
                                <TextField
                                    select
                                    label="Created Club"
                                    value={formdata.createdClub}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            createdClub: e.target.value,
                                        }))
                                    }
                                >
                                    {clubs && clubs.map((option) => (
                                        <MenuItem key={option._id} value={option._id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                        <div className="Upsert-event-clubs">
                            {(conductedClubs && conductedClubs.length > 0) ? conductedClubs.map((item, inx) => {
                                return (
                                    <div className="Upsert-event-club">{item.name.toUpperCase()}</div>
                                )
                            }) : <div className="Upsert-event-now-data">Not selected any Club yet!</div>}
                        </div>
                        <div className="Upsert-event-clubs-grid">
                            <DataGrid
                                columns={columns}
                                loading={clubLoading}
                                rows={clubs && clubs.map((club, inx) => ({
                                    name: club.name,
                                    id: inx + 1,
                                    logo: club.logo.url,
                                    type: club.type,
                                    skills: club.skills,
                                    club: club

                                }))
                                }
                                getRowHeight={() => 'auto'}
                                sx={{ minHeight: "40vh", backgroundColor: "white", minWidth: "700px" }}
                            />
                        </div>
                    </section>
                    {wantWinner && <Button onClick={() => navigate(`/admin/events/update/winner/${_id}`)}>Update Winners</Button>}
                    <button className="Upsert-event-submit-btn">Submit</button>
                </form>
            </section>
        } />
    )
}