import { Fragment, useEffect, useRef, useState } from "react"
import "./AdminSetUp.css"
import { useNavigate } from "react-router"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdCelebration } from "react-icons/md";
import { RiGalleryLine } from "react-icons/ri";
import { VscOrganization } from "react-icons/vsc";
import { MdEvent } from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoLibrary } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdViewCarousel } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { wait } from "../../Functionalities/functionalites"
import { FaFacebookMessenger, FaMessage } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
export default function AdminSetUp({ current, element, option }) {
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
            <main className="admin-dashboard-main">
                <aside className="admin-setup-aside" ref={sideBarRef}>
                    <div className="admin-close-btn"> <button onClick={closeBtnClickHandle}><FaAngleLeft /></button></div>
                    <img className="admin-setup-logo" src="https://res.cloudinary.com/dp6kibyv5/image/upload/v1740923438/clubs/psngpqiwqt2aiid6l2at.png" alt="clubs-log" />
                    <div>
                        <h2
                            style={current == "dashboard" ? currentStyles : null}
                            onClick={() => navigate('/admin/dashboard')}>
                            <MdDashboard /> Dashboard</h2>
                    </div>
                    <div>
                        <h2
                            style={current == "clubs" ? currentStyles : null}
                            onClick={() => navigate('/admin/clubs')}>
                            <VscOrganization /> Clubs</h2>
                        {current == "clubs" &&
                            <div className="admin-setup-item-options" >
                                <div style={option == "all" ? optionStyles : null} onClick={() => navigate('/admin/clubs')}>All Clubs</div>
                                <div style={option == "create" ? optionStyles : null} onClick={() => navigate('/admin/clubs/create')}>Create Club</div>
                                {option == "update" && <div style={optionStyles} onClick={() => navigate('/admin/clubs')}>Update Club</div>}
                                {option == "members" && <div style={optionStyles} onClick={() => navigate('/admin/clubs')}>Club Members</div>}
                            </div>
                        }
                    </div>
                    <div>
                        <h2
                            style={current == "events" ? currentStyles : null}
                            onClick={() => navigate('/admin/events')}>
                            <MdEvent /> Events</h2>
                        {current == "events" &&
                            <div className="admin-setup-item-options" >
                                <div style={option == "all" ? optionStyles : null} onClick={() => navigate('/admin/events')}>All Events</div>
                                <div style={option == "create" ? optionStyles : null} onClick={() => navigate('/admin/events/create')}>Create Event</div>
                                {option == "update" && <div style={optionStyles} onClick={() => navigate('/admin/events')}>Update Event</div>}
                                {option == "members" && <div style={optionStyles} onClick={() => navigate('/admin/events')}>Event Members</div>}
                            </div>
                        }
                    </div>
                    <div>
                        <h2
                            style={current == "fests" ? currentStyles : null}
                            onClick={() => navigate('/admin/fests')}>
                            <MdCelebration /> Fest</h2>
                        {current == "fests" &&
                            <div className="admin-setup-item-options" >
                                <div style={option == "all" ? optionStyles : null} onClick={() => navigate('/admin/fests')}>All fests</div>
                                <div style={option == "create" ? optionStyles : null} onClick={() => navigate('/admin/fests/create')}>Create fest</div>
                                {option == "update-fest" && <div style={optionStyles} onClick={() => navigate('/admin/fests')}>Update Fest</div>}
                                <div style={option == "all-events" ? optionStyles : null} onClick={() => navigate('/admin/fests/events')}>Fest Events</div>
                                <div style={option == "events-create" ? optionStyles : null} onClick={() => navigate('/admin/fests/events/create')}>Create Events</div>
                                {option == "update-event" && <div style={optionStyles} onClick={() => navigate('/admin/fests/events')}>Update Event</div>}
                                {option == "members" && <div style={optionStyles} onClick={() => navigate('/admin/fests/events')}>Event Members</div>}
                                <div style={option == "all-members" ? optionStyles : null} onClick={() => navigate('/admin/fests/members')}>Fest Members</div>
                            </div>
                        }
                    </div>
                    <div>
                        <h2
                            style={current == "gallery" ? currentStyles : null}
                            onClick={() => navigate('/admin/gallery')}>
                            <RiGalleryLine /> Gallery</h2>
                        {current == "gallery" &&
                            <div className="admin-setup-item-options" >
                                <div style={option == "all" ? optionStyles : null} onClick={() => navigate('/admin/gallery')}>All Main Photos</div>
                                <div style={option == "Create" ? optionStyles : null} onClick={() => navigate('/admin/gallery/create')}>Create Gallery</div>
                                {option == "update" && <div style={optionStyles} onClick={() => navigate('/admin/gallery')}>Update Gallery</div>}
                            </div>
                        }
                    </div>
                    <div>
                        <h2
                            style={current == "messages" ? currentStyles : null}
                            onClick={() => navigate('/admin/messages')}>
                            <MdMessage /> Messages And Feedbacks</h2>
                    </div>
                    <div>
                        <h2
                            style={current == "a_l" ? currentStyles : null}
                            onClick={() => navigate('/admin/announcements')}>
                            <TfiAnnouncement /> Announcements & letters</h2>

                        {current == "a_l" &&
                            <div className="admin-setup-item-options" >
                                <div style={option == "announcements" ? optionStyles : null} onClick={() => navigate('/admin/announcements')}>Announcements</div>
                                <div style={option == "a_Create" ? optionStyles : null} onClick={() => navigate('/admin/announcements/create')}>Create  Announcement</div>
                                {option == "a_Update" && <div style={optionStyles} onClick={() => navigate('/admin/announcements')}>Update Announcement</div>}
                                <div style={option == "letters" ? optionStyles : null} onClick={() => navigate('/admin/letters')}>Letters</div>
                                <div style={option == "l_Create" ? optionStyles : null} onClick={() => navigate('/admin/letters/create')}>Create Letter</div>
                                {option == "l_Update" && <div style={optionStyles} onClick={() => navigate('/admin/letters')}>Update Letter</div>}
                            </div>
                        }
                    </div>

                    <div>
                        <h2
                            style={current == "donations" ? currentStyles : null}
                            onClick={() => navigate('/admin/donations')}>
                            <FaDonate /> Donations</h2>
                        {current == "donations" &&
                            <div className="admin-setup-item-options" >
                                <div style={option == "all" ? optionStyles : null} onClick={() => navigate('/admin/donations')}>All Donations</div>
                                <div style={option == "Create" ? optionStyles : null} onClick={() => navigate('/admin/donations/create')}>Create Donation</div>
                                {option == "update" && <div style={optionStyles} onClick={() => navigate('/admin/letters')}>Update Donation</div>}
                            </div>
                        }
                    </div>

                    <div>
                        <h2
                            style={current == "library" ? currentStyles : null}
                            onClick={() => navigate('/admin/library')}>
                            <IoLibrary /> library</h2>
                        {current == "library" &&
                            <div className="admin-setup-item-options" >
                                <div style={option == "academicBooks" ? optionStyles : null} onClick={() => navigate('/admin/library')}>Academic Books</div>
                                <div style={option == "create" ? optionStyles : null} onClick={() => navigate('/admin/library/create')}>Create Academic Books</div>
                                {option == "update" && <div style={optionStyles} onClick={() => navigate('/admin/letters')}>Update Book</div>}
                            </div>
                        }
                    </div>
                    <div>
                        <h2
                            style={current == "carousel" ? currentStyles : null}
                            onClick={() => navigate('/admin/carousel')}>
                            <MdViewCarousel /> Carousel</h2>
                        {current == "carousel" &&
                            <div className="admin-setup-item-options" >
                                <div style={option == "all" ? optionStyles : null} onClick={() => navigate('/admin/carousel')}>Carousel Imgs</div>
                                <div style={option == "Create" ? optionStyles : null} onClick={() => navigate('/admin/carousel/create')}>Create Carousel Img</div>
                                {option == "update" && <div style={optionStyles} onClick={() => navigate('/admin/carousel')}>Update Carousel</div>}
                            </div>
                        }
                    </div>
                    <div>
                        <h2
                            style={current == "adminTeam" ? currentStyles : null}
                            onClick={() => navigate('/admin/administration_team')}>
                            <MdAdminPanelSettings /> Administration Team</h2>
                        {current == "adminTeam" &&
                            <div className="admin-setup-item-options" >
                                <div style={option == "all" ? optionStyles : null} onClick={() => navigate('/admin/administration_team')}>All Administration Team Members</div>
                                <div style={option == "Create" ? optionStyles : null} onClick={() => navigate('/admin/administration_team/create')}>Create Member</div>
                                {option == "update" && <div style={optionStyles} onClick={() => navigate('/admin/administration_team')}>Update Member</div>}
                            </div>}
                    </div>
                    <div className="">
                        <h2
                            style={current == "users" ? currentStyles : null}
                            onClick={() => navigate('/admin/users')}>
                            <HiUserGroup />Users</h2>
                        {current == "users" &&
                            <div className="admin-setup-item-options" >
                                <div style={option == "all" ? optionStyles : null} onClick={() => navigate('/admin/users')}>All Users</div>
                                {option == "update-user" && <div style={optionStyles} onClick={() => navigate('/admin/users')}>Update User</div>}
                                <div style={option == "past-all" ? optionStyles : null} onClick={() => navigate('/admin/past_team')}>All Past Members</div>
                                <div style={option == "past-create" ? optionStyles : null} onClick={() => navigate('/admin/past_team/create')}>Create Past Member</div>
                            </div>}
                    </div>

                </aside>
                <section className="admin-setup-section" ref={mainRef}>
                    {open && <div className="admin-open-btn"> <button onClick={openBtnHandle}><FaAngleRight /></button></div>}
                    {element}
                </section>
            </main>
        </Fragment>
    )
}