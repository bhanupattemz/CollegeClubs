import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { BACKENDURL } from "../../../../Functionalities/functionalites"
import axios from "axios";
import { useEffect, useState } from "react";
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Donations() {
    const [donations, setdonations] = useState({ data: [], amounts: [], labels: [] })
    const [loading, setLoading] = useState(false)
    const data = {
        labels: donations.labels,
        datasets: [
            {
                label: "Donations",
                data: donations.data,
                fill: false,
                borderColor: "#FFEB00",
                tension: 0.1,
            }, {
                label: "Donation Amount in Rupees",
                data: donations.amounts,
                fill: false,
                borderColor: "#0A5EB0",
                tension: 0.1,
            },
        ],
    };
    useEffect(() => {
        const getCoordinatorNumber = async () => {
            try {
                setLoading(true)
                const respounce = await axiosInstance.get("/coordinator/donations/numbers")
                // console.log(respounce.data.data)
                setdonations(respounce.data.data)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
        getCoordinatorNumber()
    }, [])
    if (loading) {
        return
    }
    return <Line data={data} />;
}
