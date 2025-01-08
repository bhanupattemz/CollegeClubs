import "./AboutUs.css"

import { useSelector, useDispatch } from "react-redux"
import { Fragment, useEffect, useState } from "react"
import { getallAdministrators } from "../../Actions/administrationAction"
import { FaRegHandPointRight } from "react-icons/fa";
import CoordinatorLeft from "./Coordinators/CoordinatorLeft"
import CoordinatorRight from "./Coordinators/CoordinatorRight"
import Mission from "../Home/Mission"
import { useNavigate } from "react-router-dom"
import { ConvertTime } from "../Functionalities/functionalites";
export default function AboutUs() {
    const { administrationTeam } = useSelector(state => state.administrationTeam)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPastTeam, setShowPastTeam] = useState(false)
    const [pastTeam, setPastTeam] = useState([])
    const [activeAdminTeam, setActiveAdminTeam] = useState([])
    useEffect(() => {
        if (!administrationTeam || administrationTeam.length == 0) {
            dispatch(getallAdministrators())
        }
    }, [])
    useEffect(() => {
        if (administrationTeam) {
            setActiveAdminTeam([])
            setPastTeam([])
            administrationTeam.map((item) => {
                if (item.isactive) {
                    setActiveAdminTeam(prev => [...prev, item])
                } else {
                    setPastTeam(prev => [...prev, item])
                }
            })
        }
    }, [administrationTeam])
    return (
        <main className="aboutus-page-main">
            <section className="aboutus-page-banner-section">
            </section>
            {showPastTeam ?
                <section className="aboutus-past-team">
                    <div>
                        <h2>Past Admnistration Team</h2>
                        <div className="past-adminstration-team-btn past-administation-go-back-btn">
                            <button onClick={() => setShowPastTeam(false)}>Go Back</button>
                        </div>
                    </div>

                    {pastTeam.length > 0 ? pastTeam.map((item, inx) => {
                        let timePeriod = `${ConvertTime(item.period.starting).split(",")[0].slice(3)} to ${ConvertTime(item.period.ending).split(",")[0].slice(3)}`
                        return (
                            <Fragment key={inx}>
                                {inx % 2 == 0 ?
                                    <Fragment>
                                        <CoordinatorLeft period={timePeriod} name={item.name} imageUrl={item.image?.url} typeText={item.position} description={item.description} />
                                    </Fragment> :
                                    <Fragment>
                                        <CoordinatorRight period={timePeriod} name={item.name} imageUrl={item.image?.url} typeText={item.position} description={item.description} />
                                    </Fragment>}
                            </Fragment>
                        )

                    }) :
                        <div className="empty-admin-team">
                            <h3> Administration Team Not Found</h3>
                        </div>
                    }
                </section> :
                <Fragment>
                    <section className="aboutus-page-introduction">
                        <h2>Who We Are</h2>
                        <div>
                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam qui excepturi itaque iusto fugiat voluptas dolorum debitis magnam, minima at soluta amet numquam repudiandae quos harum et. Ipsam, beatae itaque?
                                Possimus repudiandae dolor eius enim quam odio suscipit exercitationem quas impedit voluptatem iure corporis in, aperiam repellat, quos voluptates aliquam id! Veniam expedita doloribus, sapiente vel quia temporibus optio cupiditate.</p>
                        </div>
                    </section>
                    <section>
                        <Mission isknowMore={false} />
                    </section>
                    {administrationTeam &&
                        <section className="aboutus-page-administration-team">
                            <h2>Our Administration Team</h2>
                            <div>
                                {activeAdminTeam.length > 0 ? activeAdminTeam.map((item, inx) => {
                                    return (
                                        <Fragment key={inx}>
                                            {inx % 2 == 0 ?
                                                <CoordinatorLeft name={item.name} imageUrl={item.image?.url} typeText={item.position} description={item.description} /> :
                                                <CoordinatorRight name={item.name} imageUrl={item.image?.url} typeText={item.position} description={item.description} />}
                                        </Fragment>
                                    )

                                }) :
                                    <div className="empty-admin-team">
                                        <h3> Administration Team Not Found</h3>
                                    </div>
                                }
                                <div className="past-adminstration-team-btn">
                                    <button onClick={() => setShowPastTeam(true)}>View Past Team Members</button>
                                </div>
                            </div>

                        </section>
                    }
                    <section className="aboutus-page-benefits-sections">
                        <h2>Why You Should Join</h2>
                        <div>
                            <ul >
                                <li>
                                    <FaRegHandPointRight /> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique iusto sapiente, esse corrupti temporibus repellat? Nostrum porro libero, itaque quisquam perferendis amet tempore, inventore veniam nobis iure earum optio ipsum.</p>
                                </li>
                                <li>
                                    <FaRegHandPointRight /> <p>Soluta aspernatur libero delectus nesciunt sit repellendus quam, in consequuntur. Aut deserunt ea odio perspiciatis sed dolore. Labore rem at illo magnam minus assumenda velit, tempore nesciunt mollitia quasi sequi.</p>
                                </li>
                                <li>
                                    <FaRegHandPointRight /> <p>Itaque qui eius suscipit. Ea eligendi ipsam, nulla quasi dolorum perferendis suscipit consequuntur officia, a maiores totam doloribus fugit molestiae, et laboriosam eum dolorem reiciendis accusantium commodi iure quis voluptas.</p>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="aboutus-developer-section">
                        <h2>Meet the Developer</h2>
                        <div className="aboutus-developer-main">
                            <div className="aboutus-developer-content">
                                <h3>Hi, I'm Bhanu Prakash Pattem,</h3>
                                <div>
                                    <p> a CSE student at JNTUACEA and the proud developer of this website.
                                        With a keen interest in full-stack development and a love for solving problems
                                        through code, I've built this platform to bring our student community together.</p>
                                    <p>Feel free to explore, and don't hesitate to reach out if you have any suggestions or feedback!</p>
                                </div>
                                <h4>Let's build a stronger community. 😊</h4>
                            </div>
                            <div className="about-us-devloper-img">
                                <img src="https://res.cloudinary.com/delc5g3p5/image/upload/v1736265083/Clubs/iayyuqyktvsbx4g3vygr.png" alt="developer-img" />
                            </div>
                        </div>
                    </section>
                </Fragment>


            }

        </main>
    )
}