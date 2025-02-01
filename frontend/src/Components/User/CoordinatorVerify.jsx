import { useEffect, useState } from "react";
import "./CoordinatorVerify.css"
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import { setIsUpdateFalse, verfyCoordinator } from "../../Actions/userActions"
import Loading from "../Loaders/Loading"
export default function CoordinatorVerify() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { _id } = useParams()
    const [formData, setFormData] = useState({})
    const { loading, isUpdated } = useSelector(state => state.user)
    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(verfyCoordinator(formData, _id))
    }
    useEffect(() => {
        if (isUpdated) {
            dispatch(setIsUpdateFalse())
            navigate("/")
        }
    }, [isUpdated])
    if (loading) return <Loading />
    return (
        <main className="coordinator-verify-main">
            <h1>Coordinator verification</h1>
            <form onSubmit={formSubmitHandler}>
                <TextField
                    id="main"
                    required
                    label="Mail"
                    variant="outlined"
                    type="mail"
                    onChange={(e) => { setFormData(prev => ({ ...prev, mail: e.target.value })) }}
                />
                <TextField
                    required
                    id="description"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    error={formData.description && formData.description.length < 300 ? "The description must exceed 300 characters." : null}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                />
                <Button variant="contained" type="submit">Submit</Button>
            </form>

        </main>
    )
}