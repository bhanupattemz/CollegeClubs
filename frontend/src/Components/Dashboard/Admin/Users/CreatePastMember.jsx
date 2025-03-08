import "./CreatePastMember.css"
import AdminSetup from "../AdminSetUp"
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createPastMember, setPastMemberFalse } from "../../../../Actions/pastUsersAction"
import Button from '@mui/material/Button';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ConvertTime } from "../../../Functionalities/functionalites"
import dayjs from "dayjs";
import Loading from "../../../Loaders/Loading"
import { IoIosRemoveCircle } from "react-icons/io";

import { DataGrid } from "@mui/x-data-grid";
export default function CreatePastMember() {
    const [formData, setFormData] = useState({})
    const [duration, setDuration] = useState({})
    const [coordinator, setCordinators] = useState({})
    const [club, setClub] = useState()
    const [clubDuration, setClubDuration] = useState({})
    const { loading, success } = useSelector(state => state.pastMembers)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const department = [
        { value: "cse", label: "CSE" },
        { value: "ece", label: "ECE" },
        { value: "eee", label: "EEE" },
        { value: "civ", label: "Civil" },
        { value: "mech", label: "Mech" },
        { value: "chem", label: "Chem" },
    ];
    const workedAs = [
        { value: "facultyCoordinator", label: "Faculty Coordinator" },
        { value: "studentCoordinator", label: "Student Coordinator" },
        { value: "coordinator", label: "Coordinator" },
    ]
    const columns = [{ field: "id", headerName: "Sl. No.", flex: 0.1 },
    { field: "name", headerName: "Name", flex: 0.2 },
    { field: "joined", headerName: "Joined", flex: 0.2 },
    { field: "left", headerName: "Left", flex: 0.2 },
    {
        field: "delete", headerName: "Remove", flex: 0.18,
        renderCell: (params) => {
            if (params.value) {
                return <div className="create-past-member-remove-btn" onClick={() => {
                    setCordinators(prev => ({
                        ...prev,
                        managedClub: prev.managedClub.filter(item =>
                            item.name !== params.value.name ||
                            JSON.stringify(item.duration) !== JSON.stringify(params.value.duration)
                        )
                    }));
                }}><IoIosRemoveCircle /></div>
            }
        }
    }]
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (formData.workedAs == "coordinator" && (!coordinator.managedClub || coordinator.managedClub.length == 0)) {
            alert("For Coordinator Min 1 club is required.")
        } else if (!duration.joined || !duration.left) {
            alert("Past member duration is required.")
        }
        else {
            dispatch(createPastMember({
                ...formData,
                duration: {
                    joined: dayjs(duration.joined).toISOString(),
                    left: dayjs(duration.left).toISOString()
                },
                admissionNo: formData.workedAs == "coordinator" && coordinator.admissionNo,
                managedClub: formData.workedAs == "coordinator" && coordinator.managedClub
            }))
        }

    }
    useEffect(() => {
        if (success) {
            dispatch(setPastMemberFalse())
            navigate("/admin/past_team")
        }
    }, [success])
    if (loading) return <AdminSetup current={"users"} option={"past-create"} element={<Loading />} />
    return (
        <AdminSetup current={"users"} option={"past-create"} element={
            <section className="create-past-member-section">
                <form onSubmit={formSubmitHandler}>
                    <div className="create-past-member-row-1">
                        <TextField
                            required
                            id="name"
                            label="Full Name"
                            variant="outlined"
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, name: e.target.value }))
                            }
                        />
                        <TextField
                            required
                            select
                            label="Department"
                            value={formData.department}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    department: e.target.value,
                                }))
                            }
                        >
                            {department.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            select
                            label="workedAs"
                            value={formData.workedAs}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    workedAs: e.target.value,
                                }))
                            }
                        >
                            {workedAs.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                    </div>

                    <div className="create-past-member-row-2">
                        <TextField
                            required
                            id="Mail"
                            label="Mail"
                            variant="outlined"
                            type="email"
                            value={formData.mail}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, mail: e.target.value }))
                            }
                        />
                        <TextField
                            required
                            id="mobile"
                            label="Mobile No"
                            variant="outlined"
                            type="number"
                            value={formData.mobileNo}
                            onChange={(e) =>
                                setFormData(prev => ({ ...prev, mobileNo: e.target.value }))
                            }
                        />

                    </div>
                    <div className="create-past-member-row-3">
                        <h2>Duration</h2>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                        label="Joined"
                                        required={true}
                                        value={duration.joined}
                                        onChange={(val) =>
                                            setDuration((prev) => ({
                                                ...prev,
                                                joined: val,
                                            }))
                                        }
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                    <DatePicker
                                        label="Left"
                                        required={true}
                                        value={duration.left}
                                        onChange={(val) =>
                                            setDuration((prev) => ({
                                                ...prev,
                                                left: val,
                                            }))
                                        }
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                    {formData.workedAs == "coordinator" &&
                        <div className="create-past-member-row-4">
                            <h2>Coordinator Details</h2>
                            <TextField
                                required
                                id="admission-no"
                                label="Admission No"
                                variant="outlined"
                                value={coordinator.admissionNo}
                                onChange={(e) =>
                                    setCordinators(prev => ({ ...prev, admissionNo: e.target.value }))
                                }
                            />
                            <div>
                                <TextField
                                    id="club"
                                    label="Club Name"
                                    variant="outlined"
                                    value={club}
                                    onChange={(e) =>
                                        setClub(e.target.value)
                                    }
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker
                                            label="Joined"
                                            required={true}
                                            value={clubDuration.joined}
                                            onChange={(val) =>
                                                setClubDuration((prev) => ({
                                                    ...prev,
                                                    joined: val,
                                                }))
                                            }
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker
                                            label="Left"
                                            required={true}
                                            value={clubDuration.left}
                                            onChange={(val) =>
                                                setClubDuration((prev) => ({
                                                    ...prev,
                                                    left: val,
                                                }))
                                            }
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <Button variant="contained" onClick={() => {
                                    if (club && clubDuration.joined && clubDuration.left) {
                                        setCordinators(prev => ({ ...prev, managedClub: prev.managedClub ? [...prev.managedClub, { name: club, duration: { joined: dayjs(clubDuration.joined).toISOString(), left: dayjs(clubDuration.left).toISOString() } }] : [{ name: club, duration: { joined: dayjs(clubDuration.joined).toISOString(), left: dayjs(clubDuration.left).toISOString() } }] }))
                                        setClub("")
                                        setClubDuration({})
                                    }
                                }}>Add</Button>
                            </div>
                            <DataGrid
                                columns={columns}
                                rows={coordinator.managedClub && coordinator.managedClub.map((club, inx) => ({
                                    name: club.name,
                                    id: inx + 1,
                                    joined: ConvertTime(club.duration.joined).split(",")[0],
                                    left: ConvertTime(club.duration.left).split(",")[0],
                                    delete: club
                                }))
                                }
                                sx={{ minHeight: "30vh", backgroundColor: "white" }}
                            />
                        </div>
                    }

                    <button className="create-past-member-submit-btn">Submit</button>
                </form>
            </section>
        } />
    )
}