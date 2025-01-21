import "./AcademicBooks.css"
import AdminSetUp from "../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { getAcademicBooks, adminDeleteAcademicBook } from "../../../../Actions/libraryAction"
import { useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';

import { FaExternalLinkAlt } from "react-icons/fa";
export default function AdminAllAcademicBooks() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { academicBooks, loading } = useSelector(state => state.academicBooks)
    const columns = [
        { field: "id", headerName: "Sl. No", flex: 0.1 },
        { field: "title", headerName: "Title", flex: 0.3 },
        { field: "subject", headerName: "Subject", flex: 0.3 },
        { field: "degree", headerName: "Degree", flex: 0.15 },
        { field: "branch", headerName: "Branch", flex: 0.15 },
        { field: "year", headerName: "Year", flex: 0.1 },
        { field: "sem", headerName: "Sem", flex: 0.1 },
        {
            field: "type", headerName: "Type", flex: 0.15,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div style={{ color: params.value == 'books' ? "green" : "blue" }}>{params.value == 'books' ? "Book" : "Paper"}</div>
                    )

                }
            }
        },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.25 },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-academicBooks-edit" onClick={() => navigate(`/admin/academicBooks/update/${params.value}`)}>
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
                        <div className="admin-all-academicBooks-delete" onClick={() => deleteacademicBookHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]
    const deleteacademicBookHandler = (academicBook) => {
        const options = {
            title: `Are You Sure You Want to Delete ${academicBook.title}?`,
            message: `This action will permanently delete the academicBook and all its associated content. Please confirm to complete the deletion.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => dispatch(adminDeleteAcademicBook(academicBook._id))
                },
                {
                    label: 'Cancel',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "delete-academicBook-confirmation-popup"
        };
        confirmAlert(options)
    }

    useEffect(() => {
        dispatch(getAcademicBooks(undefined, key))
    }, [])

    if (loading) {
        return <AdminSetUp current={"library"} option={"academicBooks"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"library"} option={"academicBooks"} element={
            <section className="admin-all-academicBooks-section">
                <div className="admin-all-academicBooks-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/admin/library?key=${key}`)
                        dispatch(getAcademicBooks(undefined, key))
                    }}>
                        <input type="text" id="fest_search" placeholder="AcademicBook..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="admin-all-academicBooks-grid">
                    <DataGrid
                        columns={columns}
                        rows={academicBooks && academicBooks.map((academicBook, inx) => {
                            return {
                                title: academicBook.title,
                                edit: academicBook._id,
                                delete: academicBook,
                                id: inx + 1,
                                createdAt: ConvertTime(academicBook.createdAt).split(",")[0],
                                subject: academicBook.subject,
                                degree: academicBook.degree.toUpperCase(),
                                branch: academicBook.branch.toUpperCase(),
                                year: academicBook.year,
                                sem: academicBook.sem,
                                type: academicBook.type,
                            }

                        })}
                        sx={{ minHeight: "60vh", backgroundColor: "" }}
                    />
                </div>
            </section>}
        />
    )
}