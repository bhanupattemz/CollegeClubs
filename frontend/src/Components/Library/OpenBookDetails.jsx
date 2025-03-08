import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import axios from "axios";
import "./OpenBookDetails.css"
import { ConvertTime } from "../Functionalities/functionalites"
import Loading from "../Loaders/Loading";
export default function OpenBookDetails() {
    const { key } = useParams();
    const [rating, setRating] = useState(null)
    const [book, setBook] = useState(null)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (key) {
            async function findBook() {
                setLoading(true)
                const respounds = await axios.get(`https://openlibrary.org/works/${key}.json`)
                setData(respounds.data)
                const data = await axios.get(`https://openlibrary.org/search.json?q=${respounds.data.title}&has_fulltext=true&fields=key,title,ia,ebook_access,author_name,cover_i,edition_count,edition_key`)
                for (let item of data.data.docs) {
                    if (item.title == respounds.data.title) {
                        setBook(item)
                        break
                    }
                }

                const ratingRespounds = await axios.get(`https://openlibrary.org/works/${key}/ratings.json`)
                setRating(ratingRespounds.data.summary)
                setLoading(false)
            }
            findBook()
        }
    }, [])
    return (
        <Fragment>
            {loading ? <Loading /> :
                <Fragment>
                    {book &&
                        <main className="book-details-main">
                            <section className="book-details-section">
                                <div className="book-details-img">
                                    <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}.jpg`} alt="book-cover" />
                                    <div className="book-details-btns">
                                        <a href={`https://archive.org/details/${book.ia[0]}/mode/2up?view=theater`} target="_blank">Read</a>
                                        <a href={`https://archive.org/download/${book.ia[0]}/${book.ia[0]}.pdf`} target="_blank">  Download</a>
                                    </div>
                                </div>
                                <div className="book-details-container">
                                    <h1>{book.title}</h1>
                                    <div className="book-details-author">
                                        - By <b>{book.author_name.join(", ")}</b>
                                    </div>
                                    {rating &&
                                        <div className="book-details-rating">
                                            <Stack spacing={1}>
                                                <Rating name="half-rating-read" defaultValue={Math.floor(rating.average * 10) / 10} precision={0.1} readOnly />
                                                <div>
                                                    <p>{Math.floor(rating.average * 10) / 10} <span>({rating.count} ratings)</span></p>
                                                </div>
                                            </Stack>

                                        </div>}

                                    <div className="book-details-description">
                                        <h3>Description</h3>
                                        <p>{typeof data.description == "object" ? data.description.value : data.description}</p>
                                    </div>
                                    <div className="book-details-publish">
                                        <div>
                                            <h3>Publish Date</h3>
                                            <p>{ConvertTime(data.created.value).split(",")[0]}</p>
                                        </div>
                                        {data.links &&
                                            <div>
                                                <h3>Publisher</h3>
                                                <p><a href={data.links[0].url} target="_blank">{data.links[0].title}</a></p>
                                            </div>
                                        }

                                        <div>
                                            <h3>Revision</h3>
                                            <p>{data.revision}</p>
                                        </div>
                                        <div>
                                            <h3>Latest Modified</h3>
                                            <p>{ConvertTime(data.last_modified.value).split(",")[0]}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </main>
                    }
                </Fragment>
            }
        </Fragment>
    )
}