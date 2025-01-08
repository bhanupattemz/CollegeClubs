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
        height: "300px",
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
                        <h3>{video ? video.snippet.title : "JNTUA CEA | Highlights of Student Club Activities - Club AVs Compilation"}</h3>
                        <div>
                            <h4>Description :</h4>
                            <p>{video ? video.snippet.description : "Explore the vibrant and dynamic student life at JNTUA CEA through this exciting compilation of Club AVs! Each video offers a unique glimpse into the diverse activities, events, and initiatives organized by the various student clubs at JNTUA College of Engineering Anantapur."}</p>
                        </div>
                    </div>
                    <div>
                        <YouTube videoId={video ? video.id.videoId : "vqzFFK962aw"} opts={opts} />
                    </div>

                </div>
            </div>
        </Fragment>

    );
}
