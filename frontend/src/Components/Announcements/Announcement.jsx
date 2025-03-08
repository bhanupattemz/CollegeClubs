import "./Announcements.css"
import SingleCard from "./SingleCard"
import { useSelector, useDispatch } from "react-redux"
import { getAllAnnouncements } from "../../Actions/announcementsAction"
import { Fragment, useEffect, useState } from "react"
import PDFViewer from "./PDFViewer/PDFViewer"
import Banner from "../Clubs/Banner"
export default function Annocement() {
    const dispatch = useDispatch()
    const [pdfUrl, setPdfUrl] = useState(null)
    let { announcements } = useSelector(state => state.announcements)
    useEffect(() => {
        dispatch(getAllAnnouncements())
    }, [])
    return (
        <main className="announcements-main">
            {!pdfUrl &&
                <Fragment>
                    <section>
                        <div className="announcement-heading">
                            <Banner btnScroll={".announcements-section"}  
                            btntext={"View Announcements"}
                            discription={"Stay informed with the latest updates and events. Check out the announcements from all our clubs."} 
                            heading={"Announcements"} 
                            link={"https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"} />
                        </div>
                    </section>
                    <section className="announcements-section">
                        {announcements && announcements.map((item, inx) => {
                            return (<SingleCard key={inx} data={item} setPdfUrl={setPdfUrl} />)
                        })}
                    </section>
                </Fragment>}
                {pdfUrl &&
                <section className="announcement-pdf-viewer-section">
                    <button onClick={() => setPdfUrl(null)}>Close</button>
                    <PDFViewer url={pdfUrl} />
                </section>}
        </main>
    )
}