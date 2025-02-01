import CoordinatorSetup from "../CoordinatorSetup"
import "./CoordinatorClubs.css"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { getCoordinatorClubs } from "../../../../Actions/clubsAction"
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { FaExternalLinkAlt } from "react-icons/fa";
import XlsxButton from "../../../Functionalities/XlsxButton"
export default function coordinatorClubs() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { clubs, loading } = useSelector(state => state.clubs)
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
                        <div style={{ color: "grey", fontSize: "20px", cursor: "pointer" }} onClick={() => navigate(`/coordinator/clubs/members/${params.value}`)}>
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
                        <div  style={{ color: "grey", fontSize: "20px", cursor: "pointer" }} onClick={() => navigate(`/clubs/${params.value}`)}>
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
                        <div className="coordinator-all-clubs-edit" onClick={() => navigate(`/coordinator/clubs/update/${params.value}`)}>
                            <FaEdit />
                        </div>
                    )

                }
            }
        }
    ]
    useEffect(() => {
        dispatch(getCoordinatorClubs(key))
    }, [])

    return <CoordinatorSetup current={"clubs"} option={"all"} element={
        <section className="coordinator-all-clubs-section">
            <div className="coordinator-all-clubs-search">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    navigate(`/coordinator/clubs?key=${key}`)
                    dispatch(getCoordinatorClubs(key))
                }}>
                    <input type="text" id="fest_search" placeholder="Club Name/Id..." value={key} onChange={(e) => setKey(e.target.value)} />
                    <button >Search</button>
                </form>
            </div>
            <div className="coordinator-all-clubs-grid">
                <DataGrid
                    columns={columns}
                    loading={loading}
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
                <div className="coordinator-all-club-download-btns">
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
        </section>
    } />
}