import "./FestMembers.css"
import AdminSetUp from "../../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import Loading from "../../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ConvertTime, BACKENDURL } from "../../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';
import axios from "axios"
export default function AdminAllMembers() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(false)
    const [nextLoading, setNextLoading] = useState(false)
    const columns = [
        { field: "id", headerName: "Sl. No", flex: 0.1 },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "college", headerName: "College", flex: 0.2 },
        { field: "mail", headerName: "Mail", flex: 0.3 },
        { field: "mobileNo", headerName: "Mobile No", flex: 0.2 },
        { field: "course", headerName: "Degree", flex: 0.1 },
        { field: "branch", headerName: "Branch", flex: 0.1 },
        { field: "gender", headerName: "Gender", flex: 0.1 },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.2 },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-fests-members-edit" onClick={() => navigate(`/admin/fests/members/update/${params.value}`)}>
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
                        <div className="admin-all-fests-members-delete" onClick={() => deletefestMemberHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]
    const deletefestMemberHandler = (member) => {
        const options = {
            title: `Are You Sure You Want to Delete ${member.name}?`,
            message: `This action will permanently delete the member and all its associated content. Please confirm to complete the deletion.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: async () => {
                        setLoading(true)
                        try {
                            const response = await axiosInstance.delete(`/fest/members/${member._id}`)
                            setMembers(response.data.data)
                        } catch (err) {
                            console.log(err)
                        }
                        setLoading(false)
                    }
                },
                {
                    label: 'Cancel',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "delete-fest-confirmation-popup"
        };
        confirmAlert(options)
    }

    useEffect(() => {
        async function getAllfestMembers() {
            try {
                setNextLoading(true)
                const response = await axiosInstance.get(`/fest/members?key=${key ? key : ""}`)
                setMembers(response.data.data)
            }
            catch (err) {
                console.log(err)
            }
            setNextLoading(false)
        }
        getAllfestMembers()
    }, [])

    if (nextLoading) {
        return <AdminSetUp current={"fests"} option={"all-members"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"fests"} option={"all-members"} element={
            <section className="admin-all-fests-members-section">
                <div className="admin-all-fests-members-search">
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            setLoading(true)
                            const response = await axiosInstance.get(`/fest/members?key=${key ? key : ""}`)
                            setMembers(response.data.data)
                        } catch (err) {
                            console.log(err)
                        }
                        setLoading(false)
                        navigate(`/admin/fests/members?key=${key}`)
                    }}>
                        <input type="text" id="fest_search" placeholder="Search..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="admin-all-fests-members-grid">
                    <DataGrid
                        columns={columns}
                        rows={members && members.map((member, inx) => {
                            return {
                                name: member.name,
                                college: member.college,
                                remove: member,
                                id: inx + 1,
                                mail: member.mail,
                                mobileNo: member.mobileNo,
                                gender: member.gender,
                                course: member.course,
                                branch: member.branch,
                                createdAt: ConvertTime(member.createdAt).split(",")[0],
                                edit: member._id,
                                delete: member
                            }
                        })}
                        loading={loading}
                        sx={{ minHeight: "60vh", backgroundColor: "" }}
                    />
                </div>
            </section>}
        />
    )
}