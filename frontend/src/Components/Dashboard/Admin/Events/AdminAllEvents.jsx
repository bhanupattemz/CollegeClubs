import "./AdminAllEvents.css"
import AdminSetUp from "../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { adminGetAllEvents, adminDeleteEvent } from "../../../../Actions/EventAction"
import { useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';
export default function AdminAllEvents() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { events, loading } = useSelector(state => state.events)
    const columns = [
        { field: "id", headerName: "Sl. No" },
        { field: "name", headerName: "Event Name", flex: 0.3 },
        { field: "members", headerName: "Number of members", flex: 0.1 },
        {
            field: "isActive", headerName: "Is Active", flex: 0.2,
            renderCell: (params) => {
                if (params) {
                    return (
                        <div style={params.value ? { color: "green" } : { color: "red" }}>{params.value?"True":"False"}</div>
                    )
                }
            }
        },
        { field: "conductedClub", headerName: "Conducted Clubs", flex: 0.2 },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.2 },
        {
            field: "open", headerName: "Open", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-events-link" onClick={() => navigate(`/admin/events/${params.value}`)}>
                            <FaExternalLinkAlt />
                        </div>
                    )

                }
            }
        },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-events-edit" onClick={() => navigate(`/admin/events/update/${params.value}`)}>
                            <FaEdit />
                        </div>
                    )

                }
            }
        },
        {
            field: "delete", headerName: "Delete", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-events-delete" onClick={() => deleteEventHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]
    const deleteEventHandler = (event) => {
        const options = {
            title: `Are You Sure You Want to Delete ${event.name}?`,
            message: `This action will permanently delete the event and all its associated content. Please confirm to complete the deletion.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => dispatch(adminDeleteEvent(event._id))
                },
                {
                    label: 'Cancel',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "delete-event-confirmation-popup"
        };
        confirmAlert(options)
    }

    useEffect(() => {
        dispatch(adminGetAllEvents(key))
    }, [])

    if (loading) {
        return <AdminSetUp current={"events"} option={"all"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"events"} option={"all"} element={
            <section className="admin-all-events-section">
                <div className="admin-all-events-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/admin/events?key=${key}`)
                        dispatch(adminGetAllEvents(key))
                    }}>
                        <input type="text" id="fest_search" placeholder="event Name/Id..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="admin-all-events-grid">
                    <DataGrid
                        columns={columns}
                        rows={events && events.map((event, inx) => {
                            return {
                                name: event.name,
                                conductedClub: event.conductedClub.length,
                                members: event.members.length,
                                edit: event._id,
                                delete: event,
                                id: inx + 1,
                                createdAt: ConvertTime(event.createdAt).split(",")[0],
                                isActive: event.isactive,
                                open: event._id
                            }

                        })}
                        sx={{ minHeight: "60vh", backgroundColor: "" }}
                    />
                </div>
            </section>}
        />
    )
}