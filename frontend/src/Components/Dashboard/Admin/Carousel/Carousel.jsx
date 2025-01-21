import "./Carousel.css"
import AdminSetUp from "../AdminSetUp"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { getCarouselImgs, deleteCarouselImg } from "../../../../Actions/carouselImgsActions"
import { useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ConvertTime } from "../../../Functionalities/functionalites"
import { confirmAlert } from 'react-confirm-alert';
export default function AdminAllCarouselImgs() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { carouselImgs, loading } = useSelector(state => state.carouselImgs)
    const columns = [
        { field: "id", headerName: "Sl. No", flex: 0.1 },
        { field: "heading", headerName: "Heading", flex: 0.25 },
        { field: "content", headerName: "Content", flex: 0.3 },
        { field: "link", headerName: "Link", flex: 0.3 },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.2 },
        {
            field: "edit", headerName: "Edit", flex: 0.1,
            renderCell: (params) => {
                if (params.value) {
                    return (
                        <div className="admin-all-carouselImgs-edit" onClick={() => navigate(`/admin/carouselImgs/update/${params.value}`)}>
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
                        <div className="admin-all-carouselImgs-delete" onClick={() => deletecarouselImgHandler(params.value)}>
                            <MdDelete />
                        </div>
                    )

                }
            }
        },
    ]
    const deletecarouselImgHandler = (carouselImg) => {
        const options = {
            title: `Are You Sure You Want to Delete "${carouselImg.heading}" Images?`,
            message: `This action will permanently delete the carouselImg and all its associated content. Please confirm to complete the deletion.`,
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => dispatch(deleteCarouselImg(carouselImg._id))
                },
                {
                    label: 'Cancel',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            overlayClassName: "delete-carouselImg-confirmation-popup"
        };
        confirmAlert(options)
    }

    useEffect(() => {
        dispatch(getCarouselImgs(key))
    }, [])

    if (loading) {
        return <AdminSetUp current={"carousel"} option={"all"} element={<Loading />} />
    }

    return (
        <AdminSetUp current={"carousel"} option={"all"} element={
            <section className="admin-all-carouselImgs-section">
                <div className="admin-all-carouselImgs-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/admin/carousel?key=${key}`)
                        dispatch(getCarouselImgs(key))
                    }}>
                        <input type="text" id="fest_search" placeholder="carouselImg..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="admin-all-carouselImgs-grid">
                    <DataGrid
                        columns={columns}
                        rows={carouselImgs && carouselImgs.map((carouselImg, inx) => {
                            return {
                                heading: carouselImg.heading,
                                content: carouselImg.content,
                                edit: carouselImg._id,
                                delete: carouselImg,
                                id: inx + 1,
                                createdAt: ConvertTime(carouselImg.createdAt).split(",")[0],
                                link: carouselImg.link
                            }

                        })}
                        sx={{ minHeight: "60vh", backgroundColor: "" }}
                    />
                </div>
            </section>}
        />
    )
}