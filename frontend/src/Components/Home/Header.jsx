import "./Header.css"
import { Link } from "react-router"
export default function Header() {
    return (
        <div className="header">
            <nav className="sticky-nav">
                <div className="navbar-logo">
                    <img src="https://res.cloudinary.com/delc5g3p5/image/upload/v1734089521/Clubs/eoqzicmtr9gzhkzfqsxj.png" alt="logo" />
                </div>
                <div className="navbar-items">
                    <ul>
                        <li className="navbar-item"><Link to="/">Home</Link></li>
                        <li className="navbar-item"><Link to="/clubs">Clubs</Link></li>
                        <li className="navbar-item"><Link to="/events">Events</Link></li>
                        <li className="navbar-item"><Link to="/gallery">Gallery</Link></li>
                        <li className="navbar-item"><Link to="/donation">Donate</Link></li>
                        <li className="navbar-item"><Link to="/library">Library</Link></li>
                        <li className="navbar-item"><Link to="/announcements">Announcements</Link></li>
                        <li className="navbar-item"><Link to="/letters">Letters</Link></li>
                        <li className="navbar-item"><Link to="/about">About Us</Link></li>
                        <li className="navbar-item"><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </nav>
          
        </div>

    )
}
