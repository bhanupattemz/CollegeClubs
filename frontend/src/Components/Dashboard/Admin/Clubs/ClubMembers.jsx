import "./ClubMembers.css"
import AdminSetUp from "../AdminSetUp"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import axios from "axios"
import { BACKENDURL } from "../../../Functionalities/functionalites"
import { DataGrid } from "@mui/x-data-grid";
import { confirmAlert } from 'react-confirm-alert';
import { MdPersonRemove } from "react-icons/md";
import XlsxButton from "../../../Functionalities/XlsxButton"
export default function ClubMembers() {
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
                            const response = await axiosInstance.put(`/clubs/unregister/${_id}`, { member: member._id })
                            setMembers(response.data.data)
                            toast.success("Club member removed successfully!")
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
            overlayClassName: "delete-club-confirmation-popup"
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
        { field: "academicYear", headerName: "Academiic Year", flex: 0.1 },
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
        async function getAllfests() {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/clubs/members/${_id}`)
                setMembers(response.data.data)
            }
            catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
        getAllfests()
    }, [])
    return <AdminSetUp current={"clubs"} option={"members"} element={
        <section className="club-members">
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
                        academicYear:member.academicYear,
                        course:member.course.toUpperCase(),
                        branch:member.branch.toUpperCase(),
                    }
                })}
                sx={{ minHeight: "60vh", backgroundColor: "" }}
            />
            <div className="club_members_download_btns">
                <XlsxButton filename={`Club_Members`}
                    data={members && members.map((member, inx) => {
                        return {
                            AdmissionNo: member.admissionNo.toUpperCase(),
                            Name: `${member.personalInformation.firstname} ${member.personalInformation.lastname}`,
                            Degree:member.course.toUpperCase(),
                            Branch:member.branch.toUpperCase(),
                            Academic_Year:member.academicYear,
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