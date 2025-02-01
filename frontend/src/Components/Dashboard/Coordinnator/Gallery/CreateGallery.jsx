import "../../Admin/Gallery/UpsertGallery.css"
import CoordinatorSetup from "../CoordinatorSetup"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getAllclubs } from "../../../../Actions/clubsAction"
import { adminCreateGallery, setMainGalleryFalse } from "../../../../Actions/GalleryAction"
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CiBookmarkRemove } from "react-icons/ci";
import Loading from "../../../Loaders/Loading"
import { useNavigate } from "react-router";
import axios from "axios";
import { BACKENDURL } from "../../../Functionalities/functionalites"
export default function CreateGallery() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [prev, setprev] = useState([])
    const [clubs, setClubs] = useState([])
    const { clubs: allClubs, loading: ClubLoading } = useSelector(state => state.clubs)
    const { gallery, loading, success } = useSelector(state => state.gallery)
    const [createLoading, setCreateLoading] = useState(false)
    const { user } = useSelector(state => state.user)
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
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            images: prev.images ? [...prev.images, ...files] : [...files],
        }));
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setprev((prev) => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);
        });
    };
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        if (!formData.images || formData.images.length ==0) {
            alert("Atleast one Images is required.")
        } else {
            fd.append('occasion', formData.occasion);
            fd.append("captions", formData.captions)
            fd.append("club", formData.club)
            formData.images.forEach(image => {
                fd.append("images", image);
            });
            try {
                setCreateLoading(true)
                const respounce = await axiosInstance.post('/gallery/clubs', fd)
                navigate('/coordinator/gallery')
            } catch (err) {
                console.log(err)
            }
            setCreateLoading(false)
        }

    }
    useEffect(() => {
        dispatch(getAllclubs())
    }, [])
    useEffect(() => {
        if (allClubs && user) {
            setClubs(allClubs.filter((club) => {
                for (let coordinator of club.coordinators) {
                    if (coordinator.details == user._id) {
                        return club
                    }
                }
            }))
        }
    }, [allClubs, user])
    if (ClubLoading || loading || createLoading) return <CoordinatorSetup current="gallery" option="Create" element={<Loading />} />
    return <CoordinatorSetup current="gallery" option="Create" element={
        <form onSubmit={formSubmitHandler} className="Upsert-gallery-form">
            <section className="Upsert-gallery-section-1">
                <TextField
                    required
                    id="occasion"
                    variant="outlined"
                    label="Occasion"
                    value={formData.occasion}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            occasion: e.target.value,
                        }))
                    }
                />
                <TextField
                    required
                    select
                    label="Created Club"
                    value={formData.club}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            club: e.target.value,
                        }))
                    }
                >
                    {clubs && clubs.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </section>
            <section className="Upsert-gallery-section-2">
                <TextField
                    required
                    id="captions"
                    variant="outlined"
                    label="Caption"
                    value={formData.captions}
                    multiline
                    rows={3}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            captions: e.target.value,
                        }))
                    }
                />
            </section>
            <section className="Upsert-gallery-section-3">
                <div>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload Images
                        <VisuallyHiddenInput type="file" accept="image/*" multiple onChange={handleFileChange} />
                    </Button>
                </div>
                {prev.length > 0 ? <div className="create-club-images">
                    {prev.map((image, index) => {
                        return (
                            <div>
                                <img src={image} />
                                <span className="Upsert-gallery-remove-icon"
                                    onClick={() => {
                                        setFormData(prev => {
                                            const index = prev.images.findIndex(img => JSON.stringify(img) === JSON.stringify(image));
                                            return {
                                                ...prev,
                                                images: prev.images.filter((_, inx) => inx !== index)
                                            };
                                        });

                                        setprev(prev => prev.filter((_, inx) => inx !== index));
                                    }}

                                ><CiBookmarkRemove /></span>
                            </div>
                        )
                    })}
                </div> : <div className="create-club-no-images">No Selected Any Image</div>}
            </section>
            <Button type="submit" variant="contained" className="Upsert-gallery-submit-btn">Submit</Button>
        </form>
    } />
}