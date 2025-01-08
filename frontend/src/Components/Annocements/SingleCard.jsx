import "./SingleCard.css"
import { ConvertTime } from "../Functionalities/functionalites"
import PDFViewer from "./PDFViewer/PDFViewer"
import { Fragment } from "react"
export default function SingleAnnounce({ data, setPdfUrl }) {

    return (
        <Fragment>
            {data &&
                <div className="singe-annoucement-card">
                    <div>
                        <h2>{data.title}</h2>
                        <p>Announced at {ConvertTime(data.date)}</p>
                    </div>
                    <div>
                        <p>{data.content} </p>
                        {data.pdf && <div className="single-annocement-btns">
                            <button onClick={() => setPdfUrl(data.pdf.url)}>View Announcement</button>
                            <button><a href={data.pdf.url} target="_blank">Download</a></button>
                        </div>}
                    </div>
                </div>}
        </Fragment>
    )
}