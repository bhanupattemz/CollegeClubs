
import Button from '@mui/material/Button';
import { BACKENDURL } from "../Functionalities/functionalites"
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import axios from 'axios';
export default function RegisterButton({ event, formData, isAccept = false, setOpen, setLoading }) {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const navigate = useNavigate()
    const [razorpayKey, setRazorpayKey] = useState()
    const handlePayment = async () => {
        setOpen(false)
        try {
            setLoading(true)
            const respounce = await axiosInstance.post(`/fest/events/order/${event._id}`, { mail: formData.mail });
            const order = respounce.data.data;
            const options = {
                key: { razorpayKey },
                amount: order.amount,
                currency: order.currency,
                name: "SCAJNTUACEA",
                description: "Payment for Donate Clubs",
                order_id: order.id,
                handler: async (response) => {
                    try {
                        setLoading(true)
                        const result = await axiosInstance.post(`/fest/events/register/${event._id}`, {
                            data: response,
                            member: formData
                        });
                        toast.success(`Successfully register for ${event.name}.`)
                        setLoading(false)
                        navigate(`/fest/events/${event._id}`)
                    } catch (err) {
                        console.log(err)
                        toast.error("Something went wrong with your payment. Please try again.")
                    } finally {
                        console.log("completed")
                        setLoading(false)
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.mail,
                    contact: formData.mobileNo
                },
                theme: {
                    color: "#0A5EB0"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    };
    useEffect(() => {
        if (!razorpayKey) {
            async function getRazorpayKey() {
                try {
                    const response = await axiosInstance.get("/razorpay/key")
                    setRazorpayKey(response.data.data)
                } catch (err) {
                    console.log(err)
                }
            }
            getRazorpayKey()
        }
    })
    return (
        <Button disabled={!isAccept} onClick={handlePayment}>Pay ₹{event.amount} Now</Button>
    )
}