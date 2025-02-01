import "./Announcements.css"
import AdminSetUp from "../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { getAllAnnouncements, admindeleteAnnouncement } from "../../../../Actions/announcementsAction"
import { useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';

import { FaExternalLinkAlt } from "react-icons/fa";
export default function AdminAllAnnouncements() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { announcements, loading } = useSelector(state => state.announcements)
    const columns = [
        { field: "id", headerName: "Sl. No" },
        { field: "name", headerName: "Announcement Name", flex: 0.25 },
        { field: "content", headerName: "Content", flex: 0.4 },
        {
            field: "visibility", headerName: "Visibility", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div style={{ color: params.value == 'public' ? "green" : "red" }}>{params.value == 'public' ? "Public" : "Private"}</div>
                    )

                }
            }
        },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.15 },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-announcements-edit" onClick={() => navigate(`/admin/announcements/update/${params.value}`)}>
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
                        <div className="admin-all-announcements-delete" onClick={() => deleteAnnouncementHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]
    const deleteAnnouncementHandler = (Announcement) => {
        const options = {
            title: `Are You Sure You Want to Delete ${Announcement.title}?`,
            message: `This action will permanently delete the Announcement and all its associated content. Please confirm to complete the deletion.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => dispatch(admindeleteAnnouncement(Announcement._id))
                },
                {
                    label: 'Cancel',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "delete-announcement-confirmation-popup"
        };
        confirmAlert(options)
    }

    useEffect(() => {
        dispatch(getAllAnnouncements(key))
    }, [])

    if (loading) {
        return <AdminSetUp current={"announcements"} option={"all"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"a_l"} option={"announcements"} element={
            <section className="admin-all-announcements-section">
                <div className="admin-all-announcements-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/admin/announcements?key=${key}`)
                        dispatch(getAllAnnouncements(key))
                    }}>
                        <input type="text" id="fest_search" placeholder="Announcement Name/Id..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="admin-all-announcements-grid">
                    <DataGrid
                        columns={columns}
                        rows={announcements && announcements.map((Announcement, inx) => {
                            return {
                                name: Announcement.title,
                                content: Announcement.content,
                                edit: Announcement._id,
                                delete: Announcement,
                                id: inx + 1,
                                createdAt: ConvertTime(Announcement.date).split(",")[0],
                                visibility: Announcement.visibility
                            }

                        })}
                        sx={{ minHeight: "60vh", backgroundColor: "" }}
                    />
                </div>
            </section>}
        />
    )
}