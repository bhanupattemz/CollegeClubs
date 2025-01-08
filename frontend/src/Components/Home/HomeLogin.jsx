import { useState } from 'react'
import './HomeLogin.css'
import { useNavigate } from "react-router-dom"
export default function HomeLogin() {
    const navigate = useNavigate()
    const [mail, setMail] = useState()
    return (
        <div className='home-login-main'>
            <div className='home-login-img'>
                <img src="https://res.cloudinary.com/delc5g3p5/image/upload/v1729762201/samples/people/bicycle.jpg" alt="home-login-img" />
            </div>
            <div className='home-login-body'>
                <div>
                    <h2>Join our club to participate in events, share ideas, and connect with peers!</h2>
                    <div className='home-login-email'>
                        <input type="text" onChange={(e) => setMail(e.target.value)} placeholder='Enter your Email Address' />
                        <button onClick={() => navigate(`/signup?mail=${mail}`)}>Sign Up</button>
                    </div>
                </div>

            </div>
        </div>
    )
}