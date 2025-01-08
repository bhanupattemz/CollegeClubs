import "./BooksCard.css"
export default function BookCard({ setPdfUrl, data }) {
    return (
        <div className="book-card-main">
            <div className="book-card-img">
                <img src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1734875456/iu3pm3dde8qgmu3pha5t.jpg" alt="pdf-cover-page" />
            </div>
            <div>
                <h3>{data.title}</h3>
                <div className="books-card-btns">
                    <button onClick={() => setPdfUrl(data.pdf.url)}>Read</button>
                    <button><a href={data.pdf.url} target="_blank">Download</a></button>
                </div>
            </div>
        </div>
    )
}