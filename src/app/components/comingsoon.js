'use client'
import React, { useState, useEffect } from "react";
export default function Comingsoons(){
    let [days,setDays] = useState();
    let [hours,setHours] = useState();
    let [minutes,setMinutes] = useState();
    let [seconds,setSeconds] = useState();
    let deadline = "December, 31, 2024";
  
    let getTime = () => {
      let time = Date.parse(deadline) - Date.now();
  
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };
  
    useEffect(() => {
      let interval = setInterval(() => getTime(deadline), 1000);
  
      return () => clearInterval(interval);
    }, []);
    return(
        <ul className="count-down list-unstyled">
            <li id="days" className="count-number list-inline-item m-2">{days}<p className="count-head">Days</p></li>
            <li id="hours" className="count-number list-inline-item m-2 m-2"> {hours}
                <p className="count-head">Hours</p>
            </li>
            <li id="mins" className="count-number list-inline-item m-2 m-2">{minutes}
                <p className="count-head">Mins</p>
            </li>
            <li id="secs" className="count-number list-inline-item m-2 m-2">{seconds}
                <p className="count-head">Secs</p>
            </li>
            <li id="end" className="h1"></li>
        </ul>
    )
}