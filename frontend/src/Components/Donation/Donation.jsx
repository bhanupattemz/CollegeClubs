import "./Donation.css"
import Banner from "../Clubs/Banner"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef } from "react";
import { getTopDonors } from "../../Actions/donorsActions"
import { ConvertTime } from "../Functionalities/functionalites"
import DonationForm from "./DonationForm";
export default function Donation() {
    const dispatch = useDispatch();
    let { donars } = useSelector(state => state.donars)
    useEffect(() => {
        if (!donars || donars.length == 0) {
            dispatch(getTopDonors())
        }
    }, [])
    return (
        <main className="donation-page-main">
            <section>
                <Banner btnScroll={".make-donation-section"} btntext={"Donate Now"} heading={"Support Our Vision"} discription={"Your contribution makes a difference. Empower students and help us grow!"} link={"https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822528/samples/cup-on-a-table.jpg"} />
            </section>
            <section className="donation-page-why-section">
                <h2>Why Donate?</h2>
                <div className="donation-page-why-contant">
                    <div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores sapiente nemo harum, optio architecto eos molestiae suscipit totam corrupti, sed nihil laboriosam quae, iure quia aliquid in officiis iste odio.</p>
                    </div>
                    <div className="donation-page-why-example">
                        <div>
                            <h3>₹1000</h3>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores</p>
                        </div>
                        <div>
                            <h3>₹2000</h3>
                            <p> Maiores sapiente nemo harum, optio consectetur adipisicing elit. Maiores</p>
                        </div>
                        <div>
                            <h3>₹5000</h3>
                            <p> adipisicing elit. Maiores sapiente nemo harum, optio ar consectetur adipisicing elit. Maiores</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="make-donation-section">
                <h2>Make Donation</h2>
                <div className="donatioon-make-payment-form">
                    <DonationForm />
                </div>
            </section>
            {donars &&
                <section className="donars-content-section">
                    <h2>Thank You, Supporters!</h2>
                    <marquee >
                        <div className="donars-content">
                            {donars.map((item, inx) => {
                                return (
                                    <div key={inx}>
                                        <h3>{item.name}</h3>
                                        <div>
                                            <p>{ConvertTime(item.createdAt).split(",")[0]}</p>
                                            <p>₹ {item.amount}</p>
                                            <p>{item.club?.name || "General"}</p>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </marquee>
                </section>
            }
        </main>
    )
}