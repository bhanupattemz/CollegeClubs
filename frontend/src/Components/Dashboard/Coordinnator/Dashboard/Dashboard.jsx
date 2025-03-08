import CoordinatorSetup from "../CoordinatorSetup"
import "./Dashboard.css"
import { FaGlobe } from "react-icons/fa";
import { FaDonate } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { MdCelebration } from "react-icons/md";

import Donations from "./Charts/Donations";
import TopDonations from "./Charts/TopDonations";
import MembersData from "./Charts/MembersData.jsx";
import ClubEvents from "./Charts/ClubEvents"

import { BACKENDURL } from "../../../Functionalities/functionalites"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
export default function coordinatorDashBoard() {
    const [coordinatorNumbers, setcoordinatorNumbers] = useState([])
    const [numbersLoading, setNumbersLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const getcoordinatorNumber = async () => {
            try {
                setNumbersLoading(true)
                const respounce = await axiosInstance.get("/coordinator/numbers")
                setcoordinatorNumbers(respounce.data.data)
            } catch (err) {
                console.log(err)
            }
            setNumbersLoading(false)
        }
        getcoordinatorNumber()
    }, [])
    return (
        <CoordinatorSetup current={"dashboard"} element={
            <section className="coordinator-dashboard">
                {numbersLoading ? <div className="coordinator-dashboard-numbers">
                    {[1, 2, 3, 4].map((inx) => {
                        return (
                            <div key={inx} className="coordinator-dashboard-numbers-card card-loading">

                            </div>
                        )
                    })}
                </div> :
                    <div className="coordinator-dashboard-numbers">
                        <div className="coordinator-dashboard-numbers-card" onClick={() => navigate("/coordinator/clubs")}>
                            <div className="coordinator-dashboard-icons">
                                <FaGlobe />
                            </div>
                            <div>
                                <h2>Managed Clubs</h2>
                                <p>Total managed Clubs: <b>{coordinatorNumbers[0]}</b></p>
                            </div>
                        </div>
                        <div className="coordinator-dashboard-numbers-card" onClick={() => navigate("/coordinator/donations")}>
                            <div>
                                <FaDonate />
                            </div>
                            <div>
                                <h2>Donations</h2>
                                <p>Total Amount: <b>₹{coordinatorNumbers[1]}</b></p>
                            </div>
                        </div>
                        <div className="coordinator-dashboard-numbers-card" onClick={() => navigate("/coordinator/clubs")}>
                            <div>
                                <TiGroup />
                            </div>
                            <div>
                                <h2>Members</h2>
                                <p>Total Club Members: <b>{coordinatorNumbers[2]}</b></p>
                            </div>
                        </div>

                        <div className="coordinator-dashboard-numbers-card" onClick={() => navigate("/coordinator/events")}>
                            <div>
                                <MdCelebration />
                            </div>
                            <div>
                                <h2>Events</h2>
                                <p>Conducted events: <b>{coordinatorNumbers[3]}</b></p>
                            </div>
                        </div>

                    </div>}

                <div className="coordinator-dashboard-charts">
                    <div className="coordinator-dashboard-donations-chart">
                        <div className="coordinator-dashboard-heading">
                            <h2>Donations</h2>
                        </div>
                        <div className="coordinator-dashboard-chart">
                            <Donations />
                        </div>
                    </div>
                    <div className="coordinator-dashboard-top-donations-chart">
                        <TopDonations />
                    </div>

                    <div className="coordinator-dashboard-club-events">
                        <div className="coordinator-dashboard-heading">
                            <h2>Club Events</h2>
                        </div>
                        <div className="coordinator-dashboard-chart">
                            <ClubEvents />
                        </div>
                    </div>
                    <div className="coordinator-dashboard-members-data">
                        <div className="coordinator-dashboard-heading">
                            <h2>User Data</h2>
                        </div>
                        <div className="coordinator-dashboard-chart">
                            <MembersData />
                        </div>
                    </div>
                </div>
            </section>
        } />
    )
}