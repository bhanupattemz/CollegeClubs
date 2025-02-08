
import AdminSetUp from "../../AdminSetUp"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { adminGetFestEventDetails } from "../../../../../Actions/festActions"
import axios from "axios"
import { toast } from "react-toastify";
import { BACKENDURL, ConvertTime } from "../../../../Functionalities/functionalites"
import { DataGrid } from "@mui/x-data-grid";
import { confirmAlert } from 'react-confirm-alert';
import { MdPersonRemove } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux"
import XlsxButton from "../../../../Functionalities/XlsxButton"
export default function EventMembers() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const dispatch = useDispatch()
    const { singleFestEvent, loading: festLoading } = useSelector(state => state.singleFestEvent)
    const { _id } = useParams()
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(false)
    const RemoveMemberHandler = (member) => {
        const options = {
            title: `Are You Sure You Want to Remove ${member.name}?`,
            message: `This action will permanently remove the member and all its associated content. Please confirm to complete remove.`,
            buttons: [
                {
                    label: 'Remove',
                    onClick: async () => {
                        try {
                            setLoading(true)
                            const response = await axiosInstance.put(`/fest/events/unregister/${_id}`, { member: member._id })
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
            overlayClassName: "delete-event-confirmation-popup"
        };
        confirmAlert(options)
    }

    const columns = [
        { field: "id", headerName: "Payment Id", flex: 0.2 },
        { field: "name", headerName: "Name", flex: 0.15 },
        { field: "college", headerName: "College", flex: 0.2 },
        { field: "mail", headerName: "Mail", flex: 0.2 },
        { field: "mobileNo", headerName: "Mobile No", flex: 0.15 },
        { field: "course", headerName: "Degree", flex: 0.1 },
        { field: "branch", headerName: "Branch", flex: 0.1 },
        { field: "gender", headerName: "Gender", flex: 0.1 },
        { field: "amount", headerName: "Amount", flex: 0.1 },
        { field: "status", headerName: "Payment Status", flex: 0.1 },
        { field: "createdAt", headerName: "Created At", flex: 0.15 },
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
        if (_id) {
            dispatch(adminGetFestEventDetails(_id))
        }
    }, [_id])
    useEffect(() => {
        if (singleFestEvent) {
            setMembers(singleFestEvent.members)
        }
    }, [singleFestEvent])
    return <AdminSetUp current={"fests"} option={"members"} element={
        <section className="event-members" style={{ margin: "20px 0px" }}>
            <DataGrid
                columns={columns}
                loading={loading || festLoading}
                rows={members && members.map((member, inx) => {
                    return {
                        name: member.name,
                        college: member.college,
                        remove: member,
                        mail: member.mail,
                        mobileNo: member.mobileNo,
                        gender: member.gender.toUpperCase(),
                        course: member.course.toUpperCase(),
                        branch: member.branch.toUpperCase(),
                        id: member.paymentInfo.paymentId,
                        amount: member.paymentInfo.amount,
                        status: member.paymentInfo.status.toUpperCase(),
                        createdAt: ConvertTime(member.createdAt)
                    }
                })}
                sx={{ minHeight: "60vh", backgroundColor: "" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0px" }}>
                <XlsxButton filename={`${singleFestEvent?.name}_Members`}
                    data={members && members.map((member, inx) => {
                        return {
                            PaymentId: member.paymentInfo.paymentId,
                            Name: member.name,
                            College: member.college,
                            Mail: member.mail,
                            MobileNo: member.mobileNo,
                            Course: member.course.toUpperCase(),
                            Branch: member.branch.toUpperCase(),
                            Academic_Year: member.academicYear,
                            Gender: member.gender.toUpperCase(),
                            Amount: member.paymentInfo.amount,
                            PaymentStatus: member.paymentInfo.status.toUpperCase(),
                            CreatedAt: ConvertTime(member.createdAt)
                        }

                    })}
                />
            </div>
        </section>
    } />
}