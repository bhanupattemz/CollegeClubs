import React, { act, useEffect, useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import { userSignout } from "../../Actions/userActions"
import { useDispatch, useSelector } from "react-redux"
import { PiCertificateBold } from "react-icons/pi";
import { FaUserEdit } from "react-icons/fa";
import "./UserOptions.css"
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
export default function UserOptions({ user }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const account = () => { navigate("/profile") }
    const logout = () => {
        dispatch(userSignout())

    }
    const dashboard = () => { navigate(`/${user.role}/dashboard`) }
    const { isauthenticate } = useSelector(state => state.user)
    let actions = [
        { icon: <AccountCircleIcon />, name: "profile", func: account },
        { icon: <FaUserEdit />, name: "Edit Profile", func: ()=>{navigate("/profile/update")} },
        { icon: <IoMdLogOut />, name: "logout", func: logout },
    ]
    if (user && user.role == "admin") {
        actions.unshift({ icon: <DashboardCustomizeIcon />, name: "DashBoard", func: dashboard })
    } else if (user) {
        actions = [
            ...actions.slice(0, 1),
            { icon: <PiCertificateBold />, name: "certificates", func: ()=>{navigate("/profile?type=achi")} },
            ...actions.slice(1),
        ];
    }
    return (
        <div className='dail-box'>
            <SpeedDial
                ariaLabel="User Options"
                icon={<img src={user && user.personalInformation?.profile?.url ? user.personalInformation.profile.url : "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721047699/Epic%20Essentials/pjlmvwy41tdhblpskhnj.png"} className='img-icon' />}
                direction='down'
                sx={{
                    position: 'absolute', top: 105, right: 25, zIndex: 11, '& .MuiFab-primary': { width: 40, height: 40 },
                    '& .MuiSpeedDialAction-staticTooltipLabel': { fontSize: '0.75rem' },
                }}>
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={action.func}
                    />
                ))}
            </SpeedDial>
        </div>
    );
}
