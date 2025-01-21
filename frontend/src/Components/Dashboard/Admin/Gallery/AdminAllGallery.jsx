import "./AdminAllGallery.css"
import AdminSetUp from "../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { getAdminGalleryPhotos, deleteAdminGalleryPhotos } from "../../../../Actions/GalleryAction"
import { useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';

export default function AdminAllGallery() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { gallery, loading } = useSelector(state => state.gallery)
    const columns = [
        { field: "id", headerName: "Sl. No" },
        { field: "name", headerName: "Occasion", flex: 0.25 },
        { field: "captions", headerName: "Captions", flex: 0.4 },
        { field: "date", headerName: "Date", flex: 0.2 },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-gallery-edit" onClick={() => navigate(`/admin/gallery/update/${params.value}`)}>
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
                        <div className="admin-all-gallery-delete" onClick={() => deletegalleryHandler(params.value)}>
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
                    onClick: () => dispatch(deleteAdminGalleryPhotos(gallery._id))
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
        dispatch(getAdminGalleryPhotos(key))
    }, [])

    if (loading) {
        return <AdminSetUp current={"gallery"} option={"all"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"gallery"} option={"all"} element={
            <section className="admin-all-gallery-section">
                <div className="admin-all-gallery-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/admin/gallery?key=${key}`)
                        dispatch(getAdminGalleryPhotos(key))
                    }}>
                        <input type="text" id="fest_search" placeholder="Occasion/captions" value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="admin-all-gallery-grid">
                    <DataGrid
                        columns={columns}
                        rows={gallery && gallery.map((gallery, inx) => {
                            return {
                                name: gallery.occasion,
                                edit: gallery._id,
                                delete: gallery,
                                id: inx + 1,
                                date: ConvertTime(gallery.date).split(",")[0],
                                captions: gallery.captions
                            }

                        })}
                        sx={{ minHeight: "60vh", backgroundColor: "" }}
                    />
                </div>
            </section>}
        />
    )
}