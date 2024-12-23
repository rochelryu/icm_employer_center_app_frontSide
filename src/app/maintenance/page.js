import React from "react";
import Image from "next/image";
import Maintenances from "../components/maintenance";

export default function Maintenance(){
 
    return(
        <section className="bg-home zoom-image d-flex align-items-center">
        <div className="bg-overlay image-wrap" style={{backgroundImage:"url('/images/bg/03.jpg')", backgroundPosition:'center'}}></div>
        <div className="bg-overlay bg-gradient-overlay"></div>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 text-center">
                    <Image src="/images/logo-icon-white.png" width={100} height={100} alt=""/>
                    <h1 className="text-white title-dark mt-4 mb-4">We are back soon...</h1>
                    <p className="text-white-50 para-desc mx-auto">Explore and learn more about everything from machine learning and global payments to scaling your team.</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center">
                   <Maintenances/>
                </div>
            </div>

            <div className="row mt-4 pt-2">
                <div className="col-12 text-center">
                    <div className="subscribe-form">
                        <form className="mx-auto" action="index.html">
                            <input name="email" id="email" type="email" className="rounded-pill bg-white" required="" placeholder="Your email :"/>
                            <button type="submit" className="btn btn-primary rounded-pill">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}