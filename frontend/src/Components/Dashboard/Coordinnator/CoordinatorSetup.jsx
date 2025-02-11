import { Fragment, useEffect, useRef, useState } from "react"
import "./CoordinatorSetup.css"
import { useNavigate } from "react-router"
import { FaAngleLeft, FaAngleRight, FaDonate } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RiGalleryLine } from "react-icons/ri";
import { VscOrganization } from "react-icons/vsc";
import { MdEvent } from "react-icons/md";
export default function CoordinatorSetup({ current, element, option }) {
    const sideBarRef = useRef(null)
    const mainRef = useRef(null)
    const [open, setopen] = useState(window.innerWidth < 600)
    const navigate = useNavigate()
    const closeBtnClickHandle = () => {
        if (mainRef.current && sideBarRef.current) {
            sideBarRef.current.style.width = "0%"
            mainRef.current.style.width = "100%"
            setopen(true)
        }
    }
    const openBtnHandle = () => {
        let w = window.innerWidth < 1000 ? window.innerWidth < 600 ? 80 : 25 : 20
        if (mainRef.current && sideBarRef.current) {
            sideBarRef.current.style.width = `${w}%`
            mainRef.current.style.width = `${w != 80 ? 100 - w : 100}%`
            setopen(false)
        }
    }
    const currentStyles = {
        background: "linear-gradient(90deg, #0A5EB0, #327fcc,#659cd3, #8ebae6)",
        color: "white",
        borderRadius: "6px"
    }
    const optionStyles = {
        color: "#0A5EB0"
    }
    return (
        <Fragment>
            <main className="coordinator-dashboard-main">
                <aside className="coordinator-setup-aside" ref={sideBarRef}>
                    <div className="coordinator-close-btn"> <button onClick={closeBtnClickHandle}><FaAngleLeft /></button></div>
                    <img className="coordinator-setup-logo" src="https://res.cloudinary.com/delc5g3p5/image/upload/v1734195440/Clubs/lnczlvkkzy3cinwdxum5.png" alt="sca-log" />
                    <div>
                        <h2
                            style={current == "dashboard" ? currentStyles : null}
                            onClick={() => navigate('/coordinator/dashboard')}>
                            <MdDashboard /> Dashboard</h2>
                    </div>
                    <div>
                        <h2
                            style={current == "clubs" ? currentStyles : null}
                            onClick={() => navigate('/coordinator/clubs')}>
                            <VscOrganization /> Clubs</h2>
                        {current == "clubs" &&
                            <div className="coordinator-setup-item-options" >
                                <div style={option == "all" ? optionStyles : null} onClick={() => navigate('/coordinator/clubs')}>All Clubs</div>
                                {option == "update" && <div style={optionStyles} onClick={() => navigate('/coordinator/clubs')}>Update Club</div>}
                                {option == "members" && <div style={optionStyles} onClick={() => navigate('/coordinator/clubs')}>Club Members</div>}
                            </div>
                        }
                    </div>
                    <div>
                        <h2
                            style={current == "events" ? currentStyles : null}
                            onClick={() => navigate('/coordinator/events')}>
                            <MdEvent /> Events</h2>
                        {current == "events" &&
                            <div className="coordinator-setup-item-options" >
                                <div style={option == "all" ? optionStyles : null} onClick={() => navigate('/coordinator/events')}>All Events</div>
                                <div style={option == "create" ? optionStyles : null} onClick={() => navigate('/coordinator/events/create')}>Create Event</div>
                                {option == "update" && <div style={optionStyles} onClick={() => navigate('/coordinator/events')}>Update Event</div>}
                                {option == "members" && <div style={optionStyles} onClick={() => navigate('/coordinator/events')}>Event Members</div>}
                            </div>
                        }
                    </div>
                    <div>
                        <h2
                            style={current == "gallery" ? currentStyles : null}
                            onClick={() => navigate('/coordinator/gallery')}>
                            <RiGalleryLine /> Gallery</h2>
                        {current == "gallery" &&
                            <div className="coordinator-setup-item-options" >
                                <div style={option == "all" ? optionStyles : null} onClick={() => navigate('/coordinator/gallery')}>All Main Photos</div>
                                <div style={option == "Create" ? optionStyles : null} onClick={() => navigate('/coordinator/gallery/create')}>Create Gallery</div>
                                {option == "update" && <div style={optionStyles} onClick={() => navigate('/coordinator/gallerys')}>Update Gallery</div>}
                            </div>
                        }
                    </div>
                    <div>
                        <h2
                            style={current == "donations" ? currentStyles : null}
                            onClick={() => navigate('/coordinator/donations')}>
                            <FaDonate /> Donations</h2>
                    </div>
                </aside>
                <section className="coordinator-setup-section" ref={mainRef}>
                    {open && <div className="coordinator-open-btn"> <button onClick={openBtnHandle}><FaAngleRight /></button></div>}
                    {element}
                </section>
            </main>
        </Fragment>
    )
}