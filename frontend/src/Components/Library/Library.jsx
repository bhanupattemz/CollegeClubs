import "./Library.css"
import Banner from "../Clubs/Banner"
import BookCard from "./BookCard"
import OpenLibraryBooks from "./OpenLibraryBooks"
import { Fragment, useEffect, useState } from "react"
import PDFViewer from "../Announcements/PDFViewer/PDFViewer"
import LibraryAcademicForm from "./LibraryAcademicForm"
import { useSelector } from "react-redux"
export default function Library() {
    const { academicBooks, loading } = useSelector(state => state.academicBooks)
    const [subjects, setSubjects] = useState([])
    const [pdfUrl, setPdfUrl] = useState(null)
    const [currentSubject, setCurrentSubject] = useState("all")
    useEffect(() => {
        if (academicBooks) {
            let data = []
            academicBooks.map((item) => {
                if (!(item.title in data)) {
                    data.push(item.title)
                }
            })
            setSubjects(data)
        }
    }, [academicBooks])
    return (
        <main className="library-main">
            {!pdfUrl &&
                <Fragment>
                    <section>
                        <Banner btnScroll={".random-section"}
                            btntext={"View Resources"}
                            discription={"Access valuable resources for learning and development. Enhance your knowledge and skills!"}
                            heading={"Digital Library"}
                            link={"https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"} />
                    </section>
                    <section className="resources-academic-pdfs-section">
                        <h2>Academic PDFs</h2>
                        <div className="resources-academic-pdfs">
                            <LibraryAcademicForm setCurrentSubject={setCurrentSubject} />
                            {loading &&
                                <div className="academic-loading-div">
                                    <div className="card-loading academic-books-loading"></div>
                                    <div className="card-loading academic-books-loading"></div>
                                    <div className="card-loading academic-books-loading"></div>
                                    <div className="card-loading academic-books-loading"></div>
                                </div>}
                            {academicBooks &&
                                <Fragment>
                                    <div className="resources-acedamic-result-filter">
                                        <h3>Resultant Study Materials and PDFs</h3>
                                        {subjects.length != 0 &&
                                            <div>
                                                <label htmlFor="subject">Filter By subject : </label>
                                                <select name="subject" id="subject" onChange={(e) => setCurrentSubject(e.target.value)}>
                                                    <option value="all">Select Subject</option>
                                                    {subjects.map((item, inx) => {
                                                        return <option key={inx} value={item}>{item}</option>
                                                    })}
                                                    <option value={"all"}>All</option>
                                                </select>
                                            </div>}
                                    </div>
                                    <div className="resources-academic-content">
                                        {academicBooks.map((item, inx) => {
                                            if (item.title == currentSubject || currentSubject == "all") {
                                                return (
                                                    <BookCard key={inx} setPdfUrl={setPdfUrl} data={item} />
                                                )
                                            }

                                        })}
                                    </div>
                                </Fragment>
                            }
                        </div>

                    </section>
                    <section className="random-section">

                    </section>
                    <section className="resource-general-section">
                        <OpenLibraryBooks setPdfUrl={setPdfUrl} />

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