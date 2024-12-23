'use client'
import React, { useEffect } from "react";

export default function Brokerage(){
    useEffect(() => {
        const rangeSlider = document.getElementById('slider');
        const value = rangeSlider.value;
        document.getElementById('amount-label').innerHTML = value;
        document.getElementById('saving-label').innerHTML = parseFloat(value * 0.01).toFixed(2);
        window.scrollTo(0, 0)
    });

    const handleChange = (e) => {
        const value = e.target.value;
        document.getElementById('amount-label').innerHTML = value;
        document.getElementById('saving-label').innerHTML = parseFloat(value * 0.01).toFixed(2);
    }
    return(
        <div className="col-lg-8 col-12">
            <div className="p-4 shadow rounded-3" role="form">
                <ul className="list-unstyled d-flex justify-content-between mb-0">
                    <li className="h6 mb-0">Min $ 10000</li>
                    <li className="h6 mb-0">Max $ 200000</li>
                </ul>

                <div className="row">
                    <div className="col-sm-12 mb-4">
                        <label htmlFor="slider" className="form-label"></label>
                        <input type="range" onInput={handleChange} defaultValue="10000" min="10000" max="200000" className="form-range custom-range" id="slider"/>
                    </div>
                </div>

                <ul className="list-unstyled text-center d-md-flex justify-content-between mb-0">
                    <li>
                        <ul className="mb-0 text-md-start brokerage-form list-unstyled">
                            <li className="h5 mb-0"><label className="control-label">Total Value ($)</label></li>
                            <li className="h5 mb-0"><input type="hidden" id="amount" className="form-control"/><span className="text-primary">$</span> <p className="mb-0 d-inline-block h5 text-primary" id="amount-label"></p></li>
                        </ul>
                    </li>

                    <li className="mt-2 mt-sm-0">
                        <ul className="mb-0 text-md-end brokerage-form list-unstyled">
                            <li className="h5 mb-0"><label className="control-label">Brokerage Fee</label></li>
                            <li className="h5 mb-0"><input type="hidden" id="saving" className="form-control mb-0"/><span className="text-primary">$</span> <p className="mb-0 d-inline-block h5 text-primary" id="saving-label"></p></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}