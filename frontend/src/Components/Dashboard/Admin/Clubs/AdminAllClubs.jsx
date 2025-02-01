import "./adminAllClubs.css"
import AdminSetUp from "../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { getAllclubs, adminDeleteClub } from "../../../../Actions/clubsAction"
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';
import axios from "axios";
import { BACKENDURL } from "../../../Functionalities/functionalites"
import { FaExternalLinkAlt } from "react-icons/fa";
import XlsxButton from "../../../Functionalities/XlsxButton"
export default function AdminAllClubs() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { clubs, loading } = useSelector(state => state.clubs)
    const [mailLoading, setMailLoading] = useState(false)
    const columns = [
        { field: "id", headerName: "Sl. No" },
        { field: "name", headerName: "Club Name", flex: 0.3 },
        { field: "coordinators", headerName: "Number of Coordinators", flex: 0.2 },
        { field: "members", headerName: "Number of members", flex: 0.2 },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.2 },
        {
            field: "allMembers", headerName: "Members", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-events-link" onClick={() => navigate(`/admin/clubs/members/${params.value}`)}>
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
                        <div className="admin-all-events-link" onClick={() => navigate(`/clubs/${params.value}`)}>
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
                        <div className="admin-all-clubs-edit" onClick={() => navigate(`/admin/clubs/update/${params.value}`)}>
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
                        <div className="admin-all-clubs-delete" onClick={() => deleteClubHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]
    const deleteClubHandler = (club) => {
        const options = {
            title: `Are You Sure You Want to Delete ${club.name}?`,
            message: `This action will permanently delete the club and all its associated content. Please confirm to complete the deletion.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => dispatch(adminDeleteClub(club._id))
                },
                {
                    label: 'Cancel',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "delete-club-confirmation-popup"
        };
        confirmAlert(options)
    }

    useEffect(() => {
        dispatch(getAllclubs(key))
    }, [])

    if (loading || mailLoading) {
        return <AdminSetUp current={"clubs"} option={"all"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"clubs"} option={"all"} element={
            <section className="admin-all-clubs-section">
                <div className="admin-all-clubs-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/admin/clubs?key=${key}`)
                        dispatch(getAllclubs(key))
                    }}>
                        <input type="text" id="fest_search" placeholder="Club Name/Id..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="admin-all-clubs-grid">
                    <DataGrid
                        columns={columns}
                        rows={clubs && clubs.map((club, inx) => {
                            return {
                                name: club.name,
                                coordinators: club.coordinators.length,
                                members: club.members.length,
                                edit: club._id,
                                delete: club,
                                id: inx + 1,
                                createdAt: ConvertTime(club.createdAt).split(",")[0],
                                open: club._id,
                                allMembers: club._id
                            }

                        })}
                        sx={{ minHeight: "60vh", backgroundColor: "" }}
                    />
                    <div className="admin-all-club-download-btns">
                        <Button variant="contained" onClick={async () => {
                            try {
                                setMailLoading(true)
                                const respounce = await axiosInstance.get('/clubs/mail/coordinators')
                                alert("Mail Send successfully")
                            } catch (err) {
                                console.log(err)
                            }
                            setMailLoading(false)
                        }}>📩 Send Details to Coordinators</Button>
                        <XlsxButton filename="Clubs" data={
                            clubs && clubs.map((club, inx) => {
                                let club_timings = club.timings.map((item) => `${item.day} ${item.time}`)
                                return {
                                    Id: inx + 1,
                                    Name: club.name,
                                    Coordinators: club.coordinators.length,
                                    Members: club.members.length,
                                    Type: club.type,
                                    Skills: club?.skills.join(", "),
                                    Registration_timings: `${ConvertTime(club.registrationTiming.starting).split(",")[0]} to ${ConvertTime(club.registrationTiming.ending).split(",")[0]}`,
                                    Club_Timings: club_timings.join(", "),
                                    CreatedAt: ConvertTime(club.createdAt).split(",")[0]
                                }

                            })
                        } />
                    </div>
                </div>
            </section>}
        />
    )
}