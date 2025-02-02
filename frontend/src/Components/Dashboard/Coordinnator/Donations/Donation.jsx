import "./Donations.css"
import CoordinatorSetup from "../CoordinatorSetup"
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux"
import { getCoordinatorDonars} from "../../../../Actions/donorsActions"
import { useEffect, useState } from "react";
import Loading from "../../../Loaders/Loading"
import { useNavigate, useLocation } from "react-router-dom"
import { ConvertTime } from "../../../Functionalities/functionalites"
import XlsxButton from "../../../Functionalities/XlsxButton"
export default function AdminAlldonations() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [key, setKey] = useState(queryParams.get('key') || "")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { donars, loading } = useSelector(state => state.donars)
    const columns = [
        { field: "id", headerName: "Payment Id" },
        { field: "name", headerName: "Name", flex: 0.2 },
        { field: "note", headerName: "Note", flex: 0.3 },
        { field: "mail", headerName: "Mail", flex: 0.3 },
        { field: "phone", headerName: "Mobile No", flex: 0.2 },
        { field: "club", headerName: "Club", flex: 0.2 },
        { field: "createdAt", headerName: "CreatedAt", flex: 0.2 },
        { field: "amount", headerName: "Amount", flex: 0.15 },
    ]
  
    useEffect(() => {
        dispatch(getCoordinatorDonars(key))
    }, [])

    if (loading) {
        return <CoordinatorSetup current={"donations"}  element={<Loading />} />
    }
    return (
        <CoordinatorSetup current={"donations"}  element={
            <section className="coordinator-donations-section">
                <div className="coordinator-donations-search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/coordinator/donations?key=${key}`)
                        dispatch(getCoordinatorDonars(key))
                    }}>
                        <input type="text" id="fest_search" placeholder="donation Name/Id..." value={key} onChange={(e) => setKey(e.target.value)} />
                        <button >Search</button>
                    </form>
                </div>
                <div className="coordinator-donations-grid">
                    <DataGrid
                        columns={columns}
                        rows={donars && donars.map((donation, inx) => {
                            return {
                                name: donation.name,
                                note: donation.note ? donation.note : "No Note",
                                id: donation.paymentInfo ? donation.paymentInfo.paymentId : inx + 1,
                                createdAt: ConvertTime(donation.createdAt).split(",")[0],
                                amount: `₹${donation.amount}`,
                                club: donation.club ? donation.club.name : "General",
                                phone: donation.phone ? donation.phone : "Anonymous",
                                mail: donation.mail
                            }

                        })}
                        sx={{ minHeight: "60vh", backgroundColor: "" }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0px" }}>
                        <XlsxButton filename={"Donations"}
                            data={donars && donars.map((donation, inx) => {
                                return {
                                    Id: donation.paymentInfo?.paymentId,
                                    Name: donation.name,
                                    Note: donation.note ? donation.note : "No Note",
                                    Amount: `₹${donation.amount}`,
                                    Club: donation.club ? donation.club.name : "General",
                                    Phone: donation.phone ? donation.phone : "Anonymous",
                                    Mail: donation.mail,
                                    Created_At: ConvertTime(donation.createdAt),
                                }

                            })}
                        />
                    </div>
                </div>
            </section>}
        />
    )
}