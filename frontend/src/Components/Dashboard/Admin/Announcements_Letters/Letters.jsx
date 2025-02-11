import "./Letters.css"
import AdminSetUp from "../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { getAllLetters, adminDeleteLetter } from "../../../../Actions/LettersActions"
import { useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';

import { FaExternalLinkAlt } from "react-icons/fa";
export default function AdminAllLetters() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { letters, loading } = useSelector(state => state.letters)
    const columns = [
        { field: "id", headerName: "Sl. No" },
        { field: "name", headerName: "letter Name", flex: 0.3 },
        { field: "content", headerName: "Content", flex: 0.2 },
        {
            field: "visibility", headerName: "Visibility", flex: 0.2,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div style={{ color: params.value == 'public' ? "green" : "red" }}>{params.value == 'public' ? "Public" : "Private"}</div>
                    )

                }
            }
        },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.2 },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-letters-edit" onClick={() => navigate(`/admin/letters/update/${params.value}`)}>
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
                        <div className="admin-all-letters-delete" onClick={() => deleteletterHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]
    const deleteletterHandler = (letter) => {
        const options = {
            title: `Are You Sure You Want to Delete ${letter.title}?`,
            message: `This action will permanently delete the letter and all its associated content. Please confirm to complete the deletion.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => dispatch(adminDeleteLetter(letter._id))
                },
                {
                    label: 'Cancel',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "delete-letter-confirmation-popup"
        };
        confirmAlert(options)
    }

    useEffect(() => {
        dispatch(getAllLetters(key))
    }, [])

    if (loading) {
        return <AdminSetUp current={"letters"} option={"all"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"a_l"} option={"letters"} element={
            <section className="admin-all-letters-section">
                <div className="admin-all-letters-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/admin/letters?key=${key}`)
                        dispatch(getAllLetters(key))
                    }}>
                        <input type="text" id="fest_search" placeholder="letter Name/Id..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="admin-all-letters-grid">
                    <DataGrid
                        columns={columns}
                        rows={letters && letters.map((letter, inx) => {
                            return {
                                name: letter.title,
                                content: letter.content,
                                edit: letter._id,
                                delete: letter,
                                id: inx + 1,
                                createdAt: ConvertTime(letter.date).split(",")[0],
                                visibility: letter.visibility
                            }

                        })}
                        sx={{ minHeight: "60vh", backgroundColor: "white", minWidth: "700px" }}
                    />
                </div>
            </section>}
        />
    )
}