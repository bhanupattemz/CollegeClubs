import "./UpsertLetter.css"
import AdminSetup from "../AdminSetUp"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { GrView } from "react-icons/gr";
import PDFViewer from "../../../Announcements/PDFViewer/PDFViewer"
import { clearSuccess } from "../../../../Reducers/Letters/Letters"
import { adminCreateLetter } from "../../../../Actions/LettersActions"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loading from "../../../Loaders/Loading"
export default function Createletter() {
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
    const { loading, success } = useSelector(state => state.letters)
    const [pdfUrl, setPdfUrl] = useState()
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const fd = new FormData()
        fd.append("title", formData.title)
        fd.append("pdf", formData.pdf)
        fd.append("content", formData.content)
        fd.append("visibility", formData.visibility)
        dispatch(adminCreateLetter(fd))
    }
    useEffect(() => {
        if (success) {
            dispatch(clearSuccess())
            naviagte("/letters")
        }
    }, [success])
    if (loading) return <AdminSetup current={"a_l"} option={"l_Create"} element={<Loading />} />
    return (<AdminSetup current={"a_l"} option={"l_Create"} element={
        <form onSubmit={formSubmitHandler} className="Upsert-letter-form">
            <section className="Upsert-letter-section-1">
                <TextField
                    required
                    id="title"
                    label="Letter Title"
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
                    <span onClick={() => { setPdfUrl(URL.createObjectURL(formData.pdf)) }}><GrView /></span>
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
            <section className="Upsert-letter-section-2">
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
            <button className="Upsert-letter-btn">Submit</button>
            {pdfUrl &&
                <section className="Upsert-letter-view-section">
                    <button onClick={() => setPdfUrl(null)}>Close</button>
                    <PDFViewer url={pdfUrl} />
                </section>}
        </form>
    } />)
}