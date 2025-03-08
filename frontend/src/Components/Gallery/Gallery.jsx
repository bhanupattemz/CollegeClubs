import "./Gallery.css"
import { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getMainGallery } from "../../Actions/GalleryAction"
import GalleryContainer from "./GalleryContainer"
import Banner from "../Clubs/Banner"
import Loading from "../Loaders/Loading"
export default function Gallery() {
    const dispatch = useDispatch()
    const { gallery, loading } = useSelector(state => state.gallery)
    useEffect(() => {
        dispatch(getMainGallery())
    }, [])
    return (
        <Fragment>
            {loading ? <Loading /> :
                <main>
                    <section>
                        <Banner discription={"Explore our vibrant gallery filled with memories and milestones."} heading={"Main Gallery"} link={"https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"} />
                    </section>
                    {gallery && gallery.length != 0 &&
                        <section className="main-gallery-section">
                            {gallery.map((item, inx) => <GalleryContainer data={item} />)}
                        </section>}
                </main>
            }
        </Fragment>
    )
}