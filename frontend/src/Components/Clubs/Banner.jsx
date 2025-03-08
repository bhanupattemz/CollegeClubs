import "./Banner.css"
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function Banner({ link, heading, discription, btntext, btnlink, btnScroll, btnFunction, elements }) {
    const mainDivRef = useRef(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (mainDivRef && mainDivRef.current) {
            mainDivRef.current.style.backgroundImage = `url(${link})`
        }
    })
    return (
        <div className="banner-page" ref={mainDivRef}>
            <h1>{heading}</h1>
            {discription && <p>{discription}</p>}
            {elements}
            {btntext &&
                <button className="banner-btn" onClick={() => {
                    { btnlink && navigate(`${btnlink}`) }
                    { btnScroll && document.querySelector(btnScroll).scrollIntoView({ behavior: 'smooth' }) }
                    { btnFunction && btnFunction() }
                }}>{btntext}</button>}
        </div>
    )
}