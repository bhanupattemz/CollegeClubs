import "./EventMembers.css"
import AdminSetUp from "../AdminSetUp"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import { BACKENDURL } from "../../../Functionalities/functionalites"
import { DataGrid } from "@mui/x-data-grid";
import { confirmAlert } from 'react-confirm-alert';
import { MdPersonRemove } from "react-icons/md";
import XlsxButton from "../../../Functionalities/XlsxButton"
export default function EventMembers() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const { _id } = useParams()
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(false)
    const RemoveMemberHandler = (member) => {
        const options = {
            title: `Are You Sure You Want to Remove ${member.admissionNo}?`,
            message: `This action will permanently remove the member and all its associated content. Please confirm to complete remove.`,
            buttons: [
                {
                    label: 'Remove',
                    onClick: async () => {
                        try {
                            setLoading(true)
                            const response = await axiosInstance.put(`/events/unregister/${_id}`, { member: member._id })
                            setMembers(response.data.data)
                            toast.success("Event member removed successfully!")
                        } catch (err) {
                            toast.error(err)
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
            overlayClassName: "delete-event-confirmation-popup"
        };
        confirmAlert(options)
    }

    const columns = [
        { field: "id", headerName: "Sl. No" },
        { field: "admissionNo", headerName: "Admission No", flex: 0.15 },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "mail", headerName: "Mail", flex: 0.25 },
        { field: "mobileNo", headerName: "Mobile No", flex: 0.2 },
        { field: "course", headerName: "Degree", flex: 0.1 },
        { field: "branch", headerName: "Branch", flex: 0.1 },
        { field: "academicYear", headerName: "Academic Year", flex: 0.1 },
        { field: "gender", headerName: "Gender", flex: 0.1 },
        {
            field: "remove", headerName: "Remove", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="remove-member-cell" style={{ fontSize: "25px", color: "red", cursor: "pointer" }} onClick={() => { RemoveMemberHandler(params.value) }}>
                            < MdPersonRemove />
                        </div>
                    )

                }
            }
        },
    ]
    useEffect(() => {
        async function getAllMembers() {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/events/members/${_id}`)
                setMembers(response.data.data)
            }
            catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
        getAllMembers()
    }, [])
    return <AdminSetUp current={"events"} option={"members"} element={
        <section className="event-members" style={{ margin: "20px 0px" }}>
            <div className="event-members-data-grid">
                <DataGrid
                    columns={columns}
                    rows={members && members.map((member, inx) => {
                        return {
                            name: `${member.personalInformation.firstname} ${member.personalInformation.lastname}`,
                            admissionNo: member.admissionNo.toUpperCase(),
                            remove: member,
                            id: inx + 1,
                            mail: member.personalInformation.personalMail,
                            mobileNo: member.personalInformation.mobileNo,
                            gender: member.personalInformation.gender.toUpperCase(),
                            course: member.course.toUpperCase(),
                            branch: member.branch.toUpperCase(),
                            academicYear: member.academicYear,
                        }
                    })}
                    sx={{ minHeight: "60vh", backgroundColor: "white" ,minWidth:"1000px"}}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0px" }}>
                <XlsxButton filename={"Event_members"}
                    data={members && members.map((member, inx) => {
                        return {
                            AdmissionNo: member.admissionNo.toUpperCase(),
                            Name: `${member.personalInformation.firstname} ${member.personalInformation.lastname}`,
                            Degree: member.course.toUpperCase(),
                            Branch: member.branch.toUpperCase(),
                            Academic_Year: member.academicYear,
                            Gender: member.personalInformation.gender.toUpperCase(),
                            Mail: member.personalInformation.personalMail,
                            MobileNo: member.personalInformation.mobileNo
                        }

                    })}
                />
            </div>
        </section>
    } />
}