import "./UpsertAnnouncement.css"
import AdminSetup from "../AdminSetUp"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import PDFViewer from "../../../Announcements/PDFViewer/PDFViewer"
import { setAnnounceSuccessFalse, adminUpdateAnnouncement } from "../../../../Actions/announcementsAction"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../../Loaders/Loading"

import axios from "axios";
import { BACKENDURL } from "../../../Functionalities/functionalites"
export default function CreateAnnouncement() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const { _id } = useParams()
    const [formData, setFormData] = useState({})
    const visibility = [
        { value: "public", text: "Public" },
        { value: "private", text: "Private" }
    ]
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const naviagte = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { success, loading: annLoading } = useSelector(state => state.announcements)
    const [pdfUrl, setPdfUrl] = useState()
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const fd = new FormData()
        fd.append("title", formData.title)
        fd.append("pdf", formData.pdf)
        fd.append("content", formData.content)
        fd.append("visibility", formData.visibility)
        dispatch(adminUpdateAnnouncement(fd, _id))
    }
    useEffect(() => {
        if (success) {
            dispatch(setAnnounceSuccessFalse())
            naviagte("/admin/announcements")
        }
    }, [success])
    useEffect(() => {
        async function getAnnouncements() {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/announcements/${_id}`)
                const data = response.data.data
                setFormData({
                    title: data.title,
                    pdf: data.pdf,
                    content: data.content,
                    visibility: data.visibility
                })
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
        if (_id) {
            getAnnouncements()
        }
    }, [_id])
    if (loading || annLoading) return <AdminSetup current={"a_l"} option={"a_Update"} element={<Loading />} />
    return (<AdminSetup current={"a_l"} option={"a_Update"} element={
        <form onSubmit={formSubmitHandler} className="Upsert-ann-form">
            <section className="Upsert-ann-section-1">
                <TextField
                    required
                    id="title"
                    label="Announcement Title"
                    variant="outlined"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }
                />
                <TextField
                    required
                    select
                    label="Visibility"
                    value={formData.visibility}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            visibility: e.target.value,
                        }))
                    }
                >
                    {visibility.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.text}
                        </MenuItem>
                    ))}
                </TextField>
                <div className="upload-pdf-btn">
                    <span onClick={() => { setPdfUrl(formData.pdf.url ? formData.pdf.url : URL.createObjectURL(formData.pdf)) }}><GrView /></span>
                    <Button
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload PDF
                        <VisuallyHiddenInput
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setFormData(prev => ({ ...prev, pdf: file }))
                            }
                            }

                        />
                    </Button>
                </div>
            </section>
            <section className="Upsert-ann-section-2">
                <TextField
                    required
                    id="content"
                    label="content"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={formData.content}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            content: e.target.value,
                        }))
                    }
                />
            </section>
            <button className="Upsert-ann-btn">Submit</button>
            {pdfUrl &&
                <section className="Upsert-ann-view-section">
                    <button onClick={() => setPdfUrl(null)}>Close</button>
                    <PDFViewer url={pdfUrl} />
                </section>}
        </form>
    } />)
}