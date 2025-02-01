import AdminSetUp from "../AdminSetUp"
import "./UpsertCarousel.css"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { adminUpdateCarousel } from "../../../../Actions/carouselImgsActions"
import { clearSuccess } from "../../../../Reducers/CarouselReducer/CarouselReducer"
import Loading from "../../../Loaders/Loading"
import { useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from "@mui/material/TextField";
import axios from "axios";
import { BACKENDURL } from "../../../Functionalities/functionalites"
export default function CreateCarousel() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const { _id } = useParams()
    const naviagate = useNavigate()
    const dispatch = useDispatch()
    const [imgPrev, setImgPrev] = useState("https://res.cloudinary.com/dmvxvzb5n/image/upload/v1734244918/wi0eikz8kothojnupko4.jpg")
    const [formData, setFormData] = useState({})
    const { success, loading } = useSelector(state => state.carouselImgs)
    const [dataLoading, setDataLoading] = useState(false)
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

        if (!formData.image) {
            alert("Image is required")
        } else {
            const fd = new FormData()
            fd.append("heading", formData.heading)
            fd.append("content", formData.content)
            fd.append("image", formData.image)
            fd.append("link", formData.link)
            dispatch(adminUpdateCarousel(fd, _id))
        }
    }
    useEffect(() => {
        if (success) {
            dispatch(clearSuccess())
            naviagate("/admin/carousel")
        }
    }, [success])
    useEffect(() => {
        async function getletters() {
            try {
                setDataLoading(true)
                const response = await axiosInstance.get(`/carousel/${_id}`)
                const data = response.data.data
                console.log(data)
                setFormData({
                    heading: data.heading,
                    image: data.image,
                    content: data.content,
                    link: data.link
                })
                setImgPrev(data.image.url)
            } catch (err) {
                console.log(err)
            }
            setDataLoading(false)
        }
        if (_id) {
            getletters()
        }
    }, [_id])
    if (loading) return <AdminSetUp current={"carousel"} option={"update"} element={<Loading />} />
    return <AdminSetUp current={"carousel"} option={"update"} element={
        <form onSubmit={formSubmitHandler} className="Upsert-carousel-form">
            <img src={imgPrev} alt="image-prev" />
            <section >
                <TextField
                    id="heading"
                    label="Carousel Heading"
                    variant="outlined"
                    value={formData.heading}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            heading: e.target.value,
                        }))
                    }
                />
                <TextField
                    id="link"
                    label="Link"
                    variant="outlined"
                    value={formData.link}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            link: e.target.value,
                        }))
                    }
                />
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
                                    setImgPrev(reader.result);
                                }
                            };
                            reader.readAsDataURL(file);
                        }
                        }

                    />
                </Button>

            </section>
            <section>
                <TextField
                    id="content"
                    multiline
                    rows={3}
                    fullWidth
                    label="content"
                    variant="outlined"
                    value={formData.content}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            content: e.target.value,
                        }))
                    }
                />
            </section>
            <button className="Upsert-carousel-btn">Submit</button>
        </form>
    } />
}