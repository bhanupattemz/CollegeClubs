import "./AdminAllFestEvents.css";
import AdminSetUp from "../../AdminSetUp";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../../../Loaders/Loading";
import {
    getFestEvents,
    adminDeleteFestEvent,
    adminGetFestEvents
} from "../../../../../Actions/festActions";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ConvertTime } from "../../../../Functionalities/functionalites";
import { confirmAlert } from 'react-confirm-alert';
import XlsxButton from "../../../../Functionalities/XlsxButton"
export default function AdminAllFestEvents() {
    const [key, setKey] = useState("");
    const [current, setCurrent] = useState("fest");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { festEvents, loading } = useSelector(state => state.festEvents);
    const btnStyles = { backgroundColor: "#0A5EB0", color: "white", border: "2px solid #0A5EB0" }
    const deleteFestEventHandler = (festEvent) => {
        confirmAlert({
            title: `Are You Sure You Want to Delete ${festEvent.name}?`,
            message: "This action will permanently delete the fest event and all associated content.",
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => dispatch(adminDeleteFestEvent(festEvent._id))
                },
                { label: 'Cancel' }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            overlayClassName: "delete-festEvent-confirmation-popup"
        });
    };

    useEffect(() => {
        if (current == 'fest') {
            dispatch(getFestEvents(key));
        } else if (current == "all") {
            dispatch(adminGetFestEvents(key));

        }
    }, []);


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
                    <div className="admin-all-festEvents-link" onClick={() => navigate(`/admin/fests/events/members/${params.value}`)}>
                        <FaExternalLinkAlt />
                    </div>
                )
            )
        },
        {
            field: "open", headerName: "Open", flex: 0.1,
            renderCell: (params) => (
                params.value && (
                    <div className="admin-all-festEvents-link" onClick={() => navigate(`/fest/events/${params.value}`)}>
                        <FaExternalLinkAlt />
                    </div>
                )
            )
        },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => (
                params.value && (
                    <div className="admin-all-festEvents-edit" onClick={() => navigate(`/admin/fests/events/update/${params.value}`)}>
                        <FaEdit />
                    </div>
                )
            )
        },
        {
            field: "delete", headerName: "Delete", flex: 0.1,
            renderCell: (params) => (
                params.value && (
                    <div className="admin-all-festEvents-delete" onClick={() => deleteFestEventHandler(params.value)}>
                        <MdDelete />
                    </div>
                )
            )
        }
    ];

    return (
        <AdminSetUp current="fests" option="all-events" element={
            <section className="admin-all-festEvents-section">
                <div className="admin-all-festEvents-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (current == 'fest') {
                            dispatch(getFestEvents(key));
                        } else {
                            dispatch(adminGetFestEvents(key));

                        }
                    }}>
                        <input
                            type="text"
                            id="fest_search"
                            placeholder="Fest Event Name/ID..."
                            value={key ? key : ""}
                            onChange={(e) => setKey(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>

                <div className="admin-all-festEvents-controls">
                    <button style={current == "fest" ? btnStyles : null} onClick={() => {
                        if (current != "fest") {
                            dispatch(getFestEvents(key));
                            setCurrent('fest');
                        }

                    }} type="button">Current Fest Events</button>
                    <button style={current == "all" ? btnStyles : null} onClick={() => {
                        if (current != "all") {
                            dispatch(adminGetFestEvents(key));
                            setCurrent('all');
                        }
                    }} type="button">All Events</button>
                </div>

                <div className="admin-all-festEvents-grid">
                    <DataGrid
                        columns={columns}
                        loading={loading}
                        rows={festEvents?.map((festEvent, index) => ({
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
                    <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0px" }}>
                        <XlsxButton filename={"Fest_Events"}
                            data={festEvents?.map((festEvent, index) => ({
                                id: index + 1,
                                Name: festEvent.name,
                                ConductedClub: festEvent.conductedClub.length,
                                Registrations: festEvent.members.length,
                                Amount: festEvent.amount,
                                TotalAmount: `₹${festEvent.members.length * festEvent.amount}`,
                                Registration_Timings: `${ConvertTime(festEvent.registration.starting).split(',')[0]} to ${ConvertTime(festEvent.registration.ending).split(',')[0]}`,
                                Timings: `${ConvertTime(festEvent.timings.starting).split(',')[0]} to ${ConvertTime(festEvent.timings.ending).split(',')[0]}`,
                                CreatedAt: ConvertTime(festEvent.createdAt).split(",")[0],
                            }))}
                        />
                    </div>
                </div>
            </section>
        } />
    );
}
