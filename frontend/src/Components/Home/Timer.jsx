import React from "react";
import { useTimer } from "react-timer-hook";
import "./Timer.css"
const Timer = ({ time }) => {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + (new Date(time).getTime() - Date.now()) / 1000);

    const { seconds, minutes, hours, days } = useTimer({
        expiryTimestamp,
        onExpire: () => console.log("Timer expired!")
    });

    return (
        <div className="timer">
            <div className="timer-data">
                <div>

                    <div>{days}</div>
                </div>
                <div>:</div>
                <div>

                    <div>{hours}</div>
                </div>
                <div>:</div>
                <div>

                    <div>{minutes}</div>
                </div>
                <div>:</div>
                <div>
                    <div>{seconds}</div>
                </div>
            </div>
            <div>
                <p><b>Remaining</b></p>
            </div>

        </div>
    );
};

export default Timer;
