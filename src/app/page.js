"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// import VideoOne from "./components/modalVideo/videoOne";
import Counter from "./components/counter/counter";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollTop from "./components/scrollTop";
import PropertyTwo from "./components/propertyTwo";
// import Broker from "./components/broker";
import GetInTuch from "./components/getInTuch";
import CategoriesTwo from "./components/categoriesTwo";
import JobOfferService from "../../services/jobOfferService";
// import Blog from "./components/blog";
import { useRouter } from 'next/navigation';

export default function IndexSix(){
    const router = useRouter();
    const [jobs, setJobs] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        loadData()
    }, []);

    const loadData = async () => {
        const response = await JobOfferService.getJobOfferAvailable();
        setJobs(response.result)
    }


    return(
        <>
        <Navbar navClass="defaultscroll sticky" menuClass = "navigation-menu nav-left"/>
        <section className="position-relative mt-5 pt-4">
            <div className="container-fluid px-lg-5 px-2 mt-2">
                <div className="bg-half-260 d-table w-100 shadow rounded-3 overflow-hidden" id="home">
                    <div className="bg-overlay" style={{backgroundImage:"url('/images/bg/icm.jpg')", backgroundPosition:'top', backgroundRepeat:'no-repeat', backgroundAttachment:'fixed'}} id="hero-images"></div>
                    <div className="bg-overlay bg-black opacity-50"></div>

                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="title-heading">
                                    <h4 className="heading fw-bold text-white title-dark mb-3">Votre plateforme de recherche d&apos;emploi</h4>
                                    <p className="para-desc text-white title-dark mb-0">Une plateforme idéale pour chercher du boulot.</p>
                                
                                    <div className="subscribe-form mt-4">
                                        <form className="me-auto" onSubmit={(e) => {
                                            e.preventDefault()
                                            router.push(`/joblist?search=${search}`)
                                        }}>
                                            <div className="mb-0">
                                                <input type="text" id="help" name="name" value={search} onChange={(e) => {setSearch(e.target.value)}} className="shadow rounded-3 bg-white" required="" placeholder="Jardinier, chauffeur, developpeur, etc..."/>
                                                <button type="submit" className="btn btn-primary rounded-3">Rechercher</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="section pt-5">
            <CategoriesTwo jobs={jobs} />
            
                <div className="container mt-100 mt-60">
                    <PropertyTwo jobs={jobs} />
                </div>

                <div className="container mt-100 mt-60">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="about-left">
                            <div className="position-relative shadow p-2 rounded-top-pill rounded-5 bg-white img-one">
                                <Image src='/images/hero.jpg' width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid rounded-top-pill rounded-5" alt=""/>
    
                                {/* <VideoOne/> */}

                                {/* <div className="position-absolute top-0 start-0 z-n1">
                                    <Image src="/images/svg/dots.svg" width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="avatar avatar-xl-large" alt=""/>
                                </div> */}
                            </div>

                            <div className="img-two shadow rounded-3 overflow-hidden p-2 bg-white">
                                <Image src="/images/1.jpg" width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid rounded-3" alt=""/>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="section-title ms-lg-5">
                            <h6 className="text-primary fw-medium mb-2">Les meilleurs programmes & formations</h6>
                            <h4 className="title mb-3">Venez apprendre avec nos professionnel du metier,<br/> monter rapidement en expérience</h4>
                            <p className="text-muted para-desc mb-0">+400 formations</p>
                        
                            <div className="mt-4">
                                <Link href="/formations" className="btn btn-pills btn-primary">En savoir plus <i className="mdi mdi-arrow-right align-middle"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-100 mt-60">
                <div className="position-relative overflow-hidden rounded-3 shadow py-5" style={{backgroundImage:"url('/images/bg/05.jpg')",backgroundPosition:'center' , backgroundAttachment:'fixed'}}>
                    <div className="bg-overlay"></div>
                    <div className="container">
                        <Counter/>
                    </div>
                </div>
            </div>

            {/* <div className="container mt-100 mt-60">
                <Broker/>
            </div> */}

            {/* <div className="container mt-100 mt-60">
                <Blog/>
            </div> */}

            <div className="container mt-100 mt-60">
                <GetInTuch/>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}