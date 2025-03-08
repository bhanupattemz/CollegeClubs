import "./Mission.css"
import { useNavigate } from "react-router-dom"
export default function Mission({ isknowMore = true }) {
    const navigate = useNavigate()
    return (
        <div className="mission-vission-main-div">
            <h2>Mission & Vission</h2>
            <div className="mission-container-left">
                <div className="mission-img-left">
                    <img src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822532/cld-sample-3.jpg" alt="mission-img" />
                </div>
                <div className="mission-body-left">
                    <div className="mission-content-left">
                        <h3>Our Mission</h3>
                        <p>
                            At CollegeClubs, we strive to create a dynamic and inclusive
                            community where students can explore their passions, develop
                            essential skills, and collaborate with like-minded individuals.
                            Our mission is to bridge the gap between academics and extracurriculars,
                            fostering growth and innovation.
                        </p>
                        <p>
                            Through engaging events, skill-building workshops,
                            and impactful initiatives, we aim to empower students
                            to become leaders, innovators, and contributors to society.
                            Together, we aspire to make a lasting difference both on campus and beyond.
                        </p>
                        {isknowMore && <button className="mission-btn" onClick={() => navigate("/about")}>Know More</button>}
                    </div>

                </div>
            </div>
            <div className="mission-container-right">

                <div className="mission-body-right">
                    <div className="mission-content-right">
                        <h3>Our Vision</h3>
                        <p>
                            At CollegeClubs, our vision is to nurture a community where every
                            student is empowered to explore, innovate, and excel. We envision
                            a platform that seamlessly blends academic learning with real-world
                            experiences, allowing students to discover their true potential.
                        </p>
                        <p>
                            We aspire to create an environment that encourages leadership,
                            creativity, and social responsibility, preparing students to
                            tackle the challenges of tomorrow. Through collaboration, diverse
                            opportunities, and continuous support, we aim to inspire the next
                            generation of thinkers, problem-solvers, and change-makers, not
                            only within our campus but across the globe.
                        </p>
                        {isknowMore && <button className="mission-btn" onClick={() => navigate("/about")}>Know More</button>}
                    </div>

                </div>
                <div className="mission-img-right">
                    <img src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1719822532/cld-sample-3.jpg" alt="mission-img" />
                </div>
            </div>

        </div>
    )
}