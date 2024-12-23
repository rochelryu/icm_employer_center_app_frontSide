import React from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../components/navbar";
import About from "../components/about";
import Blog from "../components/blog";
import GetInTuch from "../components/getInTuch";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import Broker from "../components/broker";
import AboutCounter from "../components/counter/aboutCounter";
import VideoOne from "../components/modalVideo/videoOne";


export default function AboutUs(){
    return(
        <>
        <Navbar navClass="defaultscroll sticky" logolight={true} menuClass = "navigation-menu nav-left nav-light"/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:"url('/images/bg/03.jpg')"}}>
            <div className="bg-overlay bg-gradient-overlay-2"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <p className="text-white-50 para-desc mx-auto mb-0">Our story: Towntor</p>
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">About Us</h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="position-relative">
            <div className="shape overflow-hidden text-white">
                <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
        <section className="section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="about-left">
                            <div className="position-relative shadow p-2 rounded-top-pill rounded-5 bg-white img-one">
                                <Image src="/images/hero.jpg" width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid rounded-top-pill rounded-5" alt=""/>
    
                               <VideoOne/>
                                <div className="position-absolute top-0 start-0 z-n1">
                                    <Image src="/images/svg/dots.svg" width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="avatar avatar-xl-large" alt=""/>
                                </div>
                            </div>

                            <div className="img-two shadow rounded-3 overflow-hidden p-2 bg-white">
                                <Image src='/images/1.jpg' width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid rounded-3" alt=""/>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="section-title ms-lg-5">
                            <h6 className="text-primary fw-medium mb-2">Our story: Towntor</h6>
                            <h4 className="title mb-3">Efficiency. <br/> Transparency. Control.</h4>
                            <p className="text-muted para-desc mb-0">Towntor developed a platform for the Real Estate marketplace that allows buyers and sellers to easily execute a transaction on their own. The platform drives efficiency, cost transparency and control into the hands of the consumers. Towntor is Real Estate Redefined.</p>
                        
                            <div className="mt-4">
                                <Link href="/aboutus" className="btn btn-pills btn-primary">Read More <i className="mdi mdi-arrow-right align-middle"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <About/>
            </div>

            <div className="container-fluid bg-building-pic mt-100 mt-60">
                <div className=" opacity-25 position-absolute w-100 h-100 top-0 start-0" style={{backgroundImage:"url('/images/map.png')" , backgroundPosition:'center'}}></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="section-title text-center mb-4 pb-2">
                                <h4 className="title mb-3">Trusted by more than 10K users</h4>
                                <p className="text-muted para-desc mb-0 mx-auto">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                            </div>
                        </div>
                    </div>

                   <AboutCounter/>
                </div>
            </div>

            <div className="container mt-100 mt-60">
               <Broker/>
            </div>

            <div className="container mt-100 mt-60">
                <Blog/>
            </div>

            <div className="container mt-100 mt-60">
               <GetInTuch/>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}
