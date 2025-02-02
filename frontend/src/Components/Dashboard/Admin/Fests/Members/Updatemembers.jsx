import "./UpdateMember.css"
import AdminSetup from "../../AdminSetUp"
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from "@mui/material/TextField";
import Loading from "../../../../Loaders/Loading"
import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useParams } from "react-router-dom"

import { toast } from "react-toastify";
import axios from "axios";
import { BACKENDURL } from "../../../../Functionalities/functionalites"
export default function UpdateMember() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ paymentInfo: {} })
    const [loading, setLoading] = useState(false)
    const { _id } = useParams()
    const genders = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "others", label: "Others" }
    ];
    const branches = [
        { value: "cse", label: "CSE" },
        { value: "ece", label: "ECE" },
        { value: "eee", label: "EEE" },
        { value: "civ", label: "Civil" },
        { value: "mech", label: "Mechanical" },
        { value: "chem", label: "Chemical" },
    ];
    const years = [
        { value: 1, label: "1st Year" },
        { value: 2, label: "2nd Year" },
        { value: 3, label: "3rd Year" },
        { value: 4, label: "4th Year" },
    ];
    const degrees = [
        { value: "b-tech", label: "B.Tech" },
        { value: "mba", label: "MBA" },
        { value: "mca", label: "MCA" },
        { value: "m-tech", label: "M.Tech" },
    ];
    const formSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const respounce = await axiosInstance.put(`/fest/members/${_id}`, formData)
            toast.success("Member updated successfully!")
            navigate('/admin/fests/members')
        } catch (err) {
            toast.error(err)
        }
        setLoading(false)
    }
    useEffect(() => {
        async function getmember() {
            try {
                const respounce = await axiosInstance.get(`/fest/members/${_id}`)
                setFormData(respounce.data.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (_id) {
            getmember()
        }
    }, [_id])
    return <AdminSetup current={"fests"} option={"all-members"} element={
        <section className="fest-members-update-section">
            <form onSubmit={formSubmitHandler} className="fest-members-update-form">
                <div>
                    <TextField
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
                        id="Mail"
                        label="Mail"
                        variant="outlined"
                        type="email"
                        value={formData.mail}
                        placeholder={`example@gmail.com`}
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
                    <TextField
                        select
                        label="Gener"
                        value={formData.gender}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                gender: e.target.value,
                            }))
                        }
                    >
                        {genders.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        id="college"
                        label="college"
                        variant="outlined"
                        value={formData.college}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, college: e.target.value }))
                        }
                    />
                    <div className="fest-members-update-select">
                        <TextField
                            select
                            label="Degree"
                            value={formData.course}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    course: e.target.value,
                                }))
                            }
                        >
                            {degrees.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Branch"
                            value={formData.branch}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    branch: e.target.value,
                                }))
                            }
                        >
                            {branches.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Year"
                            value={formData.academicYear}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    academicYear: e.target.value,
                                }))
                            }
                        >
                            {years.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
                <div>
                    <TextField
                        id="paymentId"
                        label="paymentId"
                        variant="outlined"
                        value={formData.paymentInfo.paymentId}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, paymentInfo: { ...prev.paymentInfo, paymentId: e.target.value } }))
                        }
                    />
                    <TextField
                        id="status"
                        label="Status"
                        variant="outlined"
                        value={formData.paymentInfo.status}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, paymentInfo: { ...prev.paymentInfo, status: e.target.value } }))
                        }
                    />
                    <TextField
                        id="amount"
                        label="Amount"
                        variant="outlined"
                        value={formData.paymentInfo.amount}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, paymentInfo: { ...prev.paymentInfo, amount: e.target.value } }))
                        }
                    />

                </div>
                <LoadingButton
                    id="contact-submit-btn"
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    type="submit"
                >
                    Register
                </LoadingButton>
            </form>
        </section>
    } />
}