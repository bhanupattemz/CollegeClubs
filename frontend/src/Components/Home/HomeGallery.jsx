import { useEffect, useState } from "react";
import "./HomeGallery.css"
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getMainGallery } from "../../Actions/GalleryAction"
export default function HomeGallery() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [images, setimages] = useState([])
    const { gallery } = useSelector(state => state.gallery)
    const breakpointColumnsObj = {
        default: 4,
        1100: 4,
        700: 3,
        500: 2,
    };
    useEffect(() => {
        if (!gallery) {
            dispatch(getMainGallery())
        }
    }, [])
    useEffect(() => {
        if (gallery) {
            let a = images.length
            for (let data of gallery) {
                let rnd = Math.floor(Math.random() * data.images.length)
                a += rnd
                if (a > 5) {
                    break
                }
                setimages(prev => [...prev, ...data.images.slice(rnd)])
            }
        }

    }, [gallery])
    return (
        <div className="home-gallery-main">
            <h2>Our Gallery</h2>
            <div className="home-gallery-imgs">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {images.map((src, index) => (
                        <img key={index} src={src.url} alt={`Image ${index + 1}`} />
                    ))}
                </Masonry>
            </div>
            <button onClick={() => { navigate('/gallery') }} className="home-gallery-btn">View More</button>
        </div>
    )
}