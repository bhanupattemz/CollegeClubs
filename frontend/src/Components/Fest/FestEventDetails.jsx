import { useParams, useNavigate } from "react-router-dom"
import "./FestEventDetails.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getFestEventDetails } from "../../Actions/festActions"
import { ConvertTime } from "../Functionalities/functionalites"
import { MdDateRange } from "react-icons/md";
import Loading from "../Loaders/Loading"
import { FaMapLocationDot } from "react-icons/fa6";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { LiaCertificateSolid } from "react-icons/lia";
export default function FestEventDetails() {
    const { _id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { singleFestEvent, loading } = useSelector(state => state.singleFestEvent)
    const { user } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getFestEventDetails(_id))
    }, [_id])
    if (loading || !singleFestEvent) {
        return <Loading />
    }
    return (
        <main className="fest-evennt-details-main">
            <section className="fest-event-details-banner">
                <div className="fest-event-banner-details-content">
                    <h1>{singleFestEvent.name}</h1>
                    <div>
                        <p>{singleFestEvent.subheading}</p>
                    </div>

                    <div className="fest-event-registration-btn">
                        {new Date(singleFestEvent.registration.starting).getTime() < Date.now() && new Date(singleFestEvent.registration.ending).getTime() > Date.now() &&
                            (!singleFestEvent.members.includes(user ? user._id : null) &&
                                <button onClick={() => navigate(`/fest/register/${singleFestEvent._id}`)}>Register Now</button>)}
                    </div>
                </div>
                <div className="fest-event-banner-details-img">
                    <img src={singleFestEvent.image.url} alt="fest-event-img" />
                    <img src="https://res.cloudinary.com/delc5g3p5/image/upload/v1736399332/Clubs/yveiswpwf5yiorltdr6h.png" alt="degisn-img" />
                </div>
            </section>
            <section className="fest-event-description-section">
                <h2>Description</h2>
                <div>
                    <p>
                        {singleFestEvent.description}
                    </p>
                    <button className="fest-events-instrctions-pdf-btn"><a href={singleFestEvent.pdf.url} target="_blank">View Event Details & Instructions</a></button>

                </div>
            </section>
            <section>
                <h2>Event Details</h2>
                <div className="fest-event-details-page-details">
                    <div>
                        <h3><MdDateRange /> Date & time</h3>
                        <p> {ConvertTime(singleFestEvent.timings.starting)}</p>
                    </div>
                    <div>

                        <h3><FaMapLocationDot /> Location</h3>
                        <p> {singleFestEvent.venue.venueName} , {singleFestEvent.venue.landMark}</p>
                    </div>
                    <div>

                        <h3><RiMoneyRupeeCircleLine /> Amount</h3>
                        <p>Registration amount is ₹{singleFestEvent.amount}</p>
                    </div>
                </div>
            </section>
            <section>
                <h2>Conducted Clubs</h2>
                <div className="fest-event-conducted-clubs">
                    {singleFestEvent.conductedClub.map((item, inx) => {
                        return (
                            <div key={inx}>
                                <h3>{item.name}</h3>
                                <button onClick={() => navigate(`/clubs/${item._id}`)}>View Club</button>
                            </div>
                        )
                    })}
                </div>
            </section>
            {singleFestEvent.prizes &&
                <section>
                    <h2>Prizes</h2>
                    <div className="fest-event-prizes">
                        {singleFestEvent.prizes.map((item, inx) => {
                            return (
                                <div key={inx}>
                                    <h3>{item.name}</h3>
                                    {item.certificate && <p><LiaCertificateSolid /> Certificate</p>}
                                    {item.amount > 0 && <p><RiMoneyRupeeCircleLine /> ₹{item.amount}</p>}
                                </div>
                            )
                        })}
                    </div>
                </section>}
            {singleFestEvent.winner.length > 0 &&
                <section>
                    <h2>Winners</h2>
                    <div className="fest-event-winner">
                        {singleFestEvent.winner.map((item, inx) => {
                            return (
                                <div key={inx}>
                                    <h3>{item.name} -{inx + 1} Prize</h3>
                                    <div><b>College :</b> {item.college}</div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            }
        </main>
    )
}