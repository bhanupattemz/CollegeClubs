import "./FestDetails.css";
import AdminSetUp from "../AdminSetUp";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { IoIosCreate } from "react-icons/io";
import { adminDeleteFestEvent } from "../../../../Actions/festActions";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ConvertTime } from "../../../Functionalities/functionalites";
import { confirmAlert } from 'react-confirm-alert';
import axios from "axios";
import { BACKENDURL } from "../../../Functionalities/functionalites"
export default function AdminAllFestEvents() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    async function getfest() {
        try {
            setLoading(true)
            const response = await axiosInstance.get(`/fest/details/${_id}`)
            setFest(response.data.data)
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)
    }
    const { loading: eventLoading } = useSelector(state => state.singleFestEvent)
    const defaultData = { members: 0, amount: 0, events: 0, createdAt: "2025-01-14T09:44:07.679Z" }
    const { _id } = useParams()
    const [data, setData] = useState(defaultData)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [fest, setFest] = useState({ events: [] })
    const btnStyles = { backgroundColor: "#0A5EB0", color: "white", border: "2px solid #0A5EB0" }
    const deleteFestEventHandler = (festEvent) => {
        confirmAlert({
            title: `Are You Sure You Want to Delete ${festEvent.name}?`,
            message: "This action will permanently delete the fest event and all associated content.",
            buttons: [
                {
                    label: 'Delete',
                    onClick: async () => {
                        dispatch(adminDeleteFestEvent(festEvent._id))
                    }
                },
                { label: 'Cancel' }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            overlayClassName: "delete-festEvent-confirmation-popup"
        });
    };
    useEffect(() => {
        if (!eventLoading) {
            getfest()
        }
    }, [eventLoading])

    useEffect(() => {
        if (fest) {
            setData(defaultData)
            let members = 0
            let events = fest.events.length
            let amount = 0
            fest.events.map((item) => {
                members += item?.members.length
                amount += item?.members.length * item.amount
            })
            setData({ members, events, amount, createdAt: fest.createdAt })
        }
    }, [fest])

    const columns = [
        { field: "id", headerName: "Sl. No", width: 80 },
        { field: "name", headerName: "Event Name", flex: 0.3 },
        { field: "conductedClub", headerName: "Conducted Clubs", flex: 0.2 },
        { field: "createdAt", headerName: "Created At", flex: 0.2 },
        { field: "members", headerName: "Registrations", flex: 0.2 },
        { field: "amount", headerName: "Amount", flex: 0.1 },
        { field: "totalAmount", headerName: "Total Amount", flex: 0.15 },
        {
            field: "allMembers", headerName: "Members", flex: 0.1,
            renderCell: (params) => (
                params.value && (
                    <div style={{ color: "grey", fontSize: "20px", cursor: "pointer" }} onClick={() => navigate(`/admin/fests/events/members/${params.value}`)}>
                        <FaExternalLinkAlt />
                    </div>
                )
            )
        },
        {
            field: "open", headerName: "Open", flex: 0.1,
            renderCell: (params) => (
                params.value && (
                    <div style={{ color: "grey", fontSize: "20px", cursor: "pointer" }} onClick={() => navigate(`/fest/events/${params.value}`)}>
                        <FaExternalLinkAlt />
                    </div>
                )
            )
        },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => (
                params.value && (
                    <div style={{ color: "grey", fontSize: "20px", cursor: "pointer" }} onClick={() => navigate(`/admin/fests/events/update/${params.value}`)}>
                        <FaEdit />
                    </div>
                )
            )
        },
        {
            field: "delete", headerName: "Delete", flex: 0.1,
            renderCell: (params) => (
                params.value && (
                    <div style={{ color: "red", fontSize: "20px", cursor: "pointer" }} onClick={() => deleteFestEventHandler(params.value)}>
                        <MdDelete />
                    </div>
                )
            )
        }
    ];

    return (
        <AdminSetUp current="fests" option="all" element={
            <section className="admin-fest-details-section">

                <div className="admin-fest-details-numbers">

                    {(loading || eventLoading) ?
                        <Fragment>
                            {[1, 2, 3, 4].map((inx) => {
                                return (
                                    <div key={inx} className="admin-fest-details-numbers-card card-loading">

                                    </div>
                                )
                            })}
                        </Fragment> :
                        <Fragment>
                            <div className="admin-fest-details-numbers-card">
                                <div className="admin-fest-details-icons">
                                    <FaUsers />
                                </div>
                                <div>
                                    <h2>Total Participants</h2>
                                    <p>Total members in fest: <b>{data.members}</b></p>
                                </div>
                            </div>
                            <div className="admin-fest-details-numbers-card">
                                <div className="admin-fest-details-icons">
                                    <RiMoneyRupeeCircleFill />
                                </div>
                                <div>
                                    <h2>Total Amount</h2>
                                    <p>Amount by Events: <b>₹{data.amount}</b></p>
                                </div>
                            </div>
                            <div className="admin-fest-details-numbers-card">
                                <div className="admin-fest-details-icons">
                                    <MdEvent />
                                </div>
                                <div>
                                    <h2>Events</h2>
                                    <p>Total fest Events: <b>{data.members}</b></p>
                                </div>
                            </div>
                            <div className="admin-fest-details-numbers-card">
                                <div className="admin-fest-details-icons">
                                    <IoIosCreate />
                                </div>
                                <div>
                                    <h2>Created At</h2>
                                    <p><b>{data.createdAt && ConvertTime(data.createdAt).split(",")[0]}</b></p>
                                </div>
                            </div>
                        </Fragment>}
                </div>
                <div className="admin-fest-details-grid">
                    <DataGrid
                        columns={columns}
                        loading={loading}
                        rows={fest.events?.map((festEvent, index) => ({
                            id: index + 1,
                            name: festEvent.name,
                            conductedClub: festEvent.conductedClub.length,
                            members: festEvent.members.length,
                            edit: festEvent._id,
                            delete: festEvent,
                            createdAt: ConvertTime(festEvent.createdAt).split(",")[0],
                            amount: festEvent.amount,
                            open: festEvent._id,
                            allMembers: festEvent._id,
                            totalAmount: `₹${festEvent.members.length * festEvent.amount}`
                        }))}
                        sx={{ minHeight: "60vh", backgroundColor: "#fff" }}
                    />
                </div>
            </section>
        } />
    );
}
