import "./AdminAllUsers.css"
import AdminSetUp from "../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { adminGetAllUsers, adminSetBlockStatus, admindeleteUser } from "../../../../Actions/userActions"
import { Fragment, useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';
import { AiOutlineUserDelete } from "react-icons/ai";
import { ImBlocked } from "react-icons/im";
import { FaExternalLinkAlt } from "react-icons/fa";
import { CgUnblock } from "react-icons/cg";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import XlsxButton from "../../../Functionalities/XlsxButton"
export default function AdminAllusers() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedUser, setSelectedUser] = useState({})
    const [blockOpen, setBlockOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const roleColors = {
        admin: "#D4AF37",
        student: "#2E8B57",
        coordinator: "#007BFF",
        general: "#555555"
    };


    const { users, loading } = useSelector(state => state.users)
    const columns = [
        { field: "id", headerName: "Sl. No" },
        { field: "username", headerName: "Username", flex: 0.2 },
        { field: "mail", headerName: "Mail", flex: 0.3 },
        {
            field: "isblocked", headerName: "Blocked", flex: 0.2,
            renderCell: (params) => {
                if (typeof params.value == "boolean") {
                    return <span style={{ color: params.value ? "red" : "green" }}>{params.value ? "Blocked" : "Not Blocked"}</span>
                }
            }
        },
        {
            field: "role", headerName: "Role", flex: 0.2,
            renderCell: (params) => {
                if (params.value) {
                    return <span style={{ color: roleColors[params.value] }}>{params.value.toUpperCase()}</span>
                }
            }
        },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.2 },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-users-edit" onClick={() => navigate(`/admin/users/update/${params.value}`)}>
                            <FaEdit />
                        </div>
                    )

                }
            }
        },
        {
            field: "block", headerName: "Block", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div style={{ fontSize: "25px", color: params.value.isBlocked ? "red" : "green" }}
                            onClick={() => {
                                if (params.value.role != "admin") {
                                    setBlockOpen(true)
                                    setSelectedUser(params.value)
                                } else {
                                    alert("you don't have access to block")
                                }

                            }}>
                            {params.value.isBlocked ? <ImBlocked /> : <CgUnblock />}
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
                        <div style={{ fontSize: "25px", color: "red" }}
                            onClick={() => {
                                if (params.value.role != "admin") {
                                    setDeleteOpen(true)
                                    setSelectedUser(params.value)
                                } else {
                                    alert("you don't have access to block")
                                }

                            }}>
                            <AiOutlineUserDelete />
                        </div>
                    )

                }
            }
        }
    ]

    useEffect(() => {
        dispatch(adminGetAllUsers(key))
    }, [])

    if (loading) {
        return <AdminSetUp current={"users"} option={"all"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"users"} option={"all"} element={
            <Fragment>
                <section>
                    <Dialog
                        open={blockOpen}
                        onClose={() => { setSelectedUser({}) }}
                        PaperProps={{
                            component: 'form',
                            onSubmit: (event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries(formData.entries());
                                const message = formJson.message;
                                dispatch(adminSetBlockStatus({ isBlocked: !selectedUser.isBlocked, message: message }, selectedUser._id))
                                setBlockOpen(false)
                            },
                        }}
                    >
                        <DialogTitle sx={{ color: "#0A5EB0" }}>User Status Update & Notification</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Write a message and click {selectedUser.isBlocked ? "UnBlock" : "Block"} to update the {selectedUser.username} status. The user will be notified via email.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                multiline
                                rows={3}
                                id="message"
                                name="message"
                                label="Message"
                                fullWidth
                                variant="outlined"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setBlockOpen(false) }}>Cancel</Button>
                            <Button type="submit" sx={{ color: selectedUser.isBlocked ? "green" : "red" }}>{selectedUser.isBlocked ? "UnBlock" : "Block"}</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={deleteOpen}
                        onClose={() => { setSelectedUser({}) }}
                        PaperProps={{
                            component: 'form',
                            onSubmit: (event) => {
                                event.preventDefault();
                                const formData = new FormData(event.currentTarget);
                                const formJson = Object.fromEntries(formData.entries());
                                const message = formJson.message;
                                dispatch(admindeleteUser({ message: message }, selectedUser._id))
                                setDeleteOpen(false)
                            },
                        }}
                    >
                        <DialogTitle sx={{ color: "red" }}>Delete User</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Write the message and click to delete the {selectedUser.username} user. The user will be notified via email, and all data related to the user will be permanently deleted.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                multiline
                                rows={3}
                                id="message"
                                name="message"
                                label="Message"
                                fullWidth
                                variant="outlined"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => { setDeleteOpen(false) }}>Cancel</Button>
                            <Button type="submit" sx={{ color: "red" }}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </section>

                <section className="admin-all-users-section">
                    <div className="admin-all-users-search">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            navigate(`/admin/users?key=${key}`)
                            dispatch(adminGetAllUsers(key))
                        }}>
                            <input type="text" id="fest_search" placeholder="user Name/Id..." value={key} onChange={(e) => setKey(e.target.value)} />
                            <button >Search</button>
                        </form>
                    </div>
                    <div className="admin-all-users-grid">
                        <div>
                            <DataGrid
                                columns={columns}
                                rows={users && users.map((user, inx) => {
                                    return {
                                        username: user.username,
                                        mail: user.mail,
                                        isblocked: user.isBlocked,
                                        role: user.role,
                                        edit: user._id,
                                        id: inx + 1,
                                        createdAt: ConvertTime(user.createdAt).split(",")[0],
                                        block: user,
                                        delete: user
                                    }

                                })}
                                sx={{ minHeight: "60vh", backgroundColor: "white", minWidth: "1200px" }}
                            />
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0px" }}>
                            <XlsxButton filename={`Users`}
                                data={users && users.map((member, inx) => {
                                    return {
                                        Sl_No: inx + 1,
                                        Username: member.username,
                                        Role: member.role.toUpperCase(),
                                        Blocked: member.isBlocked,
                                        Name: `${member.personalInformation.firstname} ${member.personalInformation.lastname}`,
                                        Gender: member.personalInformation.gender,
                                        Mail: member.personalInformation.personalMail,
                                        MobileNo: member.personalInformation.mobileNo,
                                        AdmissionNo: member.admissionNo,
                                        Degree: member.course,
                                        Branch: member.branch,
                                        Academic_Year: member.academicYear,
                                        CreatedAt: ConvertTime(member.createdAt),
                                    }

                                })}
                            />
                        </div>
                    </div>
                </section>
            </Fragment>
        }
        />
    )
}