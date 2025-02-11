import "./ClubGallery.css"
import CoordinatorSetup from "../CoordinatorSetup"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { getCoordinatorGallery, coordinatorDeleteGallery } from "../../../../Actions/GalleryAction"
import { useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';

export default function ClubGallery() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { clubGallery, loading } = useSelector(state => state.clubGallery)
    const columns = [
        { field: "id", headerName: "Sl. No" },
        { field: "name", headerName: "Occasion", flex: 0.2 },
        { field: "captions", headerName: "Captions", flex: 0.4 },
        {
            field: "club", headerName: "Club", flex: 0.2,
            renderCell: (params) => {
                if (params.value) {
                    return <div style={{ color: params.value == "Admin" ? "blue" : "orange" }}>{params.value == "Admin" ? params.value : params.value.name}</div>

                }
            }
        },
        { field: "date", headerName: "Date", flex: 0.2 },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="coordinator-club-gallery-edit" onClick={() => navigate(`/coordinator/gallery/update/${params.value}`)}>
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
                        <div className="coordinator-club-gallery-delete" onClick={() => deletegalleryHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]
    const deletegalleryHandler = (gallery) => {
        const options = {
            title: `Are You Sure You Want to Delete '${gallery.occasion}' Images?`,
            message: `This action will permanently delete the gallery and all its associated content. Please confirm to complete the deletion.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => {
                        navigate("/coordinator/gallery")
                        dispatch(coordinatorDeleteGallery(gallery._id))
                        
                    }
                },
                {
                    label: 'Cancel',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "delete-gallery-confirmation-popup"
        };
        confirmAlert(options)
    }

    useEffect(() => {
        dispatch(getCoordinatorGallery(key))
    }, [])

    if (loading) {
        return <CoordinatorSetup current={"gallery"} option={"all"} element={<Loading />} />
    }

    return (
        <CoordinatorSetup current={"gallery"} option={"all"} element={
            <section className="coordinator-club-gallery-section">
                <div className="coordinator-club-gallery-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/coordinator/gallery?key=${key}`)
                        dispatch(getCoordinatorGallery(key))
                    }}>
                        <input type="text" id="fest_search" placeholder="Occasion/captions" value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="coordinator-club-gallery-grid">
                    <DataGrid
                        columns={columns}
                        rows={clubGallery && clubGallery.map((gallery, inx) => {
                            return {
                                name: gallery.occasion,
                                edit: gallery._id,
                                delete: gallery,
                                id: inx + 1,
                                date: ConvertTime(gallery.date).split(",")[0],
                                captions: gallery.captions,
                                club: gallery.club ? gallery.club : "Admin"
                            }

                        })}
                        sx={{ minHeight: "60vh", backgroundColor: "white",minWidth:"1000px" }}
                    />
                </div>
            </section>}
        />
    )
}