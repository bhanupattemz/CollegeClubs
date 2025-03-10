import "./Carousel.css";
import { useEffect, useState, useRef } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useSelector, useDispatch } from "react-redux";
import { getCarouselImgs } from "../../Actions/carouselImgsActions";
import { useNavigate } from "react-router-dom";

export default function Carousel() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imgNo, setImgNo] = useState(0);
    const leftbtn = useRef(null);
    const rightbtn = useRef(null);
    const carouselRef = useRef(null);
    const { carouselImgs } = useSelector(state => state.carouselImgs);
    const [len, setLen] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        if (len > 0 && !isHovering) {
            const intervalId = setInterval(() => {
                setImgNo(no => (no + 1) % len);
            }, 5000);
            return () => clearInterval(intervalId);
        }
    }, [len, isHovering]);

    useEffect(() => {
        const wrapper = carouselRef.current;
        if (wrapper) {
            wrapper.style.transform = `translateX(-${imgNo * 100}%)`;
        }
    }, [imgNo]);

    const carouselLeftbtnHandler = async () => {
        if (len > 0) {
            setImgNo(no => (no - 1 + len) % len);
            leftbtn.current.classList.add("carousel-btn-click");
            await sleep(300);
            leftbtn.current.classList.remove("carousel-btn-click");
        }
    };

    const carouselRightbtnHandler = async () => {
        if (len > 0) {
            setImgNo(no => (no + 1) % len);
            rightbtn.current.classList.add("carousel-btn-click");
            await sleep(300);
            rightbtn.current.classList.remove("carousel-btn-click");
        }
    };

    const handleDotClick = (index) => {
        setImgNo(index);
    };

    useEffect(() => {
        if (!carouselImgs) {
            dispatch(getCarouselImgs());
        }
    }, [dispatch, carouselImgs]);

    useEffect(() => {
        if (carouselImgs?.length > 0) {
            setImgNo(0);
            setLen(carouselImgs.length);
        }
    }, [carouselImgs]);

    return (
        <section>
            {carouselImgs && carouselImgs.length > 0 && (
                <section 
                    className="home-page-carousel"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div className="carousel-wrapper" ref={carouselRef}>
                        {carouselImgs.map((item, index) => (
                            <div
                                className="home-img-item"
                                key={index}
                                style={{ opacity: imgNo === index ? 1 : 0 }}
                            >
                                <img src={item.image.url} alt="carousel-image" />
                                {item.title && <div className="carousel-caption">{item.title}</div>}
                            </div>
                        ))}
                    </div>
                    <div className="home-img-item-indi">
                        {carouselImgs.map((_, index) => (
                            <div
                                key={index}
                                className={imgNo === index ? "active" : ""}
                                onClick={() => handleDotClick(index)}
                            ></div>
                        ))}
                    </div>
                    <div className={`home-page-carousel-btn ${isHovering ? 'visible' : ''}`}>
                        <div
                            className="left-btn"
                            onClick={carouselLeftbtnHandler}
                            ref={leftbtn}
                        >
                            <KeyboardArrowLeftIcon />
                        </div>
                        <div
                            onClick={() => {
                                if (carouselImgs[imgNo]?.link) {
                                    navigate(carouselImgs[imgNo].link != "undefined" ? carouselImgs[imgNo].link : "/");
                                }
                            }}
                            className="middle-carousel-anch"
                        ></div>
                        <div
                            className="right-btn"
                            onClick={carouselRightbtnHandler}
                            ref={rightbtn}
                        >
                            <KeyboardArrowRightIcon />
                        </div>
                    </div>
                    <div className="carousel-progress">
                        <div 
                            className="carousel-progress-bar" 
                            style={{ width: `${(imgNo + 1) / len * 100}%` }}
                        ></div>
                    </div>
                </section>
            )}
        </section>
    );
}