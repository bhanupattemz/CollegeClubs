import "./CoordinatorEvents.css"
import CoordinatorSetup from "../CoordinatorSetup"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { getCoordinatorEvents, adminDeleteEvent } from "../../../../Actions/EventAction"
import { useEffect, useState } from "react";
import { TbEditOff } from "react-icons/tb";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';
import XlsxButton from "../../../Functionalities/XlsxButton"
export default function CoordinatorEvents() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { events, loading } = useSelector(state => state.events)
    const columns = [
        { field: "id", headerName: "Sl. No" },
        { field: "name", headerName: "Event Name", flex: 0.2 },
        { field: "members", headerName: "Number of members", flex: 0.15 },
        {
            field: "isActive", headerName: "Is Active", flex: 0.1,
            renderCell: (params) => {
                if (params) {
                    return (
                        <div style={params.value ? { color: "green" } : { color: "red" }}>{params.value ? "True" : "False"}</div>
                    )
                }
            }
        },
        { field: "conductedClub", headerName: "Conducted Clubs", flex: 0.1 },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.2 },
        {
            field: "allMembers", headerName: "Members", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="coordinator-events-link" onClick={() => navigate(`/coordinator/events/members/${params.value}`)}>
                            <FaExternalLinkAlt />
                        </div>
                    )
                }
            }
        },
        {
            field: "open", headerName: "Open", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="coordinator-events-link" onClick={() => navigate(`/events/${params.value}`)}>
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
                        <div className="coordinator-events-edit" style={{ color: params.value.isactive ? "#ff9800" : "#007bff" }} onClick={() => {
                            if (!params.value.isactive) {
                                navigate(`/coordinator/events/update/${params.value._id}`)
                            }
                        }}>
                            {params.value.isactive ? <TbEditOff /> : <FaEdit />}
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
                        <div className="coordinator-events-delete" style={{ color: params.value.isactive ? "#ff9800" : "red" }} onClick={() => {
                            if (!params.value.isactive) {
                                deleteEventHandler(params.value)
                            }
                        }}>
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
        dispatch(getCoordinatorEvents(key))
    }, [])
    return (
        <CoordinatorSetup current={"events"} option={"all"} element={
            <section className="coordinator-events-section">
                <div className="coordinator-events-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/coordinator/events?key=${key}`)
                        dispatch(getCoordinatorEvents(key))
                    }}>
                        <input type="text" id="fest_search" placeholder="event Name/Id..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="coordinator-events-grid">
                    <DataGrid
                        columns={columns}
                        loading={loading}
                        rows={events && events.map((event, inx) => {
                            return {
                                name: event.name,
                                conductedClub: event.conductedClub.length,
                                members: event.members.length,
                                edit: event,
                                delete: event,
                                id: inx + 1,
                                createdAt: ConvertTime(event.createdAt).split(",")[0],
                                isActive: event.isactive,
                                open: event._id,
                                allMembers: event._id
                            }

                        })}
                        sx={{ height: "65vh", backgroundColor: "white" }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0px" }}>
                        <XlsxButton filename={"Events"}
                            data={events && events.map((event, inx) => {
                                return {
                                    id: inx + 1,
                                    Name: event.name,
                                    Conducted_Clubs: event.conductedClub.length,
                                    Members: event.members.length,
                                    Registeration: `${ConvertTime(event.registration.starting)} to ${ConvertTime(event.registration.ending)}`,
                                    Timings: `${ConvertTime(event.timings.starting)} to ${ConvertTime(event.timings.ending)}`,
                                    isActive: event.isactive,
                                    createdAt: ConvertTime(event.createdAt).split(",")[0],
                                }

                            })}
                        />
                    </div>
                </div>
            </section>}
        />
    )
}