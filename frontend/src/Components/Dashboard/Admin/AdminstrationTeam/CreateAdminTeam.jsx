import "./UpsertTeam.css"
import AdminSetup from "../AdminSetUp"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../../../Loaders/Loading"
import { useEffect, useState } from "react";
import { adminCreateAdministrationMember } from "../../../../Actions/administrationAction"
import { clearSuccess } from "../../../../Reducers/AdministrationTeam/AdministrationTeam"
export default function CreateAdministrationTeam() {
  
    const [signPrev, setSignPrev] = useState("https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822503/samples/people/smiling-man.jpg")
    const [imgprev, setImgPrev] = useState("https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822503/samples/people/smiling-man.jpg")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({})
    const { loading, success } = useSelector(state => state.administrationTeam)
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const isActive = [
        { value: true, text: "Active" },
        { value: false, text: "Inactive" }
    ]
    const position = ["Principal", "Vice-Principal", "Faculty-Coordinator", "Student-Coordinator"]
    const formSubmitHandler = () => {
        if (!formData.image || !formData.signature) {
            alert("images is required")
        } else {
            const fd = new FormData()
            fd.append("name", formData.name)
            fd.append("description", formData.description)
            fd.append("image", formData.image)
            fd.append("signature", formData.signature)
            fd.append("mobileNo", formData.mobileNo)
            fd.append("mail", formData.mail)
            fd.append("isactive", formData.isactive ? formData.isactive : true)
            fd.append("position", formData.position)
            dispatch(adminCreateAdministrationMember(fd))
        }
    }
    useEffect(() => {
        if (success) {
            dispatch(clearSuccess())
            navigate("/admin/administration_team")
        }
    }, [success])
    if (loading) return <AdminSetup current={"adminTeam"} option={"Create"} element={<Loading />} />
    return <AdminSetup current={"adminTeam"} option={"Create"} element={
        <form className="Upsert-team-form" onSubmit={formSubmitHandler}>
            <section className="Upsert-team-section-1">
                <TextField
                    required
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />
                <TextField
                    select
                    label="Active Member"
                    value={formData.isactive}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            isactive: e.target.value,
                        }))
                    }
                >
                    {isActive.map((option, inx) => (
                        <MenuItem key={inx} value={option.value}>
                            {option.text}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Member Position"
                    value={formData.position}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            position: e.target.value,
                        }))
                    }
                >
                    {position.map((option, inx) => (
                        <MenuItem key={inx} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </section>
            <section className="Upsert-team-section-2">
                <TextField
                    required
                    id="Mail"
                    label="Mail"
                    variant="outlined"
                    type="email"
                    value={formData.mail}
                    placeholder={`example@gmail.com`}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            mail: e.target.value,
                        }))
                    }
                />
                <TextField
                    required
                    id="mobileNo"
                    label="Mobile No"
                    variant="outlined"
                    type="number"
                    value={formData.mobileNo}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            mobileNo: e.target.value,
                        }))
                    }
                />
            </section>
            <section className="Upsert-team-section-3">
                <TextField
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    variant="outlined"
                    value={formData.description}
                    multiline
                    rows={3}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                />
            </section>
            <section className="Upsert-team-section-4">
                <div>
                    <img src={imgprev} alt="image-prev" />
                    <Button
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Image
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setFormData(prev => ({ ...prev, image: file }))
                                const reader = new FileReader();
                                reader.onload = () => {
                                    if (reader.readyState === 2) {
                                        setImgPrev(reader.result);
                                    }
                                };
                                reader.readAsDataURL(file);
                            }
                            }

                        />
                    </Button>
                </div>
                <div>
                    <img src={signPrev} alt="sign-prev" />
                    <Button
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Signature
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setFormData(prev => ({ ...prev, signature: file }))
                                const reader = new FileReader();
                                reader.onload = () => {
                                    if (reader.readyState === 2) {
                                        setSignPrev(reader.result);
                                    }
                                };
                                reader.readAsDataURL(file);
                            }
                            }
                        />
                    </Button>
                </div>
            </section>
            <button className="Usert-team-btn">Submit</button>
        </form>
    } />
}