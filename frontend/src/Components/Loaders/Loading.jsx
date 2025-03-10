import { useEffect, useRef, useState } from "react";
import "./Loading.css";
import { wait } from "../Functionalities/functionalites";

export default function Loading() {
    const logoRef = useRef(null);
    const fullFormRef = useRef(null);
    const sliderRef = useRef(null)
    useEffect(() => {
        async function waitTime() {
            if (logoRef.current && fullFormRef.current && sliderRef.current) {
                logoRef.current.style.width = "0px";
                sliderRef.current.style.width = "0px"
                fullFormRef.current.style.width = "0px";
                await wait(500);
            }
            if (logoRef.current) {
                logoRef.current.style.width = "100px";
                logoRef.current.style.transform = "rotate(360deg)";
                await wait(500);
            }
            if (fullFormRef.current) {
                fullFormRef.current.style.width = "300px";
                await wait(200);
            }
            if (sliderRef.current) {
                sliderRef.current.style.width = "400px"
            }
        }
        waitTime();
    }, []);

    return (
        <main className="loading-main">
            <section className="loading-section">
                <div className="loading-logo-imgs">
                    <img
                        ref={logoRef}
                        src="https://res.cloudinary.com/dp6kibyv5/image/upload/v1740923421/clubs/odfvvkdukokbdkmqfywe.png"
                        alt="club-logo"
                    />
                    <img
                        ref={fullFormRef}
                        src="https://res.cloudinary.com/dp6kibyv5/image/upload/v1741019799/clubs/lsfmtf2yot7akvvffp9v.png"
                        alt="clubs-full-form"
                    />
                </div>
                <div ref={sliderRef} className="loading-move-container">
                    <div ></div>
                </div>
            </section>
        </main>
    );
}
