import "./UpsertFest.css"
import "../../../Home/ClubFestSection.css"
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import AdminSetUp from "../AdminSetUp";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { BACKENDURL } from "../../../Functionalities/functionalites"
import { styled } from '@mui/material/styles';
import Loading from "../../../Loaders/Loading";

import { toast } from "react-toastify";
export default function CreateFest() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const { _id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const [imgprev, setimgPrev] = useState("https://res.cloudinary.com/delc5g3p5/image/upload/v1736265076/s15xnqniqrijpszt4c6k.png")
    const isActive = [
        { value: true, text: "Active" },
        { value: false, text: "Inactive" }
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
    const formSubmitHandler = async (e) => {
        e.preventDefault()
        const fd = new FormData();
        fd.append('description', formData.description);
        fd.append('name', formData.name);
        fd.append('image', formData.image)
        fd.append('isActive', formData.isActive)
        try {
            setLoading(true)
            const response = await axiosInstance.put(`/fest/${_id}`, fd)
            toast.success("Fest updated successfully!")
            navigate("/admin/fests")
        } catch (err) {
            toast.error(err)
        }
        setLoading(false)
    }
    useEffect(() => {
        async function getfest() {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/fest/${_id}`)
                const data = response.data.data
                setFormData({
                    name: data.name,
                    isActive: data.isactive,
                    image: data.image,
                    description: data.description
                })
                console.log(data)
                setimgPrev(data.image.url)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
        if (_id) {
            getfest()
        }
    }, [_id])
    if (loading) return <AdminSetUp current={"fests"} option={"update-fest"} element={<Loading />} />
    return (<AdminSetUp current={"fests"} option={"update-fest"} element={
        <section className="Upsert-fest-main-section">
            <div style={{ backgroundImage: `url(${imgprev})` }} className="clubs-fest-main">
                <h2>{formData.name ? formData.name : "Fest Name"}</h2>
                <div>
                    <p>
                        {formData.description ? formData.description : "TechnoFest 2025 is an exciting annual festival celebrating innovation, technology, and creativity through hackathons, workshops, and competitions. "}
                    </p>

                    <button>Preview</button>


                </div>
            </div>
            <form className="Upsert-fest-form" onSubmit={formSubmitHandler} >
                <div>
                    <TextField
                        required
                        id="name"
                        label="Name"
                        variant="outlined"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                    <TextField
                        select
                        label="Active Fest"
                        value={formData.isActive}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                isActive: e.target.value,
                            }))
                        }
                    >
                        {isActive.map((option, inx) => (
                            <MenuItem key={inx} value={option.value}>
                                {option.text}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Image
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setFormData(prev => ({ ...prev, image: file }))
                                const reader = new FileReader();
                                reader.onload = () => {
                                    if (reader.readyState === 2) {
                                        setimgPrev(reader.result);
                                    }
                                };
                                reader.readAsDataURL(file);
                            }
                            }

                        />
                    </Button>
                </div>
                <TextField
                    required
                    id="description"
                    label="Description"
                    variant="outlined"
                    value={formData.description}
                    multiline
                    rows={3}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                />
                <button className="Upsert-fest-submit">Submit</button>
            </form>
        </section>
    } />)
}