'use client'
import React from "react"
import { TypeAnimation } from 'react-type-animation';

export default function TextAnimation(){
    return(
        <h4 className="heading fw-bold text-white title-dark mb-3">We will help you find <br/> your
        <TypeAnimation
            sequence={[
                'Wonderful',
                1000, 
                'Dream',
                1000,
            ]}
            wrapper="span"
            speed={5}
            repeat={Infinity}
            className="typewrite text-primary ms-2"
            cursor={false}
        /> home</h4>
    )
}