"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {Spin} from 'antd'
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import TrainingService from "../../../services/trainingService";
import { formatDate } from "../../../utils/date/horodatage";
import {baseUrlAssetFormations} from "../../../constants/serveur/serveur";

export default function GridSidebar(){
    const [search, setSearch] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [trainings, setTrainings] = useState([])
    const [initialTrainings, setInitialTrainings] = useState([])

    useEffect(() => {
        loadData()
    }, []);

    const loadData = async (item) => {
        const response = await TrainingService.getTrainings(item);
        setTrainings(response.result)
        if(!item) {
            setInitialTrainings(response.result)
        }
    }

    const searchItem = async (e) => {
        e.preventDefault();

        if(search.length > 2 && !isSearching) {
            setIsSearching(true)
            await loadData({search})
            setIsSearching(false)
        } else {
            setTrainings(initialTrainings)
        }
    }


    return(
        <>
        <Navbar navClass="defaultscroll sticky" logolight={true} menuClass = "navigation-menu nav-left nav-light"/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:"url('/images/1.jpg')"}}>
            <div className="bg-overlay bg-gradient-overlay-2"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <p className="text-white-50 para-desc mx-auto mb-0">Des formations de qualité adaptée à tous les besoins</p>
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Formations de qualité</h5>
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
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="card bg-white p-4 rounded-3 shadow sticky-bar">
                            <div>
                                <h6 className="mb-0">Rechercher une formations</h6>

                                <div className="search-bar mt-2">
                                    <div id="itemSearch2" className="menu-search mb-0">
                                        <form role="search" method="get" id="searchItemform2" className="searchform">
                                            <input type="text" className="form-control rounded-3 border" value={search} onChange={(e)=> {
                                                if(e.target.value.trim() === 0) {
                                                    setTrainings(initialTrainings)
                                                }
                                                setSearch(e.target.value)
                                            }} id="searchItem2" placeholder="par titre ou professeur"/>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button className={"btn w-100 " + (isSearching ? 'btn-light' : 'btn-primary')} type="button" onClick={searchItem}> {isSearching ? <Spin /> : 'Rechercher'}</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-6 col-12">
                        <div className="row g-4">
                            {trainings.map((item, index) =>{
                                return(
                                <div className="col-lg-6 col-12" key={`formation_${index}`}>
                                    <div className="card property border-0 shadow position-relative overflow-hidden rounded-3">
                                        <div className="property-image position-relative overflow-hidden shadow">
                                            <Image src={`${baseUrlAssetFormations}/${item.cover}`} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                            
                                        </div>
                                        <div className="card-body content p-4">
                                            <Link href={`/formations/${item._id}`} className="title fs-5 text-dark fw-medium">{item.title}</Link>

                                            <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                                                <li className="d-flex align-items-center me-3">
                                                    <i className="mdi mdi mdi-account-group-outline fs-5 me-2 text-primary"></i>
                                                    <span className="text-muted">{item.participants.length}</span>
                                                </li>
                                                
                                                <li className="d-flex align-items-center me-3">
                                                    <i className="mdi mdi mdi-map-marker fs-5 me-2 text-primary"></i>
                                                    <span className="text-muted">{item.location}</span>
                                                </li>
                                            </ul>
                                            <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                                                <li className="list-inline-item mb-0">
                                                    <span className="text-muted">Debut</span>
                                                    <p className="fw-medium mb-0">{formatDate(item.startDate)}</p>
                                                </li>
                                                <li className="list-inline-item mb-0 ">
                                                    <span className="text-muted text-end">Fin</span>
                                                    <p className="fw-medium mb-0">{formatDate(item.endDate)}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
        
                        {/* <div className="row">
                            <div className="col-12 mt-4 pt-2">
                                <ul className="pagination justify-content-center mb-0">
                                    <li className="page-item">
                                        <Link className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true"><i className="mdi mdi-chevron-left fs-6"></i></span>
                                        </Link>
                                    </li>
                                    <li className="page-item"><Link className="page-link" href="#">1</Link></li>
                                    <li className="page-item active"><Link className="page-link" href="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link" href="#">3</Link></li>
                                    <li className="page-item">
                                        <Link className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true"><i className="mdi mdi-chevron-right fs-6"></i></span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>
                
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}



