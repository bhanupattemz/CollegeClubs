import { Fragment, useEffect, useRef, useState } from "react"
import "./EventRegistration.css"
import { useLocation, useParams } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha";
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from "@mui/material/TextField";
import { BACKENDURL, ConvertTime } from "../Functionalities/functionalites"
import axios from "axios"
import Loading from "../Loaders/Loading"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RegisterButton from "./RegisterButton"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CiWarning } from "react-icons/ci";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function EventRegistration() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const [event, setEvent] = useState({})
    const { _id } = useParams()
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState()
    const { user } = useSelector(state => state.user)
    const [open, setOpen] = useState(false);
    const formSubmitHandler = (e) => {
        e.preventDefault();
        setOpen(true)
        console.log(formData)
    }
    const handleClose = () => {
        setOpen(false);
    };

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
    const degrees = [
        { value: "b-tech", label: "B.Tech" },
        { value: "mba", label: "MBA" },
        { value: "mca", label: "MCA" },
        { value: "m-tech", label: "M.Tech" },
    ];
    useEffect(() => {
        if (user) {
            setFormData({
                name: `${user.personalInformation.firstname} ${user.personalInformation.lastname}`,
                mobileNo: user.personalInformation.mobileNo,
                mail: user.mail,
                college: user.role == "student" ? "JNTUA College of Engineering Ananthapur" : undefined,
                course: user.course,
                branch: user.branch,
                academicYear: user.academicYear
            })
        }
    }, [user])
    const [accept, setAccept] = useState(false)
    const [CaptchaValue, setCaptchaValue] = useState()
    function onChange(value) {
        setCaptchaValue(value)
    }
    const [capLoading, setCapLoading] = useState(false)
    const [recapchaKey, setRecapchaKey] = useState()
    useEffect(() => {
        async function getEventDetails() {
            try {
                const respounce = await axiosInstance.get(`/fest/events/${_id}`)
                console.log(respounce.data.data)
                setEvent(respounce.data.data)
            } catch (err) {
                alert(err)
            }
        }
        getEventDetails()
        async function getrecaptchaKey() {
            try {
                setCapLoading(true)
                const response = await axiosInstance.get("/recaptcha/key")
                setRecapchaKey(response.data.data)
            } catch (err) {
                console.log(err)
            }
            setCapLoading(false)
        }
        getrecaptchaKey()
    }, [])
    if (loading || capLoading) {
        return <Loading />
    }
    return (
        <main className="fest-event-registration-main">
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Register for {event.name}</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 400 }} aria-label="customized table">
                                <TableBody>
                                    {Object.keys(formData).map((item, inx) => {
                                        return (
                                            <StyledTableRow key={inx}>
                                                <StyledTableCell component="th" scope="row">
                                                    <b>{item} :</b>
                                                </StyledTableCell>
                                                <StyledTableCell align="left">{formData[item]}</StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <p style={{ color: "#FF9D23" }}><CiWarning /> Please double-check all the details carefully. You do not have permission to update them directly.</p>
                        <FormControlLabel control={<Checkbox onChange={(e) => setAccept(prev => !prev)} />} label="I have read and accept the instructions of event." />
                        <a href={event?.pdf?.url} target="_blank" style={{ color: "blue" }}>view Insructions</a>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <RegisterButton event={event} formData={formData} isAccept={accept} setOpen={setOpen}/>
                </DialogActions>
            </Dialog>
            <h1>Register for {event.name}</h1>
            <form onSubmit={formSubmitHandler} className="fest-event-registration-form">
                <div>
                    <TextField
                        required
                        id="name"
                        label="Enter Full Name"
                        variant="outlined"
                        placeholder={`Firstname Lastname`}
                        value={formData.name}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, name: e.target.value }))
                        }
                    />
                    <TextField
                        required
                        id="Mail"
                        label="Mail"
                        variant="outlined"
                        type="email"
                        value={formData.mail}
                        placeholder={`example@gmail.com`}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, mail: e.target.value }))
                        }
                    />
                    <TextField
                        id="mobile-no"
                        label="Mobile No"
                        variant="outlined"
                        type="number"
                        value={formData.mobileNo}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, mobileNo: e.target.value }))
                        }
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="college"
                        label="college"
                        variant="outlined"
                        value={formData.college}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, college: e.target.value }))
                        }
                    />
                    <div className="fest-event-registration-select">
                        <TextField
                            required
                            select
                            label="Degree"
                            value={formData.course}
                            onChange={(e) =>
                                setFormData((prev) => ({
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
                            value={formData.branch}
                            onChange={(e) =>
                                setFormData((prev) => ({
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
                            value={formData.academicYear}
                            onChange={(e) =>
                                setFormData((prev) => ({
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
                {recapchaKey &&
                    <div className="fest-event-recaptcha">
                        <ReCAPTCHA
                            sitekey={recapchaKey}
                            onChange={onChange}
                        />
                    </div>
                }
                <LoadingButton
                    id="contact-submit-btn"
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    type="submit"
                >
                    Register
                </LoadingButton>
            </form>
        </main>
    )
}