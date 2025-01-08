import "./ClubFestSection.css"
import { Fragment, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKENDURL, ConvertTime } from "../Functionalities/functionalites"

export default function ClubFestSection() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const mainRef = useRef(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (!data) {
            async function getCurrentFest() {
                try {
                    setLoading(true)
                    const response = await axiosInstance.get("/fest")
                    setData(response.data.data)
                }
                catch (err) {
                    console.log(err)
                }
                setLoading(false)
            }
            getCurrentFest()
        }
    }, [])
    useEffect(() => {
        if (mainRef.current && data) {
            mainRef.current.style.backgroundImage = `url(${data.image.url})`
        }
    }, [data])
    return (
        <Fragment>
            {!loading && data ?

                <div ref={mainRef} className="clubs-fest-main">
                    <h2>{data.name}</h2>
                    <div>
                        <p>
                            {data.description}
                        </p>

                        <button onClick={() => navigate('/fest')}>Explore Now</button>


                    </div>
                </div> :
                <div className="clubs-fest-main card-loading">
                </div>
            }
        </Fragment>
    )
}