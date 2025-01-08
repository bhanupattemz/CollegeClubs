import "./GalleryContainer.css"
import Masonry from "react-masonry-css";
import { ConvertTime } from "../Functionalities/functionalites"
import { RiClosedCaptioningAiFill } from "react-icons/ri";
export default function ({ data }) {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
    };
    return (
        <div className="gallery-container-page">
            <div className="gallery-container-heading">
                <h2>{data.occasion}</h2>
                <p>{ConvertTime(data.date).split(', ')[0]}</p>
            </div>
            <div className="gallery-container-caption">
                <p><span><RiClosedCaptioningAiFill/> </span>{data.captions}</p>
            </div>
            <div className="gallery-container-block">
                <div className="gallery-container-imgs">
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="masonry-grid"
                        columnClassName="masonry-grid_column"
                    >
                        {data.images.map((src, index) => (
                            <img key={index} src={src.url} alt={`club-Image-${index + 1}`} />
                        ))}
                    </Masonry>
                </div>
            </div>
        </div>
    )
}