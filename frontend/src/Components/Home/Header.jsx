import * as React from "react";
import { useEffect } from "react"
import "./Header.css"
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    MenuItem,
} from "@mui/material";
import UserOptions from "../User/UserOptions"
import MenuIcon from "@mui/icons-material/Menu";
import { FaEnvelope } from "react-icons/fa";
import {
    FaHome,
    FaUsers,
    FaCalendarAlt,
    FaImages,
    FaDonate,
    FaBook,
    FaBullhorn,
    FaInfoCircle,
    FaPhoneAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKENDURL } from "../Functionalities/functionalites"
import { MdEmojiEvents } from "react-icons/md";
function ResponsiveAppBar() {
    const axiosInstance = axios.create({
        baseURL: BACKENDURL,
        withCredentials: true
    })

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [fest, setFest] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const pages = [
        { text: "Home", link: "/", icon: <FaHome /> },
        { text: "Clubs", link: "/clubs", icon: <FaUsers /> },
        { text: "Events", link: "/events", icon: <FaCalendarAlt /> },
        { text: "Gallery", link: "/gallery", icon: <FaImages /> },
        { text: "Donate", link: "/donation", icon: <FaDonate /> },
        { text: "Library", link: "/library", icon: <FaBook /> },
        { text: "Announcements", link: "/announcements", icon: <FaBullhorn /> },
        { text: "About Us", link: "/about", icon: <FaInfoCircle /> },
        { text: "Contact", link: "/contact", icon: <FaPhoneAlt /> },
    ];
    if (user && ["admin", "coordinator"].includes(user.role)) {
        pages.splice(7, 0, { text: "Letters", link: "/letters", icon: <FaEnvelope /> });
    }
    if (fest) {
        pages.splice(3, 0, { text: "Fest", link: "/fest", icon: <MdEmojiEvents /> });
    }
    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = (page) => {
        setAnchorElNav(null);
        navigate(page.link);
    };
    useEffect(() => {
        if (!fest) {
            async function getCurrentFest() {
                try {
                    setLoading(true)
                    const response = await axiosInstance.get("/fest")
                    setFest(response.data.data)
                }
                catch (err) {
                    console.log(err)
                }
                setLoading(false)
            }
            getCurrentFest()
        }
    }, [])
    return (
        <AppBar position="static" className="main-navbar">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ margin: "10px 0px" }}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <img
                            src="https://res.cloudinary.com/dp6kibyv5/image/upload/v1740923272/clubs/lc6njqumvvhcygauu1ai.png"
                            alt="logo"
                            style={{ width: "250px", maxWidth: "100%" }}
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.icon} {page.text}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        <Box sx={{ margin: "10px auto" }}>
                            <img
                                src="https://res.cloudinary.com/dp6kibyv5/image/upload/v1740923272/clubs/lc6njqumvvhcygauu1ai.png"
                                alt="logo"
                                style={{ width: "250px", maxWidth: "80%" }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.text}
                                onClick={() => handleCloseNavMenu(page)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.text}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <UserOptions />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
