import "./AdminAllFestEvents.css"
import AdminSetUp from "../../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import Loading from "../../../../Loaders/Loading"
import { getFestEvents, adminDeleteFestEvent } from "../../../../../Actions/festActions"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ConvertTime } from "../../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';
export default function AdminAllFestEvents() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { festEvents, loading } = useSelector(state => state.festEvents)
    const columns = [
        { field: "id", headerName: "Sl. No" },
        { field: "name", headerName: "festEvent Name", flex: 0.3 },
        { field: "members", headerName: "Registrations", flex: 0.2 },
        { field: "amount", headerName: "Amount", flex: 0.1 },
        { field: "conductedClub", headerName: "Conducted Clubs", flex: 0.2 },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.2 },
        {
            field: "open", headerName: "Open", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-festEvents-link" onClick={() => navigate(`/admin/fests/events/${params.value}`)}>
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
                        <div className="admin-all-festEvents-edit" onClick={() => navigate(`/admin/fests/events//update/${params.value}`)}>
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
                        <div className="admin-all-festEvents-delete" onClick={() => deletefestEventHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]
    const deletefestEventHandler = (festEvent) => {
        const options = {
            title: `Are You Sure You Want to Delete ${festEvent.name}?`,
            message: `This action will permanently delete the festEvent and all its associated content. Please confirm to complete the deletion.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => dispatch(adminDeleteFestEvent(festEvent._id))
                },
                {
                    label: 'Cancel',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "delete-festEvent-confirmation-popup"
        };
        confirmAlert(options)
    }

    useEffect(() => {
        dispatch(getFestEvents(key))
    }, [])

    if (loading) {
        return <AdminSetUp current={"fests"} option={"all-events"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"fests"} option={"all-events"} element={
            <section className="admin-all-festEvents-section">
                <div className="admin-all-festEvents-search">
                    <form onSubmit={(e) => {
                        e.prfestEventDefault();
                        navigate(`/admin/festEvents?key=${key}`)
                        dispatch(adminGetAllfestEvents(key))
                    }}>
                        <input type="text" id="fest_search" placeholder="festEvent Name/Id..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="admin-all-festEvents-grid">
                    <DataGrid
                        columns={columns}
                        rows={festEvents && festEvents.map((festEvent, inx) => {
                            return {
                                name: festEvent.name,
                                conductedClub: festEvent.conductedClub.length,
                                members: festEvent.members.length,
                                edit: festEvent._id,
                                delete: festEvent,
                                id: inx + 1,
                                createdAt: ConvertTime(festEvent.createdAt).split(",")[0],
                                amount: festEvent.amount,
                                open: festEvent._id
                            }

                        })}
                        sx={{ minHeight: "60vh", backgroundColor: "" }}
                    />
                </div>
            </section>}
        />
    )
}