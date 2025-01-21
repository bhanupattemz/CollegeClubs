import "./Donations.css"
import AdminSetUp from "../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { getAllDonors, adminDeleteDonar } from "../../../../Actions/donorsActions"
import { useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';

export default function AdminAlldonations() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { donars, loading } = useSelector(state => state.donars)
    const columns = [
        { field: "id", headerName: "Payment Id" },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "note", headerName: "Note", flex: 0.2 },
        { field: "mail", headerName: "Mail", flex: 0.3 },
        { field: "phone", headerName: "Mobile No", flex: 0.2 },
        { field: "club", headerName: "Club", flex: 0.2 },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.2 },
        { field: "amount", headerName: "Amount", flex: 0.15 },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-donations-edit" onClick={() => navigate(`/admin/donations/update/${params.value}`)}>
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
                        <div className="admin-all-donations-delete" onClick={() => deletedonationHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]
    const deletedonationHandler = (donation) => {
        const options = {
            title: `Are You Sure You Want to Delete ${donation.name}?`,
            message: `This action will permanently delete the donation and all its associated content. Please confirm to complete the deletion.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => dispatch(adminDeleteDonar(donation._id))
                },
                {
                    label: 'Cancel',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "delete-donation-confirmation-popup"
        };
        confirmAlert(options)
    }

    useEffect(() => {
        dispatch(getAllDonors(key))
    }, [])

    if (loading || !donars) {
        return <AdminSetUp current={"donations"} option={"all"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"donations"} option={"all"} element={
            <section className="admin-all-donations-section">
                <div className="admin-all-donations-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/admin/donations?key=${key}`)
                        dispatch(getAllDonors(key))
                    }}>
                        <input type="text" id="fest_search" placeholder="donation Name/Id..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="admin-all-donations-grid">
                    <DataGrid
                        columns={columns}
                        rows={donars && donars.map((donation, inx) => {
                            return {
                                name: donation.name,
                                note: donation.Note ? donation.Note : "No Note",
                                edit: donation._id,
                                delete: donation,
                                id: donation.paymentInfo ? donation.paymentInfo.paymentId : inx + 1,
                                createdAt: ConvertTime(donation.createdAt).split(",")[0],
                                amount: `₹${donation.amount}`,
                                club: donation.club ? donation.club.name : "General",
                                phone: donation.phone ? donation.phone : "Anonymous",
                                mail: donation.mail
                            }

                        })}
                        sx={{ minHeight: "60vh", backgroundColor: "" }}
                    />
                </div>
            </section>}
        />
    )
}