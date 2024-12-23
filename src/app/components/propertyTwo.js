import React from "react";
import Link from "next/link";
import Image from "next/image";

import { horodatage } from "../../../utils/date/horodatage";

export default function PropertyTwo({jobs}){
    return(
        <>
            <div className="row justify-content-center">
                <div className="col">
                    <div className="section-title text-center mb-4 pb-2">
                        <h4 className="title mb-3">Offres tendance</h4>
                        <p className="text-muted para-desc mb-0 mx-auto">Retrouvé les meilleurs offres du moments qui font accrocher plus de 100 candidatures !!!</p>
                    </div>
                </div>
            </div>

            <div className="row g-4 mt-0">
                {jobs.slice(0,8).map((item, index) =>{
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
                
                
                <div className="col-12 mt-4 pt-2">
                    <div className="text-center">
                        <Link href="/joblist" className="mt-3 fs-6 text-primary">Voir plus d&apos;offres <i className="mdi mdi-arrow-right align-middle"></i></Link>
                    </div>
                </div>
            </div>
        </>
    )
}