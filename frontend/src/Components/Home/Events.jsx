import "./Events.css"
import Timer from "./Timer"
import { useNavigate } from "react-router-dom"
import { Fragment } from "react"
import { ConvertTime } from "../Functionalities/functionalites"
import { useDispatch, useSelector } from "react-redux"
import { confirmAlert } from 'react-confirm-alert';
import { FaRegRegistered } from "react-icons/fa";
import { registerEvents, getAllEvents } from "../../Actions/EventAction"
export default function Events({ event }) {
    const dispatch = useDispatch()
    const options = {
        title: `Confirm Registration for ${event.name}`,
        message: `Confirm your registration for ${event.name} on ${ConvertTime(event.timings.starting).split(",")[0]}. Click 'Confirm' to proceed or 'Cancel' to stop.`,
        buttons: [
            {
                label: 'Confirm',
                onClick: async () => {
                    dispatch(registerEvents(event._id))
                }
            },
            {
                label: 'Cancel',

            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        overlayClassName: "register-event-confirmation-popup"
    };
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    const { loading, singleEvent } = useSelector(state => state.singleEvent)
    const registerEvent = async (e) => {
        if (!user) {
            console.log("must and should login To Register Event")
            navigate("/signin")
        } else {
            confirmAlert(options)
        }
    }
    return (
        <Fragment>
            {event && <div className="events">
                <div className="event-img">
                    <img src={event.image.url} alt="event-img" />
                    <div className="event-start-time">{ConvertTime(event.timings.starting)}</div>
                </div>
                <div className="event-body">
                    <div>
                        <h2>
                            {event.name} {event.members.includes(user ? user._id : null) && <span  style={{ color: "LightGreen" }}> <FaRegRegistered /></span>}
                        </h2>
                    </div>
                    <div>
                        <Timer time={event.registration.ending} />
                        <p>{event.description}</p>
                        <div className="event-btns">
                            <button onClick={e => navigate(`/events/${event._id}`)}>Explore More</button>
                            {new Date(event.registration.starting).getTime() < Date.now() && new Date(event.registration.ending).getTime() > Date.now() && 
                                (!event.members.includes(user ? user._id : null) &&
                                    <button disabled={loading} onClick={registerEvent}>Register Now</button>)}
                        </div>
                    </div>
                </div>
            </div>
            }
        </Fragment>


    )
}