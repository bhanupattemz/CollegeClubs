import "./UpsertBook.css"
import AdminSetup from "../AdminSetUp"
import { adminCreateAdademicBook } from "../../../../Actions/libraryAction"
import { clearSuccess } from "../../../../Reducers/Library/AcademicBooks"
import { GrView } from "react-icons/gr";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Fragment, useEffect, useState } from "react"
import PDFViewer from "../../../Announcements/PDFViewer/PDFViewer";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux"
import Loading from "../../../Loaders/Loading"
export default function CreateBook() {
    const [pdfUrl, setPdfUrl] = useState()
    const naviagate = useNavigate()
    const dispatch = useDispatch()
    const { loading, success } = useSelector(state => state.academicBooks)
    const [formData, setFormData] = useState({
        degree: undefined,
        branch: undefined,
        year: undefined,
        sem: undefined,
        type: undefined,
        subject: undefined
    });
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
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (!formData.pdf) {
            alert("pdf is  required")
        } else {
            const fd = new FormData()
            fd.append("degree", formData.degree);
            fd.append("branch", formData.branch);
            fd.append("year", formData.year);
            fd.append("sem", formData.sem);
            fd.append("type", formData.type);
            fd.append("subject", formData.subject);
            fd.append("pdf", formData.pdf);
            fd.append("title", formData.title);
            dispatch(adminCreateAdademicBook(fd))
        }

    }
    useEffect(() => {
        if (success) {
            dispatch(clearSuccess())
            naviagate("/admin/library")
        }
    }, [success])
    if (loading) return <AdminSetup current={"library"} option={"create"} element={<Loading />} />
    return <AdminSetup current={"library"} option={"create"} element={
        <Fragment>
            <form onSubmit={formSubmitHandler} className="Upsert-book-form">
                <section >
                    <TextField
                        required
                        id="title"
                        label="Title"
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
                        id="subject"
                        label="subject"
                        value={formData.subject}
                        variant="outlined"
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                subject: e.target.value,
                            }))
                        }
                    />
                    <FormControl margin="normal">
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={formData.type || ""}
                            onChange={e => setFormData(prev => ({ ...prev, type: e.target.value === "Remove" ? undefined : e.target.value }))}
                        >
                            <MenuItem value="">{formData.type ? "Remove" : "Select Type"}</MenuItem>
                            <MenuItem value="books">Books PDFs</MenuItem>
                            <MenuItem value="papers">Question Papers</MenuItem>
                        </Select>
                    </FormControl>
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
                <section>


                    <FormControl margin="normal">
                        <InputLabel>Degree</InputLabel>
                        <Select
                            value={formData.degree || ""}
                            onChange={e => setFormData(prev => ({ ...prev, degree: e.target.value === "Remove" ? undefined : e.target.value }))}
                        >
                            <MenuItem value="">{formData.degree ? "Remove" : "Select Degree"}</MenuItem>
                            <MenuItem value="btech">B-Tech</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl margin="normal">
                        <InputLabel>Branch</InputLabel>
                        <Select
                            value={formData.branch || ""}
                            onChange={e => setFormData(prev => ({ ...prev, branch: e.target.value === "Remove" ? undefined : e.target.value }))}
                        >
                            <MenuItem value="">{formData.branch ? "Remove" : "Select Branch"}</MenuItem>
                            <MenuItem value="cse">CSE</MenuItem>
                            <MenuItem value="ece">ECE</MenuItem>
                            <MenuItem value="eee">EEE</MenuItem>
                            <MenuItem value="civil">Civil</MenuItem>
                            <MenuItem value="mech">Mech</MenuItem>
                            <MenuItem value="chem">Chem</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl margin="normal">
                        <InputLabel>Year</InputLabel>
                        <Select
                            value={formData.year || ""}
                            onChange={e => setFormData(prev => ({ ...prev, year: e.target.value === "Remove" ? undefined : e.target.value }))}
                        >
                            <MenuItem value="">{formData.year ? "Remove" : "Select Year"}</MenuItem>
                            <MenuItem value="1">1st Year</MenuItem>
                            <MenuItem value="2">2nd Year</MenuItem>
                            <MenuItem value="3">3rd Year</MenuItem>
                            <MenuItem value="4">4th Year</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl margin="normal">
                        <InputLabel>Semester</InputLabel>
                        <Select
                            value={formData.sem || ""}
                            onChange={e => setFormData(prev => ({ ...prev, sem: e.target.value === "Remove" ? undefined : e.target.value }))}
                        >
                            <MenuItem value="">{formData.sem ? "Remove" : "Select Semester"}</MenuItem>
                            <MenuItem value="1">1st Sem</MenuItem>
                            <MenuItem value="2">2nd Sem</MenuItem>
                        </Select>
                    </FormControl>
                </section>
                <button className="Upsert-book-submit-btn">Submit</button>
            </form>
            {pdfUrl &&
                <section className="create-letter-view-section">
                    <button onClick={() => setPdfUrl(null)}>Close</button>
                    <PDFViewer url={pdfUrl} />
                </section>}
        </Fragment>

    } />
}