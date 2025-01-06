'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";


import { formatDate } from "../../../utils/date/horodatage";
import {baseUrlAssetFormations} from "../../../constants/serveur/serveur";

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import '../../../node_modules/tiny-slider/dist/tiny-slider.css';

export default function ProprtyFormation({formations}){
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
                            {formations.map((item,index)=>{
                                return(
                                    <div className="tiny-slide" key={`formation_${item._id}`}>
                                        <div className="card property border-0 shadow position-relative overflow-hidden rounded-3 m-3">
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
                        </TinySlider>
                    </div>
                </div>
            </div>
    )
}