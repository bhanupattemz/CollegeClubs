import "./AdminAllFests.css"
import AdminSetUp from "../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ConvertTime, BACKENDURL } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';
import axios from "axios"

import { toast } from "react-toastify";
import XlsxButton from "../../../Functionalities/XlsxButton"

export default function AdminAllFests() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [fests, setFests] = useState([])
    const [loading, setLoading] = useState(false)
    const [nextLoading, setNextLoading] = useState(false)
    const columns = [
        { field: "id", headerName: "Sl. No" },
        { field: "name", headerName: "Fest Name", flex: 0.2 },
        { field: "events", headerName: "Fest Events Count", flex: 0.1 },
        {
            field: "isActive", headerName: "Is Active", flex: 0.1,
            renderCell: (params) => {
                if (params) {
                    return (
                        <div style={params.value ? { color: "green" } : { color: "red" }}>{params.value ? "True" : "False"}</div>
                    )
                }
            }
        },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.15 },
        {
            field: "open", headerName: "Open", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-fests-edit" onClick={() => navigate(`/admin/fests/${params.value}`)}>
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
                        <div className="admin-all-fests-edit" onClick={() => navigate(`/admin/fests/update/${params.value}`)}>
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
                        <div className="admin-all-fests-delete" onClick={() => deletefestHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]
    const deletefestHandler = (fest) => {
        const options = {
            title: `Are You Sure You Want to Delete ${fest.name}?`,
            message: `This action will permanently delete the fest and all its associated content. Please confirm to complete the deletion.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: async () => {
                        setLoading(true)
                        try {
                            const response = await axiosInstance.delete(`/fest/${fest._id}`)
                            toast.success("Fest deleted successfully!")
                            setFests(response.data.data)
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
            overlayClassName: "delete-fest-confirmation-popup"
        };
        confirmAlert(options)
    }

    useEffect(() => {
        async function getAllfests() {
            try {
                setNextLoading(true)
                const response = await axiosInstance.get(`/fest/all?key=${key}`)
                setFests(response.data.data)
            }
            catch (err) {
                console.log(err)
            }
            setNextLoading(false)
        }
        getAllfests()
    }, [])

    if (nextLoading) {
        return <AdminSetUp current={"fests"} option={"all"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"fests"} option={"all"} element={
            <section className="admin-all-fests-section">
                <div className="admin-all-fests-search">
                    <form onSubmit={async (e) => {
                        e.preventDefault();
                        try {
                            setLoading(true)
                            const response = await axiosInstance.get(`/fest/all?key=${key}`)
                            setFests(response.data.data)
                        } catch (err) {
                            console.log(err)
                        }
                        setLoading(false)
                        navigate(`/admin/fests?key=${key}`)
                    }}>
                        <input type="text" id="fest_search" placeholder="fest Name/Id..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="admin-all-fests-grid">
                    <div>
                        <DataGrid
                            columns={columns}
                            rows={fests && fests.map((fest, inx) => {
                                return {
                                    name: fest.name,
                                    edit: fest._id,
                                    delete: fest,
                                    events: fest.events.length,
                                    id: inx + 1,
                                    createdAt: ConvertTime(fest.createdAt).split(",")[0],
                                    isActive: fest.isactive,
                                    open: fest._id
                                }
                            })}
                            loading={loading}
                            sx={{ minHeight: "60vh", backgroundColor: "white", minWidth: "1200px" }}
                        />
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0px" }}>
                        <XlsxButton filename={"Fests"}
                            data={fests && fests.map((fest, inx) => {
                                return {
                                    Sl_No: inx + 1,
                                    Name: fest.name,
                                    Events: fest.events.length,
                                    IsActive: fest.isactive,
                                    CreatedAt: ConvertTime(fest.createdAt),
                                }
                            })}
                        />
                    </div>
                </div>
            </section>}
        />
    )
}