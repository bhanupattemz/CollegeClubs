import "./UpsertEvent.css"
import AdminSetup from "../../AdminSetUp"
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetFestEventDetails } from "../../../../../Actions/festActions"
import Loading from "../../../../Loaders/Loading"
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs"
import axios from "axios";
import { CiBookmarkRemove } from "react-icons/ci";
import { BACKENDURL } from "../../../../Functionalities/functionalites"
export default function CreateEvent() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { _id } = useParams()
    const [winners, setWinners] = useState([])
    const [dataLoading, setDataLoading] = useState(false)
    const { singleFestEvent, loading, success } = useSelector(state => state.singleFestEvent)
    const MemberColumns = [
        { field: "id", headerName: "Sl. No", flex: 0.1 },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "college", headerName: "College", flex: 0.2 },
        { field: "mail", headerName: "Mail", flex: 0.3 },
        { field: "mobileNo", headerName: "Mobile No", flex: 0.2 },
        { field: "course", headerName: "Degree", flex: 0.1 },
        { field: "branch", headerName: "Branch", flex: 0.1 },
        { field: "gender", headerName: "gender", flex: 0.1 },
        {
            field: "winner", headerName: "Event Winners", flex: 0.2,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div >
                            <Checkbox
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setWinners(prev => [...prev, params.value]);
                                    }
                                }}
                            />
                        </div>
                    )
                }
            }
        },
    ]
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setDataLoading(true)
        try {
            const respounce = await axiosInstance.put(`/fest/events/winner/${_id}`, winners)
            toast.success("Event winner declared successfully!")
            navigate('/admin/fests/events')
        } catch (err) {
            toast.error(err)
        }
        setDataLoading(false)
    }

    useEffect(() => {
        if (singleFestEvent) {
            setWinners(singleFestEvent.winner)
        }
    }, [success, singleFestEvent])

    useEffect(() => {
        if (_id) {
            dispatch(adminGetFestEventDetails(_id))
        }
    }, [_id])
    if (loading || dataLoading) { return <AdminSetup current={"fests"} option={"update-event"} element={<Loading />} /> }
    return (
        <AdminSetup current={"fests"} option={"update-event"} element={
            <section>
                {singleFestEvent &&
                    <form onSubmit={formSubmitHandler}>
                        <section>
                            <h2>Winners</h2>
                            <div className="Upsert-event-winner-view">
                                <div className="Upsert-event-clubs">
                                    {(winners && winners.length > 0) ? winners.map((item, inx) => {
                                        return (
                                            <div className="Upsert-event-club">{inx + 1}. <i>{item.name}</i>
                                                <span style={{ color: "red", cursor: "pointer" }} onClick={() => { setWinners(prev => prev.filter((item, index) => index != inx)) }}><CiBookmarkRemove /></span></div>
                                        )
                                    }) : <div className="Upsert-event-now-data">Winner Not Declared Yet!</div>}
                                </div>
                                <Button variant="contained" type="submit">Declare</Button>
                            </div>
                            <DataGrid
                                columns={MemberColumns}
                                loading={loading}
                                rows={singleFestEvent.members && singleFestEvent.members.map((member, inx) => ({
                                    name: `${member.name}`,
                                    id: inx + 1,
                                    course: member.course,
                                    skills: member.skills,
                                    winner: member,
                                    gender: member.gender,
                                    mail: member.mail,
                                    college: member.college,
                                    mobileNo: member.mobileNo,
                                    branch: member.branch
                                }))
                                }
                                getRowHeight={() => 'auto'}
                                sx={{ minHeight: "40vh", backgroundColor: "white" }}
                            />
                        </section>
                    </form>
                }
            </section>
        } />
    )
}