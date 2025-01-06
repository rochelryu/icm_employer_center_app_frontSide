"use client"

import React, { useState, useEffect, Suspense} from "react";
import Link from "next/link";
import Image from "next/image";
import JobOfferService from "../../../services/jobOfferService";

import SelectOne from "../components/select/selectOne";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import { useRouter, useSearchParams } from 'next/navigation';
import { horodatage } from "../../../utils/date/horodatage";

function JobListComponent(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState(searchParams.get('search') ?? '')

  const handleSearchItem = async () => {
    await getJob()
  }

    useEffect(() => {
          getJob()
    }, [search]);

    const getJob = async () => {
        try {
            const items = search ? {search} : null
            const allJobs = await JobOfferService.getJobOfferAvailable(items)
                if(allJobs.etat) {
                setJobs(allJobs.result)
            }
        } catch (error) {
            LocalService.clear()
            router.push('/')
        }
        
    }


    return(
        <>
        <Navbar navClass="defaultscroll sticky" logolight={true} menuClass = "navigation-menu nav-left nav-light"/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:"url('/images/bg/06.jpg')"}}>
            <div className="bg-overlay bg-gradient-overlay-2"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        {
                            search && (
                                <div className="title-heading text-center">
                                    <p className="text-white-50 para-desc mx-auto mb-0">Récherche de</p>
                                    <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">{search}</h5>
                                </div>
                            )
                        }
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
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="features-absolute">
                            <div className="card border-0 bg-white shadow mt-5">
                                <SelectOne search={search} onChange={(e) => {setSearch(e.target.value)}} handleSearchItem={handleSearchItem}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row g-4 mt-0">
                    {jobs.map((item,index) =>{
                        return(
                            <div className="col-lg-6 col-12" key={index}>
                                <Link href={`/job/${item._id}`}>
                                
                                <div className="card property property-list border-0 shadow position-relative overflow-hidden rounded-3">
                                    <div className="d-md-flex">
                                        <div className="property-image position-relative overflow-hidden shadow flex-md-shrink-0 rounded-3 m-2">
                                            <Image src={'/images/property/offre.jpg'} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid h-100 w-100" alt=""/>
                                            
                                        </div>
                                        <div className="card-body content p-3">
                                            {/* <Link href={`/property-detail/${item.id}`} className="title fs-5 text-dark fw-medium">{item.title}</Link> */}
                                            <h3 className="title fs-5 text-dark fw-medium">{item.title}</h3>

                                            <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                                                <li className="d-flex align-items-center me-3">
                                                    <i className="mdi mdi-tag-multiple fs-5 me-2 text-primary"></i>
                                                    <span className="text-muted">{item.contractType}</span>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <i className="mdi mdi-table-account fs-5 me-2 text-primary"></i>
                                                    <span className="text-muted">{item.location}</span>
                                                </li>
                                            </ul>
                                            <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                                                <li className="list-inline-item mb-0">
                                                    <span className="text-muted">Prétention salaire</span>
                                                    <p className="fw-medium mb-0">{item.salaryRange} Frs</p>
                                                </li>
                                                <li className="list-inline-item mb-0 text-muted">
                                                    <p className="text-muted text-end m-0">Publié depuis</p>
                                                    <ul className="fw-medium text-warning list-unstyled mb-0">
                                                        {horodatage(new Date(item.postedAt)) }
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                </Link>
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
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}

export default function List() {
    return (
        <Suspense fallback={<></>}>
            <JobListComponent />
        </Suspense>
    );
}