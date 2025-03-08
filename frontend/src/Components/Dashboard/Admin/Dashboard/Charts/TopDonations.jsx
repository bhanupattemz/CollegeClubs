import { Fragment, useEffect } from "react";
import "./TopDonations.css"
import { FaUserTie } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux"
import { getTopDonors } from "../../../../../Actions/donorsActions"
export default function TopDonations() {
    const dispatch = useDispatch()
    const { donars, loading } = useSelector(state => state.donars)
    useEffect(() => {
        dispatch(getTopDonors())
    }, [])
    if (loading || !donars) {
        return (
            <Fragment>
                <div className="top-donations-heading">
                    <h2>Top Donations</h2>
                    <a href="/admin/donations"><FaExternalLinkAlt /> View More</a>
                </div>
                <div className="top-donations-list-loading card-loading">

                </div>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <div className="top-donations-heading">
                <h2>Top Donations</h2>
                <a href="/admin/donations"><FaExternalLinkAlt /> View More</a>
            </div>
            <div className="top-donations-list">
                {donars && donars.length > 0 ? donars.map((item, inx) => {
                    return (
                        <div key={inx} className="top-donations-item">
                            <div>{item.name == "anonymous" ? <FaUserSecret /> : <FaUserTie />} <p>{item.name}</p></div>
                            <div><p>₹{item.amount}</p></div>
                        </div>
                    )
                }
                ) : <div>
                    <h3>No one has donated yet.</h3>
                </div>
                }
            </div>
        </Fragment>
    )
}