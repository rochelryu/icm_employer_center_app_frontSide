'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";


import { horodatage } from "../../../utils/date/horodatage";

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import '../../../node_modules/tiny-slider/dist/tiny-slider.css';

export default function ProprtySlider({jobs}){
    let settings = {
        container: '.tiny-slide-three',
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
        nav: false,
        speed: 400,
        gutter: 0,
        responsive: {
            1025: {
                items: 3
            },

            992: {
                items: 2
            },

            767: {
                items: 2
            },

            320: {
                items: 1
            },
        },
      };
    return(
            <div className="row">
                <div className="col-12">
                    <div className="tiny-slide-three">
                        <TinySlider settings={settings}>
                            {jobs.map((item,index)=>{
                                return(
                                    <div className="tiny-slide" key={index}>
                                        <div className="card property border-0 shadow position-relative overflow-hidden rounded-3 m-3">
                                            <div className="property-image position-relative overflow-hidden shadow">
                                                <Image src={'/images/property/offre.jpg'} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                                
                                            </div>
                                            <div className="card-body content p-4">
                                                <Link href={`/job/${item._id}`} className="title fs-5 text-dark fw-medium">{item.title}</Link>
                
                                                <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                                                    <li className="d-flex align-items-center me-3">
                                                        <i className="mdi mdi-tag-multiple fs-5 me-2 text-primary"></i>
                                                        <span className="text-muted">{ item.contractType}</span>
                                                    </li>
                                                    <li className="d-flex align-items-center">
                                                        <i className="mdi mdi-table-account fs-5 me-2 text-primary"></i>
                                                        <span className="text-muted">{ item.location}</span>
                                                    </li>
                                                </ul>
                                                <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                                                    <li className="list-inline-item mb-0">
                                                        <span className="text-muted">Prétention salaire</span>
                                                        <p className="fw-medium mb-0">{ item.salaryRange} Frs</p>
                                                    </li>
                                                    <li className="list-inline-item mb-0 text-muted">
                                                        <span className="text-muted">Publié depuis</span>
                                                        <ul className="fw-medium text-warning list-unstyled mb-0">
                                                        {horodatage(new Date(item.postedAt)) }
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </TinySlider>
                    </div>
                </div>
            </div>
    )
}