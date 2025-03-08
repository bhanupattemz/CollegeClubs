import "./YoutubeBlock.css";
import YouTube from "react-youtube";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { BACKENDURL } from "../Functionalities/functionalites"
export default function YoutubeBlock() {
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const opts = {
        height: "100%",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    useEffect(() => {
        const fetchLatestVideo = async () => {
            try {
                const response = await axios.get(`${BACKENDURL}/youtube/latest`);
                setVideo(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchLatestVideo();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Fragment>
            <div className="youtube-block">
                <h2>{!error ? "Our Latest Video" : "Our Youtube Video"}</h2>
                <div className="youtube-container">
                    <div className="youtube-content">
                        <h3>{video ? video.snippet.title : "Join College Clubs | Connect, Collaborate & Grow | Explore Events, Clubs & More! 🎓"}</h3>
                        <div className="youtube-description-p">
                            <h4>Description :</h4>
                            <p>{video ? video.snippet.description : `🎓 Welcome to College Clubs! 🚀
💡 Discover, Connect, and Collaborate with students who share your passion and interests. Our platform, College Clubs, is designed to help students:

✅ Create Clubs based on their interests (Music, Coding, Dance, etc.) 🎵💻💃
✅ Join Clubs to connect with like-minded students 💬
✅ Manage Events like workshops, competitions, and more 🎭📅
✅ Share Announcements and keep members informed 📢
✅ Showcase YouTube Videos from the college’s official YouTube Channel 🎥

👉 Stay updated with the latest events, announcements, and activities happening around your college. This platform is built to enhance your college life experience by encouraging collaboration and networking.`}</p>
                        </div>
                    </div>
                    <div>
                        <div className="youtube-video-container">
                            <YouTube videoId={video ? video.id.videoId : "9AE7_9LDZ8w"} opts={opts} />
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>

    );
}
