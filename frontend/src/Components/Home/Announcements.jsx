import "./Announcements.css"
import { Link } from "react-router"
import { MdOutlineOpenInNew } from "react-icons/md";
import { MdTipsAndUpdates } from "react-icons/md";
import { getAllAnnouncements } from "../../Actions/announcementsAction"
import { useDispatch, useSelector } from "react-redux"
import { Fragment, useEffect } from "react";
export default function Announcements() {
    const dispatch = useDispatch()
    const { announcements } = useSelector(state => state.announcements)
    const { isauthenticate } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getAllAnnouncements())
    }, [])
    return (
        <div className="announcements">
            <div className="announcements-heading"><Link to="/announcements">Announcements <MdTipsAndUpdates /> </Link></div>
            <marquee className="announcements-scroll">
                {announcements && announcements.length != 0 ? announcements.map((item, inx) => {
                    return <div key={inx}><Link to={`/announcements`}><MdOutlineOpenInNew /> {item.title}</Link></div>
                }) : <div> No announcements declared yet</div>
                }

            </marquee>
            <div className="login-btn">
                {!isauthenticate &&
                    <Fragment>
                        <button><Link to={"/signin"}>Sign In</Link></button>
                        <button><Link to={"/signup"}>Sign Up</Link></button>
                    </Fragment>}
            </div>
        </div>
    )
}