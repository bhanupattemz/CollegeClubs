import "./CreateDonation.css"
import AdminSetup from "../AdminSetUp"
import { getAllclubs } from "../../../../Actions/clubsAction"
import { clearSuccess } from "../../../../Reducers/Donations/Donors"
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminCreateDonation } from "../../../../Actions/donorsActions"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router";
import Loading from "../../../Loaders/Loading"
import dayjs from "dayjs";
export default function CreateDonation() {
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { clubs, loading: clubsLoading } = useSelector(state => state.clubs)
    const { loading, success } = useSelector(state => state.donars)
    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(adminCreateDonation({ ...formData, payedAt: dayjs(formData.payedAt).toISOString() }))
    }
    useEffect(() => {
        dispatch(getAllclubs())
    }, [])
    useEffect(() => {
        if (success) {
            dispatch(clearSuccess())
            navigate("/admin/donations")
        }
    }, [success])
    if (loading || clubsLoading) return <AdminSetup current={"donations"} option={"Create"} element={<Loading />} />
    return <AdminSetup current={"donations"} option={"Create"} element={
        <form onSubmit={formSubmitHandler} className="Create-donation-form">
            <section className="create-donation-section-1">
                <TextField
                    required
                    id="name"
                    label="Enter Full Name"
                    variant="outlined"
                    placeholder={`Firstname Lastname`}
                    value={formData.name}
                    onChange={(e) =>
                        setFormData(prev => ({ ...prev, name: e.target.value }))
                    }
                />
                <TextField
                    required
                    id="Mail"
                    label="Mail"
                    variant="outlined"
                    type="email"
                    placeholder={`example@gmail.com`}
                    value={formData.mail}
                    onChange={(e) =>
                        setFormData(prev => ({ ...prev, mail: e.target.value }))
                    }
                />
                <TextField
                    id="mobile-no"
                    label="Mobile No"
                    variant="outlined"
                    type="number"
                    value={formData.mobileNo}
                    onChange={(e) =>
                        setFormData(prev => ({ ...prev, mobileNo: e.target.value }))
                    }
                />
            </section>
            <section className="create-donation-section-2">
                <TextField
                    id="Note"
                    label="Note"
                    variant="outlined"
                    placeholder={`Write you Note Here`}
                    value={formData.note}
                    multiline
                    rows={2}
                    onChange={(e) =>
                        setFormData(prev => ({ ...prev, note: e.target.value }))
                    }
                />
            </section>
            <section className="create-donation-section-3">
                <TextField
                    select
                    label="Club"
                    onChange={(e) =>
                        setFormData(prev => ({ ...prev, club: e.target.value }))
                    }
                >
                    {clubs && clubs.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                            {option.name}
                        </MenuItem>
                    ))}
                    <MenuItem value={undefined}>
                        General
                    </MenuItem>
                </TextField>
                <TextField
                    required
                    id="amount"
                    label="Enter Amount"
                    variant="outlined"
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                        setFormData(prev => ({ ...prev, amount: e.target.value }))
                    }
                />
            </section>
            <section className="create-donation-section-4">
                <TextField
                    required
                    id="paymentId"
                    label="Transaction Id"
                    variant="outlined"
                    type="string"
                    value={formData.paymentId}
                    onChange={(e) =>
                        setFormData(prev => ({ ...prev, paymentId: e.target.value }))
                    }
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                            label="Payed At"
                            required={true}
                            value={formData.payedAt}
                            onChange={(val) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    payedAt: val,
                                }))
                            }
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </section>
            <button className="create-donation-submit-btn">Submit</button>
        </form>
    } />
}