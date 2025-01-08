import "./Announcements.css"
import SingleCard from "./SingleCard"
import { useSelector, useDispatch } from "react-redux"
import { getAllAnnoucements } from "../../Actions/annoucementsAction"
import { Fragment, useEffect, useState } from "react"
import PDFViewer from "./PDFViewer/PDFViewer"
import Banner from "../Clubs/Banner"
export default function Annocement() {
    const dispatch = useDispatch()
    const [pdfUrl, setPdfUrl] = useState(null)
    let { annoucements } = useSelector(state => state.annoucements)
    useEffect(() => {
        dispatch(getAllAnnoucements())
    }, [])
    return (
        <main className="annocements-main">
            {!pdfUrl &&
                <Fragment>
                    <section>
                        <div className="annoucement-heading">
                            <Banner btnScroll={".annocements-section"}  
                            btntext={"View Announcements"}
                            discription={"Stay informed with the latest updates and events. Check out the announcements from all our clubs."} 
                            heading={"Announcements"} 
                            link={"https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"} />
                        </div>
                    </section>
                    <section className="annocements-section">
                        {annoucements && annoucements.map((item, inx) => {
                            return (<SingleCard key={inx} data={item} setPdfUrl={setPdfUrl} />)
                        })}
                    </section>
                </Fragment>}
                {pdfUrl &&
                <section className="annoucement-pdf-viewer-section">
                    <button onClick={() => setPdfUrl(null)}>Close</button>
                    <PDFViewer url={pdfUrl} />
                </section>}
        </main>
    )
}