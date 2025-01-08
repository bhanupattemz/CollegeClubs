import "./UserProfile.css"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect, Fragment } from "react"
import { getCurrentUser, resetPaswordToken } from "../../../Actions/userActions"
import UserProfileOptions from "./UserProfileOptions"
import Loading from "../../Loaders/Loading"
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import PDFViewer from "../../Annocements/PDFViewer/PDFViewer"
import { deleteCurrentUser } from "../../../Actions/userActions"
import { confirmAlert } from 'react-confirm-alert';
export default function UserProfile() {
    const options = {
        title: 'Are you sure you want to delete your account?',
        message: `This action will permanently remove your profile, along with all your contributions, event registrations, and club activity. Once deleted, this cannot be undone.`,
        buttons: [
            {
                label: 'Delete',
                onClick: () => dispatch(deleteCurrentUser())
            },
            {
                label: 'Cancel',

            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        overlayClassName: "delete-user-confirmation-popup"
    };
    const resetPasswordOptions = {
        title: 'Reset Password',
        message: `If you forgot your password, click 'Send' to receive a reset link in your email. Use the link to change your password. Click 'Cancel' if you wish to abort this process.`,
        buttons: [
            {
                label: 'Send',
                onClick: () => dispatch(resetPaswordToken({ mail: user.mail }))
            },
            {
                label: 'Cancel',

            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        overlayClassName: "reset-pasword-confirmation-popup"
    };
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, loading } = useSelector(state => state.user)
    const [pdfUrl, setPdfUrl] = useState(null)
    const deleteUserHandler = () => {
        confirmAlert(options)
    }
    useEffect(() => {
        if (!user) {
            dispatch(getCurrentUser())
        }
    }, [])
    if (loading) {
        return <Loading />
    }
    return (
        <main className="profile-main">
            <section>
                {!pdfUrl &&
                    <Fragment>
                        <section className="profile-img-section">
                            <div>
                                <img src={user.personalInformation.profile.url} alt="profile-img" />
                            </div>
                            <div className="profile-img-data">
                                <div className="profile-username">
                                    <h1>{user.username}</h1><span><MdOutlineAdminPanelSettings /> {user.role}</span>
                                </div>
                                <span>{user.workedAs}</span>
                                <div className="profile-ad-mail-div">
                                    {user.role !== "admin" && <p><b>Ad No :</b> 22001A0530</p>}
                                    <p><b>Mail : </b>{user.mail}</p>
                                </div>
                                <div className="user-profile-btns">
                                    <button onClick={() => navigate("/profile/update")}>Update</button>
                                    <button onClick={() => navigate("/profile/update/password")}>Update Password</button>
                                    <button onClick={() => confirmAlert(resetPasswordOptions)}>Reset Password</button>
                                    {user.role != "admin" && <button onClick={deleteUserHandler}>Delete Account</button>}
                                    {user.role == "admin" && <button>Transfer & Delete</button>}
                                </div>
                            </div>
                        </section>
                        <UserProfileOptions setPdfUrl={setPdfUrl} />
                    </Fragment>}
                {pdfUrl &&
                    <section className="user-data-pdf">
                        <button onClick={() => setPdfUrl(null)}>Close</button>
                        <PDFViewer url={pdfUrl} />
                    </section>}
            </section>
        </main>
    )
}