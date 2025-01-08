import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { data, useNavigate } from "react-router-dom"
import { getFestEvents } from "../../Actions/festActions"
import Loading from "../Loaders/Loading"
import Event from "./Events"

import axios from "axios"
import { BACKENDURL, ConvertTime } from "../Functionalities/functionalites"
export default function Fest() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const [fest, setFest] = useState()
    const [festLoading, setFestLoading] = useState(false)
    const dispatch = useDispatch()
    const { festEvents, loading } = useSelector(state => state.festEvents)
    useEffect(() => {
        if (!festEvents) {
            dispatch(getFestEvents())
        }
        if (!fest) {
            async function getCurrentFest() {
                try {
                    setFestLoading(true)
                    const response = await axiosInstance.get("/fest")
                    setFest(response.data.data)
                }
                catch (err) {
                    console.log(err)
                }
                setFestLoading(false)
            }
            getCurrentFest()
        }
    }, [])


    if (loading || festLoading) {
        return <Loading />
    }
    return (
        <main>
            <section>
                {fest && festEvents && festEvents.length > 0 ?
                    <Fragment>
                        {festEvents.map((item, inx) => {
                            return (
                                <Event key={inx} event={item} registration={fest.registration} />
                            )
                        })}
                    </Fragment> :
                    <div>
                        not found
                    </div>}
            </section>
        </main>
    )
}