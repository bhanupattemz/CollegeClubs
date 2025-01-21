import "./Letters.css"
import SingleCard from "../Announcements/SingleCard"
import { useSelector, useDispatch } from "react-redux"
import { getAllLetters } from "../../Actions/LettersActions"
import { Fragment, useEffect, useState } from "react"
import PDFViewer from "../Announcements/PDFViewer/PDFViewer"
import Banner from "../Clubs/Banner"
export default function Annocement() {
    const dispatch = useDispatch()
    const [pdfUrl, setPdfUrl] = useState(null)
    let { letters } = useSelector(state => state.letters)
    useEffect(() => {
        dispatch(getAllLetters())
    }, [])
    return (
        <main className="letters-main">
            {!pdfUrl &&
                <Fragment>
                    <section>
                        <div className="letters-heading">
                            <Banner btnScroll={".letters-section"}
                                btntext={"View Letters"}
                                discription={"Access official club communications and detailed letters. Stay informed and connected!"}
                                heading={"Official Letters"}
                                link={"https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"} />
                        </div>
                    </section>
                    <section className="letters-section">
                        {letters && letters.map((item, inx) => {
                            return (<SingleCard key={inx} data={item} setPdfUrl={setPdfUrl} />)
                        })}
                    </section>
                </Fragment>}
            {pdfUrl &&
                <section className="letters-pdf-viewer-section">
                    <button onClick={() => setPdfUrl(null)}>Close</button>
                    <PDFViewer url={pdfUrl} />
                </section>}
        </main>
    )
}