import "./pastMembers.css"
import "../../../AboutUs/PastMembers.css"
import AdminSetUp from "../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux"
import { getPastMembers, adminDeletePastMember } from "../../../../Actions/pastUsersAction"
import { useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';
import XlsxButton from "../../../Functionalities/XlsxButton"
export default function AdminAllpastMembers() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pastMembers, loading } = useSelector(state => state.pastMembers)
    const [current, setCurrent] = useState("faculty")
    const currentbtnOptions = { backgroundColor: "#0A5EB0", border: "none", color: "white" }
    const columns = [
        { field: "id", headerName: "Sl. No", flex: 0.1 },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "department", headerName: "Department", flex: 0.15 },
        { field: "workedAs", headerName: "Worked As", flex: 0.2 },
        { field: "joined", headerName: "Joined", flex: 0.2 },
        { field: "left", headerName: "Left At", flex: 0.2 },
        { field: "mail", headerName: "Mail", flex: 0.2 },
        { field: "mobileNo", headerName: "Mobile No", flex: 0.18 },

    ]
    const deletepastMemberHandler = (pastMember) => {
        const options = {
            title: `Are You Sure You Want to Delete "${pastMember.name}"?`,
            message: `This action will permanently delete the pastMember and all its associated content. Please confirm to complete the deletion.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => dispatch(adminDeletePastMember(pastMember._id))
                },
                {
                    label: 'Cancel',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "delete-pastMember-confirmation-popup"
        };
        confirmAlert(options)
    }

    useEffect(() => {
        dispatch(getPastMembers(key))
    }, [])
    const adminColumns = [
        { field: "id", headerName: "Sl. No" },
        { field: "name", headerName: "Name", flex: 0.3 },
        { field: "department", headerName: "Department", flex: 0.2 },
        { field: "from", headerName: "From", flex: 0.2 },
        { field: "to", headerName: "To", flex: 0.2 },
        { field: "mobileNo", headerName: "Mobile Number", flex: 0.2 },
        { field: "mail", headerName: "Mail", flex: 0.4 },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-pastMembers-edit" onClick={() => navigate(`/admin/past_team/update/${params.value}`)}>
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
                        <div className="admin-all-pastMembers-delete" onClick={() => deletepastMemberHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]

    const coordinatorColumns = [
        { field: "id", headerName: "Sl. No", flex: 0.1 },
        { field: "admissionNo", headerName: "Admission number", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.3 },
        { field: "department", headerName: "Department", flex: 0.16 },
        {
            field: 'managedClub',
            headerName: 'managed Clubs',
            flex: 0.6,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <Box
                            display="flex"
                            flexDirection="column"
                            padding={1}
                        >
                            {params.value.map((club, index) => (
                                <Box
                                    key={index}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    padding={1}
                                    bgcolor={index % 2 === 0 ? "#dedede" : "#f0f0f0"}
                                    borderRadius="4px"
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        {club.name}:
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold" color="primary">
                                        {ConvertTime(club.duration.joined).split(",")[0]}
                                    </Typography>
                                    <Typography variant="body2" fontWeight="medium" marginX={1}>
                                        to
                                    </Typography>
                                    <Typography variant="body2" fontWeight="bold" color="primary">
                                        {ConvertTime(club.duration.left).split(",")[0]}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )
                }

            },
        },
        { field: "mobileNo", headerName: "Mobile Number", flex: 0.2 },
        { field: "mail", headerName: "Mail", flex: 0.4 },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-pastMembers-edit" onClick={() => navigate(`/admin/past_team/update/${params.value}`)}>
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
                        <div className="admin-all-pastMembers-delete" onClick={() => deletepastMemberHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]
    const studentMembers = pastMembers?.filter(member => member.workedAs === "studentCoordinator") || [];
    const facultyMembers = pastMembers?.filter(member => member.workedAs === "facultyCoordinator") || [];
    const coordinators = pastMembers?.filter(member => member.workedAs === "coordinator") || [];
    if (loading) {
        return <AdminSetUp current={"users"} option={"past-all"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"users"} option={"past-all"} element={
            <section className="admin-all-pastMembers-section">
                <div className="admin-all-pastMembers-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/admin/past_team?key=${key}`)
                        dispatch(getPastMembers(key))
                    }}>
                        <input type="text" id="fest_search" placeholder="pastMember Name/Id..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <section className="past-member-btns admin-past-members-btns">
                    <button onClick={() => setCurrent("faculty")} style={current == "faculty" ? currentbtnOptions : null}>Past Faculty Coordinators</button>
                    <button onClick={() => setCurrent("student")} style={current == "student" ? currentbtnOptions : null}>Past Student Coordinators</button>
                    <button onClick={() => setCurrent("coordinator")} style={current == "coordinator" ? currentbtnOptions : null}>Club Coordinators</button>
                </section>
                <section>
                    {["student", "faculty"].includes(current) &&
                        <Box sx={{ width: "100%" }}>
                            <div style={{ display: "flex", flexDirection: "column" }} className="admin-past-members-grid">
                                <DataGrid
                                    columns={adminColumns}
                                    rows={current == "student" ? studentMembers.map((item, inx) => ({
                                        ...item,
                                        from: ConvertTime(item.duration.joined).split(",")[0],
                                        to: ConvertTime(item.duration.left).split(",")[0],
                                        id: inx + 1,
                                        edit: item._id,
                                        delete: item
                                    })) :
                                        facultyMembers.map((item, inx) => ({
                                            ...item,
                                            from: ConvertTime(item.duration.joined).split(",")[0],
                                            to: ConvertTime(item.duration.left).split(",")[0],
                                            id: inx + 1,
                                            edit: item._id,
                                            delete: item
                                        }))

                                    }
                                    pageSize={5}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    sx={{ '& .MuiDataGrid-root': { fontSize: '16px' } }}
                                    loading={loading}
                                    style={{ minHeight: "50vh", backgroundColor: "#ecf1f5", minWidth: "1000px" }}
                                />
                            </div>
                        </Box>
                    }
                    {current == "coordinator" &&
                        <Box sx={{ width: "100%" }}>
                            <div style={{ display: "flex", flexDirection: "column" }} className="admin-past-members-grid">
                                <DataGrid
                                    columns={coordinatorColumns}
                                    rows={coordinators.map((item, inx) => {
                                        return {
                                            ...item,
                                            id: inx + 1,
                                            edit: item._id,
                                            delete: item
                                        }
                                    })}
                                    pageSize={5}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    sx={{ '& .MuiDataGrid-root': { fontSize: '16px' } }}
                                    loading={loading}
                                    getRowHeight={() => 'auto'}
                                    style={{ minHeight: "50vh", backgroundColor: "#ecf1f5", minWidth: "1200px" }}

                                />
                            </div>
                        </Box>
                    }
                    <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0px" }}>
                        {["student", "faculty"].includes(current) &&
                            <XlsxButton filename={`Past_${current}_Coordinators`}
                                data={current == "student" ? studentMembers.map((item, inx) => ({
                                    id: inx + 1,
                                    Name: item.name,
                                    Mail: item.mail,
                                    Mobile_No: item.mobileNo,
                                    Department: item.department,
                                    WorkedAs: item.workedAs,
                                    From: ConvertTime(item.duration.joined).split(",")[0],
                                    To: ConvertTime(item.duration.left).split(",")[0],
                                })) :
                                    facultyMembers.map((item, inx) => ({
                                        id: inx + 1,
                                        Name: item.name,
                                        Mail: item.mail,
                                        Mobile_No: item.mobileNo,
                                        Department: item.department,
                                        WorkedAs: item.workedAs,
                                        From: ConvertTime(item.duration.joined).split(",")[0],
                                        To: ConvertTime(item.duration.left).split(",")[0],

                                    }))}
                            />
                        }
                        {current == "coordinator" &&
                            <XlsxButton filename={`Past_Coordinators`}
                                data={coordinators.map((item, inx) => {
                                    return {
                                        Admission_No: item.admissionNo,
                                        Name: item.name,
                                        Mail: item.mail,
                                        Mobile_No: item.mobileNo,
                                        Department: item.department,
                                        Managed_Clubs: item.managedClub.map((club) => `${club.name} from ${ConvertTime(club.duration.joined).split(",")[0]} to ${ConvertTime(item.duration.left).split(",")[0]}`).join(", "),
                                        From: ConvertTime(item.duration.joined).split(",")[0],
                                        To: ConvertTime(item.duration.left).split(",")[0],
                                    }
                                })}
                            />
                        }
                    </div>
                </section>
            </section>}
        />
    )
}