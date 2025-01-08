import "./Announcements.css"
import { Link } from "react-router"
import { MdOutlineOpenInNew } from "react-icons/md";
import { MdTipsAndUpdates } from "react-icons/md";
import { getTopAnnoucements } from "../../Actions/annoucementsAction"
import { useDispatch, useSelector } from "react-redux"
import { Fragment, useEffect } from "react";
export default function Annoucements() {
    const dispatch = useDispatch()
    const { annoucements } = useSelector(state => state.annoucements)
    const { isauthenticate } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getTopAnnoucements())
    }, [])
    return (
        <div className="annoucements">
            <div className="annoucements-heading"><Link to="/announcements">Announcements <MdTipsAndUpdates /> </Link></div>
            <marquee className="annoucements-scroll">
                {annoucements && annoucements.length != 0 ? annoucements.map((item, inx) => {
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