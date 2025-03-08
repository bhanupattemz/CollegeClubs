import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./OpenLibraryBooks.css"
import { useNavigate } from "react-router-dom"
export default function OpenLibraryBooks({ setPdfUrl }) {
    const [query, setquery] = useState(null)
    const [books, setBooks] = useState(null)
    const navigate = useNavigate()
    const [openLoading, setOpenLoading] = useState(false)

    const searchBookSubmitHandler = (e) => {
        e.preventDefault()
        if (query && query.length != 0) {
            async function searchBook() {
                setOpenLoading(true)
                setBooks(null)
                const respounds = await axios.get(`https://openlibrary.org/search.json?q=${query.split(" ").join("+")}&has_fulltext=true&fields=key,title,ia,ebook_access,author_name,cover_i,edition_count,edition_key`)
                if (respounds.data && respounds.data.docs) {
                    let data = respounds.data.docs.filter((book) => {
                        return book.ebook_access == "public"
                    })
                    setBooks(data)
                }
                setOpenLoading(false)

            }
            searchBook()
        }
    }
    useEffect(() => {
        const findRadBooks = async () => {
            setOpenLoading(true)
            const respounds = await axios.get(`https://openlibrary.org/search.json?q=Science+and+Nature&has_fulltext=true&fields=key,title,ia,ebook_access,author_name,cover_i,edition_count,edition_key&limit=50`)
            if (respounds.data && respounds.data.docs) {
                let data = respounds.data.docs.filter((book) => {
                    return book.ebook_access == "public"
                })
                setBooks(data)
            }
            setOpenLoading(false)
        }
        if (!books) {
            findRadBooks()
        }
    }, [])
    return (
        <Fragment>
            <h2>Genaral Books</h2>
            <div className="open-library-books-container">
                <div className="open-library-search-form">
                    <form onSubmit={searchBookSubmitHandler}>
                        <input type="text" placeholder="Search for Books" onChange={(e) => setquery(e.target.value)} />
                        <button>Search</button>
                    </form>
                </div>

                <div className="open-library-books-data">
                    {openLoading &&
                        <Fragment>
                            <div className="card-loading open-card-loading"></div>
                            <div className="card-loading open-card-loading"></div>
                            <div className="card-loading open-card-loading"></div>
                            <div className="card-loading open-card-loading"></div>
                        </Fragment>
                    }
                    {books && books.length != 0 ? books.map((book, inx) => {
                        return (
                            <div key={inx} className="book-card-main">
                                <div className="book-card-img">
                                    <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`} alt="pdf-cover-page" />
                                </div>
                                <div>
                                    <h3>{book.title}</h3>
                                    <p className="open-libray-card-authors"><b>Authors :</b> {book.author_name.join(", ")}</p>
                                    <p><b>Edition count :</b> {book.edition_count}</p>
                                    <div className="books-card-btns">
                                        <button onClick={() => navigate(`/library${book.key}`)}>Explore Details</button>
                                        <button><a href={`https://archive.org/download/${book.ia[0]}/${book.ia[0]}.pdf`} target="_blank">Download</a></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <Fragment>{!openLoading &&
                        <div className="open-books-not-found">
                            <p>No results Found</p>
                        </div>

                    }</Fragment>}
                </div>
            </div>
        </Fragment>
    )
}