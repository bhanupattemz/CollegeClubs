import "./Home.css"
import Carousel from "./Carousel"
import Annoucements from "./Announcements";
import Numbers from "./Numbers";
import HomeLogin from "./HomeLogin";
import HomeGallery from "./HomeGallery"
import HomeEvents from "./HomeEvents";
import YoutubeBlock from "./YoutubeBlock"
import Mission from "./Mission";
import ClubFestSection from "./ClubFestSection"
export default function Home() {

    return (
        <main className="home">
            <section>
                <Annoucements />
            </section>
            <section className="carousel">
                <Carousel />
            </section>
            <section className="youtube-section">
                <YoutubeBlock />
            </section>
            <section>
                <Numbers />
            </section>
            <section>
                <Mission />
            </section>
            <section>
                <HomeLogin />
            </section>
            <section className="home-event-section">
                <HomeEvents />
            </section>
            <section>
                <ClubFestSection />
            </section>
            <section>
                <HomeGallery />
            </section>
        </main>
    )
}