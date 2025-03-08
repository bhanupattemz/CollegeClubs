import "./UpsertGallery.css"
import AdminSetup from "../AdminSetUp"
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
export default function CreateGallery() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [prev, setprev] = useState([])
    const { clubs, loading: ClubLoading } = useSelector(state => state.clubs)
    const { gallery, loading, success } = useSelector(state => state.gallery)
    const types = [
        { value: 'main', text: "Main Gallery" },
        { value: 'club', text: "Club Gallery" }
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
    const formSubmitHandler = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('type', formData.type);
        fd.append('occasion', formData.occasion);
        fd.append("captions", formData.captions)
        fd.append("club", formData.club)
        formData.images.forEach(image => {
            fd.append("images", image);
        });
        if (formData.type == "club" && !formData.club) {
            alert("require Club")
        }
        dispatch(adminCreateGallery(fd))
    }
    useEffect(() => {
        dispatch(getAllclubs())
    }, [])
    useEffect(() => {
        if (gallery && success) {
            dispatch(setMainGalleryFalse())
            if (formData.type == "club") {
                navigate(`/clubs/gallery/${formData.club}`)
            } else {
                navigate("/gallery")
            }

        }
    }, [success])
    if (ClubLoading || loading) return <AdminSetup current="gallery" option="Create" element={<Loading />} />
    return <AdminSetup current="gallery" option="Create" element={
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
                    value={formData.type}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            type: e.target.value,
                        }))
                    }
                >
                    {types.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.text}
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
                    {formData.type == "club" &&
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
                    }
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