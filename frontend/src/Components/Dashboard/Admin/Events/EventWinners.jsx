import "./UpsertEvent.css"
import AdminSetup from "../AdminSetUp"
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEventSuccessFalse, adminGetSingleEvent } from "../../../../Actions/EventAction"
import Loading from "../../../Loaders/Loading"
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs"
import axios from "axios";
import { BACKENDURL } from "../../../Functionalities/functionalites"
export default function CreateEvent() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { _id } = useParams()
    const [formdata, setFormData] = useState({})
    const [winners, setWinners] = useState([])
    const [dataLoading, setDataLoading] = useState(false)
    const { singleEvent, loading, success } = useSelector(state => state.singleEvent)
    const MemberColumns = [
        { field: "id", headerName: "Sl. No", flex: 0.1 },
        { field: "admissionNo", headerName: "Admission No", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "mail", headerName: "Mail", flex: 0.3 },
        { field: "course", headerName: "Degree", flex: 0.2 },
        { field: "gender", headerName: "gender", flex: 0.2 },
        {
            field: "winner", headerName: "Event Winners", flex: 0.2,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div >
                            <Checkbox
                                defaultChecked={formdata.winner && formdata.winner.includes(params.value.admissionNo)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setWinners(prev => [...prev, params.value]);
                                        setFormData(prev => ({
                                            ...prev,
                                            winner: prev.winner ? [...prev.winner, params.value.admissionNo] : [params.value.admissionNo]
                                        }));
                                    } else {
                                        setWinners(prev => prev.filter(item => item.admissionNo !== params.value.admissionNo));
                                        setFormData(prev => ({
                                            ...prev,
                                            winner: prev.winner.filter(item => item !== params.value.admissionNo)
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
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        setDataLoading(true)
        try {
            const respounce = await axiosInstance.put(`/events/winner/${_id}`, formdata.winner)
            console.log(respounce.data)
            navigate('/admin/events')
        } catch (err) {
            console.log(err)
        }
        setDataLoading(false)
    }

    useEffect(() => {
        if (singleEvent) {

            setFormData({
                winner: singleEvent.winner.map((item) => (item.admissionNo))
            })
            setWinners(singleEvent.winner)
        }
    }, [success, singleEvent])

    useEffect(() => {
        if (_id) {
            dispatch(adminGetSingleEvent(_id))
        }
    }, [_id])
    if (loading || dataLoading) { return <AdminSetup current={"events"} option={"update"} element={<Loading />} /> }
    return (
        <AdminSetup current={"events"} option={"update"} element={
            <section>
                {singleEvent &&
                    <form onSubmit={formSubmitHandler}>
                        <section>
                            <h2>Winners</h2>
                            <div className="Upsert-event-winner-view">
                                <div className="Upsert-event-clubs">
                                    {(winners && winners.length > 0) ? winners.map((item, inx) => {
                                        return (
                                            <div className="Upsert-event-club">{inx + 1}. <i>{item.name ? item.name : item.personalInformation.firstname} {!item.name && item.personalInformation.lastname}</i></div>
                                        )
                                    }) : <div className="Upsert-event-now-data">Winner Not Declared Yet!</div>}
                                </div>
                                <Button variant="contained" type="submit">Declare</Button>
                            </div>
                            <DataGrid
                                columns={MemberColumns}
                                loading={loading}
                                rows={singleEvent.members && singleEvent.members.map((member, inx) => ({
                                    name: `${member.personalInformation.firstname} ${member.personalInformation.lastname}`,
                                    id: inx + 1,
                                    admissionNo: member.admissionNo,
                                    course: member.course,
                                    skills: member.skills,
                                    winner: member,
                                    gender: member.personalInformation.gender,
                                    mail: member.mail
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