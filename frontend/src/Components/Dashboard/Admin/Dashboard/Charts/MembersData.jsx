import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { adminGetAllUsers } from "../../../../../Actions/userActions"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { BACKENDURL } from "../../../../Functionalities/functionalites"
import axios from "axios";
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
export default function MembersData() {
    const dispatch = useDispatch()
    const [memberData, setMemberData] = useState([0, 0, 0, 0])
    const [loading, setLoading] = useState(false)
    const data = {
        labels: ["General Users", "Students", "Coordinators", "Admins"],
        datasets: [
            {
                label: "Users Data",
                data: memberData,
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                    "rgb(245, 115, 235)"
                ],
                hoverOffset: 4,
            },
        ],
    };
    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true)
                const respounce = await axiosInstance.get("/admin/users/numbers")
                setMemberData(respounce.data.data)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
        getUserData()
    }, [])
    if (loading) {
        return <div className="card-loading" style={{ width: "100%", height: "100%" }}></div>
    }
    return <Pie data={data} />;
}
