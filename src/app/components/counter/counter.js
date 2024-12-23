'use client'
import React from "react";

import CountUp from 'react-countup';

export default function Counter(){
    return(
        <>
        <div className="row">
            <div className="col-md-4 col-xs-12 py-3">
                <div className="counter-box text-center">
                    <h1 className="mb-0 text-white fw-bold"><CountUp start={0} end={154} className="counter-value"/>+</h1>
                    <h6 className="counter-head text-white fs-5 fw-semibold mb-0">Offres d&apos;emploie</h6>
                </div>
            </div>

            <div className="col-md-4 col-xs-12 py-3">
                <div className="counter-box text-center">
                    <h1 className="mb-0 text-white fw-bold"><CountUp start={0} end={405} className="counter-value"/>+</h1>
                    <h6 className="counter-head text-white fs-5 fw-semibold mb-0">Programmes Formations</h6>
                </div>
            </div>

            <div className="col-md-4 col-xs-12 py-3">
                <div className="counter-box text-center">
                    <h1 className="mb-0 text-white fw-bold"><CountUp start={0} end={113} className="counter-value"/>+</h1>
                    <h6 className="counter-head text-white fs-5 fw-semibold mb-0">Entreprises</h6>
                </div>
            </div>
        </div>
        </>
    )
}