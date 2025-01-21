import "./AdministrationTeams.css"
import AdminSetUp from "../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { getallAdministrators, admindeleteAdministrationMember } from "../../../../Actions/administrationAction"
import { useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';

export default function AdminAllAdministrationTeams() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { administrationTeam, loading } = useSelector(state => state.administrationTeam)
    const columns = [
        { field: "id", headerName: "Sl. No" },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "description", headerName: "Description", flex: 0.4 },
        { field: "position", headerName: "Position", flex: 0.2 },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.2 },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-AdministrationTeams-edit" onClick={() => navigate(`/admin/AdministrationTeams/update/${params.value}`)}>
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
                        <div className="admin-all-AdministrationTeams-delete" onClick={() => deleteAdministrationTeamHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]
    const deleteAdministrationTeamHandler = (AdministrationTeam) => {
        const options = {
            title: `Are You Sure You Want to Delete "${AdministrationTeam.name}"?`,
            message: `This action will permanently delete the AdministrationTeam and all its associated content. Please confirm to complete the deletion.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => dispatch(admindeleteAdministrationMember(AdministrationTeam._id))
                },
                {
                    label: 'Cancel',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "delete-AdministrationTeam-confirmation-popup"
        };
        confirmAlert(options)
    }

    useEffect(() => {
        dispatch(getallAdministrators(key))
    }, [])

    if (loading) {
        return <AdminSetUp current={"adminTeam"} option={"all"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"adminTeam"} option={"all"} element={
            <section className="admin-all-AdministrationTeams-section">
                <div className="admin-all-AdministrationTeams-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/admin/administration_team?key=${key}`)
                        dispatch(getallAdministrators(key))
                    }}>
                        <input type="text" id="fest_search" placeholder="AdministrationTeam Name/Id..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="admin-all-AdministrationTeams-grid">
                    <DataGrid
                        columns={columns}
                        rows={administrationTeam && administrationTeam.map((AdministrationTeam, inx) => {
                            return {
                                name: AdministrationTeam.name,
                                description: AdministrationTeam.description,
                                edit: AdministrationTeam._id,
                                delete: AdministrationTeam,
                                id: inx + 1,
                                createdAt: ConvertTime(AdministrationTeam.createdAt).split(",")[0],
                                position: AdministrationTeam.position
                            }

                        })}
                        sx={{ minHeight: "60vh", backgroundColor: "" }}
                    />
                </div>
            </section>}
        />
    )
}