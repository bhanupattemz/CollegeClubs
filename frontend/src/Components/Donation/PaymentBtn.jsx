
import LoadingButton from '@mui/lab/LoadingButton';
import { BACKENDURL } from "../Functionalities/functionalites"
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: BACKENDURL,
    withCredentials: true
})
export default function PaymentButton({ formData, amount, anonymous, CaptchaValue }) {
    const [razorpayKey, setRazorpayKey] = useState()
    const handlePayment = async () => {
        if (!CaptchaValue) {
            alert("Please complete the CAPTCHA");
            return;
        }
        try {
            console.log(formData.mobileNo)
            if(amount<10){
                throw new Error("amount must be higher than ₹10")
            }
            const respounce = await axiosInstance.post("/donars/order", {
                amount: amount,
                receipt: `order_rcptid_${Date.now()}`
            });

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
                        let memberData;
                        if (anonymous) {
                            memberData = { name: "anonymous", mail: "anonymous@gmail.com", amount, note: formData.note, club: formData.club }
                        } else {
                            memberData = { ...formData, amount }
                        }
                        const result = await axiosInstance.post("/donars", {
                            data: response,
                            donar: memberData
                        });
                        alert('Thank you! Your content is now live for others to enjoy.')
                    } catch (err) {
                        console.log(err)
                        alert('Oops! Something went wrong with your payment. Please try again.')
                    } finally {
                        console.log("completed")
                    }
                },
                prefill: {
                    name: formData.name || "anonymous",
                    email: formData.mail ,
                    contact: formData.mobileNo
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.log(error)
        }
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
        <LoadingButton
            id="donation-submit-btn"
            loadingPosition="end"
            variant="contained"
            color="success"
            onClick={handlePayment}
        >
            Donate
        </LoadingButton>
    )
}