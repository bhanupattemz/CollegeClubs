import './Numbers.css';
import { FaGlobe, FaUserTie } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import CountUp from "react-countup";
import { BACKENDURL } from "../Functionalities/functionalites"
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
export default function Numbers() {
    const [data, setData] = useState()
    const [startCount, setStartCount] = useState(false);
    const numbersRef = useRef(null);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setStartCount(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (numbersRef.current) {
            observer.observe(numbersRef.current);
        }

        return () => {
            if (numbersRef.current) {
                observer.unobserve(numbersRef.current);
            }
        };
    }, []);
    useEffect(() => {
        if (!data) {
            async function getscaNumber() {
                setLoading(true)
                try {
                    const response = await axiosInstance.get("/sca-numbers")
                    setData(response.data.data)
                } catch (err) {
                    console.log(err)
                }
                setLoading(false)

            }
            getscaNumber()
        }
    }, [])
    return (
        <div className="numbers-main" ref={numbersRef}>
            <div className="numbers-heading">
                <h2>College Clubs by Numbers</h2>
            </div>
            {loading && !data ? <div>Loading...</div> :
                <div className="numbers-items">
                    <div>
                        <FaGlobe />
                        <p>
                            {startCount ? <CountUp start={0} end={data[0]} duration={3} /> : 0}
                        </p>
                        <h3>Clubs</h3>
                    </div>
                    <div>
                        <FaUserGroup />
                        <p>
                            {startCount ? <CountUp start={0} end={data[1]} duration={3} /> : 0}
                        </p>
                        <h3>Members</h3>
                    </div>
                    <div>
                        <FaUserTie />
                        <p>
                            {startCount ? <CountUp start={0} end={data[2]} duration={3} /> : 0}
                        </p>
                        <h3>Coordinators</h3>
                    </div>
                    <div>
                        <MdEventAvailable />
                        <p>
                            {startCount ? <CountUp start={0} end={data[3]} duration={3} /> : 0}
                        </p>
                        <h3>Events</h3>
                    </div>
                </div>
            }

        </div>
    );
}
