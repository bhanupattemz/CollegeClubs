import "./UpsertEvent.css"
import AdminSetup from "../../AdminSetUp"
import { getAllclubs } from "../../../../../Actions/clubsAction"
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
import { createFestEvent, setFestEventFalse } from "../../../../../Actions/festActions"
import Loading from "../../../../Loaders/Loading"
import { useNavigate } from "react-router";
import axios from "axios"
import { BACKENDURL } from "../../../../Functionalities/functionalites"
import { CiBookmarkRemove } from "react-icons/ci";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { LiaCertificateSolid } from "react-icons/lia";
export default function CreateEvent() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [nextLoading, setNextLoading] = useState(false)
    const [fests, setFests] = useState([])
    const [formdata, setFormData] = useState({})
    const [clubKey, setClubKey] = useState()
    const [prize, setPrize] = useState({})
    const [conductedClubs, setConductedClubs] = useState([])
    const { clubs, loading: clubLoading } = useSelector(state => state.clubs)
    const { singleFestEvent, loading, success } = useSelector(state => state.singleFestEvent)
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
        if (!formdata.conductedClubs || formdata.conductedClubs.length <= 0) {
            alert("Conducted club is required")
        } else if (!formdata.pdf) {
            alert("Instructions PDF is required.")
        }
        else {
            const fd = new FormData();
            fd.append('conductedClub', JSON.stringify(formdata.conductedClubs));
            fd.append('registration', JSON.stringify({
                starting: formdata.RegStarting.toISOString(),
                ending: formdata.RegEnding.toISOString()
            }))
            fd.append('timings', JSON.stringify({
                starting: formdata.starting.toISOString(),
                ending: formdata.ending.toISOString()
            }))
            fd.append('prizes', JSON.stringify(formdata.prizes))
            fd.append('subheading', formdata.subheading)
            fd.append('amount', formdata.amount)
            fd.append('createdClub', formdata.createdClub);
            fd.append('description', formdata.description);
            fd.append('landMark', formdata.landMark);
            fd.append('name', formdata.name);
            fd.append('venueName', formdata.venueName);
            fd.append('image', formdata.image)
            fd.append('pdf', formdata.pdf)
            dispatch(createFestEvent(fd, formdata.fest))
        }
    }
    useEffect(() => {
        if (success && singleFestEvent) {
            dispatch(setFestEventFalse())
            navigate(`/fest/events/${singleFestEvent._id}`)
        }
    }, [success])
    useEffect(() => {
        async function getAllfests() {
            try {
                setNextLoading(true)
                const response = await axiosInstance.get(`/fest/all`)
                setFests(response.data.data)
            }
            catch (err) {
                console.log(err)
            }
            setNextLoading(false)
        }
        getAllfests()
    }, [])
    if (loading || nextLoading) { return <AdminSetup current={"fests"} option={"events-create"} element={<Loading />} /> }
    return (
        <AdminSetup current={"fests"} option={"events-create"} element={
            <section className="Upsert-fest-event-main-section">
                <form onSubmit={formSubmitHandler}>
                    <section className="Upsert-fest-event-section-1">
                        <div className="Upsert-fest-event-basic-details">
                            <h2>Basic Details</h2>
                            <div>
                                <div className="Upsert-fest-event-basic-details-row-1">
                                    <TextField
                                        required
                                        id="name"
                                        label="Name"
                                        variant="outlined"
                                        value={formdata.name}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                    />
                                    <TextField
                                        required
                                        id="amount"
                                        label="Amount"
                                        value={formdata.amount}
                                        variant="outlined"
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                amount: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <TextField
                                    required
                                    id="subheading"
                                    value={formdata.subheading}
                                    label="Sub Heading"
                                    variant="outlined"
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            subheading: e.target.value,
                                        }))
                                    }
                                />
                                <TextField
                                    required
                                    id="description"
                                    label="Description"
                                    value={formdata.description}
                                    variant="outlined"
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
                        <div className="Upsert-fest-event-timings">
                            <div>
                                <h2>Event Timings</h2>
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
                                            <DateTimePicker required label="Starting" value={formdata.RegStarting} onChange={(time) => {
                                                setFormData(prev => ({ ...prev, RegStarting: time }))
                                            }} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker']}>
                                            <DateTimePicker required label="Ending" value={formdata.RegEnding} onChange={(time) => {
                                                setFormData(prev => ({ ...prev, RegEnding: time }))
                                            }} />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </div>

                        </div>

                    </section>
                    <section className="Upsert-fest-event-section-2">
                        <div className="Upsert-fest-event-venue">
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
                                    value={formdata.landMark}
                                    variant="outlined"
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            landMark: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="Upsert-fest-event-img-file">

                            <img className="Upsert-fest-event-img-prev-img" src={imgPrev} alt="logo-prev" />
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
                            <Button
                                component="label"
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Instructions PDF
                                <VisuallyHiddenInput
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setFormData(prev => ({ ...prev, pdf: file }))
                                    }
                                    }

                                />
                            </Button>
                        </div>
                    </section>
                    <section className="Upsert-fest-event-prizes-section">
                        <h2>Prizes</h2>
                        <div>
                            <TextField
                                id="name"
                                label="Name"
                                value={prize.name}
                                variant="outlined"
                                placeholder="1st Prize"
                                onChange={(e) =>
                                    setPrize((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                            />
                            <TextField
                                id="Amount"
                                label="Amount"
                                value={prize.amount}
                                variant="outlined"
                                onChange={(e) =>
                                    setPrize((prev) => ({
                                        ...prev,
                                        amount: e.target.value,
                                    }))
                                }
                            />
                            <TextField
                                select
                                label="Certicate"
                                value={prize.certificate}

                                onChange={(e) =>
                                    setPrize((prev) => ({
                                        ...prev,
                                        certificate: e.target.value,
                                    }))
                                }
                            >
                                {[{ value: true, text: "Yes" }, { value: false, text: "No" }].map((option, inx) => (
                                    <MenuItem key={inx} value={option.value}>
                                        {option.text}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button
                                component="label"
                                variant="contained"
                                onClick={() => {
                                    if (prize.name && typeof prize.certificate == "boolean" && prize.amount) {
                                        setFormData(prev => ({ ...prev, prizes: prev.prizes ? [...prev.prizes, prize] : [prize] }))
                                        setPrize({})
                                    }
                                }}
                            >
                                ADD

                            </Button>
                        </div>
                        <div className="fest-event-prizes">
                            {formdata.prizes && formdata.prizes.length > 0 ? formdata.prizes.map((item, inx) => {
                                return (
                                    <div key={inx}>
                                        <h3>{item.name}</h3>
                                        {item.certificate && <p><LiaCertificateSolid /> Certificate</p>}
                                        {item.amount > 0 && <p><RiMoneyRupeeCircleLine /> ₹{item.amount}</p>}
                                        <span onClick={() => {
                                            setFormData(prev => ({ ...prev, prizes: prev.prizes.filter((data) => { if (JSON.stringify(data) !== JSON.stringify(item)) { return item } }) }))
                                        }}><CiBookmarkRemove /></span>
                                    </div>
                                )
                            }) : <div>Not Add Any Prizes Yet!</div>}
                        </div>
                    </section>
                    <section>
                        <h2>Conducting Clubs</h2>
                        <div className="Upsert-fest-event-search-clubs">
                            <div>
                                <input type="text" id="club" placeholder="Name/Id..." onChange={(e) => setClubKey(e.target.value)} />
                                <Button variant="contained" onClick={() => { dispatch(getAllclubs(clubKey)) }}>Search</Button>
                            </div>
                            <div>
                                <TextField
                                    required
                                    select
                                    label="Fest"
                                    value={formdata.fest}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            fest: e.target.value,
                                        }))
                                    }
                                >
                                    {fests && fests.map((option) => (
                                        <MenuItem key={option._id} value={option._id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                        <div className="Upsert-fest-event-clubs">
                            {(conductedClubs && conductedClubs.length > 0) ? conductedClubs.map((item, inx) => {
                                return (
                                    <div className="Upsert-fest-event-club">{item.name.toUpperCase()}</div>
                                )
                            }) : <div className="Upsert-fest-event-now-data">Not selected any Club yet!</div>}
                        </div>
                        <div className="Upsert-fest-event-clubs-grid">
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
                                sx={{ minHeight: "40vh", backgroundColor: "white", minWidth: "1000px" }}
                            />
                        </div>
                    </section>
                    <button className="Upsert-fest-event-submit-btn">Submit</button>
                </form>
            </section>
        } />
    )
}