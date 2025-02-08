import "./Footer.css";
import { Link } from "react-router";
import { TiChevronRight } from "react-icons/ti";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { MdMailOutline } from "react-icons/md";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
export default function Footer() {
    return (
        <footer className="footer">

            <div className="footer-content">
                <div className="footer-about footer-about-mid">
                    <img src="https://res.cloudinary.com/delc5g3p5/image/upload/v1734195440/Clubs/lnczlvkkzy3cinwdxum5.png" alt="logo" />
                    <div>
                        <p>SCAJNTUACEA (Student Club of JNTUACEA) is a vibrant student
                            community that fosters skill development, innovation, and leadership
                            through engaging events and activities. Join us to connect, learn, and grow together!</p>
                    </div>
                </div>
                <div className="footer-links">
                    <h3>Usefull Links</h3>
                    <div className="footer-links-list">
                        <Link to="/"><TiChevronRight /> Home</Link>
                        <Link to="/clubs"><TiChevronRight /> Clubs</Link>
                        <Link to="/events"><TiChevronRight /> Events</Link>
                        <Link to="/resources"><TiChevronRight /> Resources</Link>
                        <Link to="/about"><TiChevronRight /> About Us</Link>
                    </div>

                </div>
                <div className="footer-about">
                    <img src="https://res.cloudinary.com/delc5g3p5/image/upload/v1734195440/Clubs/lnczlvkkzy3cinwdxum5.png" alt="logo" />
                    <div>
                        <p>SCAJNTUACEA (Student Club of JNTUACEA) is a vibrant student
                            community that fosters skill development, innovation, and leadership
                            through engaging events and activities. Join us to connect, learn, and grow together!</p>
                    </div>
                    <div className="footer-follow">
                        <Link to="/"><FaInstagram /></Link>
                        <Link to="/"><AiOutlineYoutube /></Link>
                        <Link to="/"><MdMailOutline /></Link>
                        <Link to="/"><AiOutlineFacebook /></Link>
                        <Link to="/"><FaXTwitter /></Link>
                    </div>
                </div>
                <div className="footer-contact">
                    <div className="footer-contact-heading">
                        <h3 >Contact Us</h3>
                    </div>
                    <div className="footer-contact-list">
                        <div><span><FaPhoneAlt /> +91-8555860089</span></div>
                        <div><span><IoIosMail /> scajntuacea@gmail.com</span></div>
                        <div><span><FaLocationDot /> Jntua, Pulivendula Road, Anantapur - 515002, Andhra Pradesh, India.</span></div>
                    </div>
                </div>
                <div className="footer-follow footer-follow-mid">
                    <Link to="/"><FaInstagram /></Link>
                    <Link to="/"><AiOutlineYoutube /></Link>
                    <Link to="/"><MdMailOutline /></Link>
                    <Link to="/"><AiOutlineFacebook /></Link>
                    <Link to="/"><FaXTwitter /></Link>
                </div>
            </div>

        </footer>
    );
}
