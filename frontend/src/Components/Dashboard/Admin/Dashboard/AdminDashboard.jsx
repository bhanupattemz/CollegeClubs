import AdminSetUp from "../AdminSetUp"
import "./AdminDashboard.css"
import { FaGlobe } from "react-icons/fa";
import { FaDonate } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { MdCelebration } from "react-icons/md";

import Donations from "./Charts/Donations";
import TopDonations from "./Charts/TopDonations";
import MembersData from "./Charts/MembersData";
import ClubEvents from "./Charts/ClubEvents"
import { BACKENDURL } from "../../../Functionalities/functionalites"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
export default function AdminDashBoard() {
    const [adminNumbers, setAdminNumbers] = useState([])
    const [numbersLoading, setNumbersLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const getAdminNumber = async () => {
            try {
                setNumbersLoading(true)
                const respounce = await axiosInstance.get("/admin/numbers")
                setAdminNumbers(respounce.data.data)
            } catch (err) {
                console.log(err)
            }
            setNumbersLoading(false)
        }
        getAdminNumber()
    }, [])
    return (
        <AdminSetUp current={"dashboard"} element={
            <section className="admin-dashboard">
                {numbersLoading ? <div className="admin-dashboard-numbers">
                    {[1, 2, 3, 4].map((inx) => {
                        return (
                            <div key={inx} className="admin-dashboard-numbers-card card-loading">

                            </div>
                        )
                    })}
                </div> :
                    <div className="admin-dashboard-numbers">
                        <div className="admin-dashboard-numbers-card" onClick={()=>navigate("/admin/clubs")}>
                            <div className="admin-dashboard-icons">
                                <FaGlobe />
                            </div>
                            <div>
                                <h2>Clubs</h2>
                                <p>Total Clubs: <b>{adminNumbers[0]}</b></p>
                            </div>
                        </div>
                        <div className="admin-dashboard-numbers-card" onClick={()=>navigate("/admin/donations")}>
                            <div>
                                <FaDonate />
                            </div>
                            <div>
                                <h2>Donation Sum</h2>
                                <p>Total Amount: <b>₹{adminNumbers[1]}</b></p>
                            </div>
                        </div>
                        <div className="admin-dashboard-numbers-card" onClick={()=>navigate("/admin/users")}>
                            <div>
                                <TiGroup />
                            </div>
                            <div>
                                <h2>Users</h2>
                                <p>Users count: <b>{adminNumbers[2]}</b></p>
                            </div>
                        </div>

                        <div className="admin-dashboard-numbers-card" onClick={()=>navigate("/admin/events")}>
                            <div>
                                <MdCelebration />
                            </div>
                            <div>
                                <h2>Events</h2>
                                <p>Conducted events: <b>{adminNumbers[3]}</b></p>
                            </div>
                        </div>

                    </div>}

                <div className="admin-dashboard-charts">
                    <div className="admin-dashboard-donations-chart">
                        <div className="admin-dashboard-heading">
                            <h2>Donations</h2>
                        </div>
                        <div className="admin-dashboard-chart">
                            <Donations />
                        </div>
                    </div>
                    <div className="admin-dashboard-top-donations-chart">
                        <TopDonations />
                    </div>

                    <div className="admin-dashboard-club-events">
                        <div className="admin-dashboard-heading">
                            <h2>Club Events</h2>
                        </div>
                        <div className="admin-dashboard-chart">
                            <ClubEvents />
                        </div>
                    </div>
                    <div className="admin-dashboard-members-data">
                        <div className="admin-dashboard-heading">
                            <h2>User Data</h2>
                        </div>
                        <div className="admin-dashboard-chart">
                            <MembersData />
                        </div>
                    </div>
                </div>
            </section>
        } />
    )
}