import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import randomColor from "randomcolor";
import { useEffect, useState } from "react";
import { BACKENDURL } from "../../../../Functionalities/functionalites"
import axios from "axios";
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart() {
    const [labels, setLabels] = useState()
    const [loading, setLoading] = useState(false)
    const [clubs, setClubs] = useState()
    const [backgroundColor, setBackgroundColor] = useState()
    const [borderColors, setBorderColors] = useState()
    const [events, setEvents] = useState()

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Total Events Conducted",
                data: events,
                backgroundColor: backgroundColor,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };
    function hexToRgba(hex) {
        hex = hex.replace(/^#/, '')
        let r = parseInt(hex.substring(0, 2), 16)
        let g = parseInt(hex.substring(2, 4), 16)
        let b = parseInt(hex.substring(4, 6), 16)

        return `rgba(${r}, ${g}, ${b}, ${0.2})`
    }

    useEffect(() => {
        const getAdminClubEvents = async () => {
            try {
                setLoading(true)
                const respounce = await axiosInstance.get("/admin/club_events/numbers")
                setClubs(respounce.data.data)
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
        getAdminClubEvents()
    }, [])
    useEffect(() => {
        if (clubs) {
            setLabels([])
            setBackgroundColor([])
            setBorderColors([])
            setEvents([])
            clubs.map((item) => {
                const color = randomColor()
                setLabels(prev => [...prev, item.name])
                setEvents(prev => [...prev, item.count])
                setBorderColors(prev => [...prev, color])
                setBackgroundColor(prev => [...prev, hexToRgba(color)])
            })
        }
    }, [clubs])
    if (loading) {
        return
    }
    return <Bar data={data} />;
}
