import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesTwo({jobs}){

    let data = [
        {
            image:'/images/property/cdi.jpg',
            name:'CDI',
            listings: `${jobs.filter(job => job.contractType === 'CDI').length} Disponibles`
        },
        {
            image:'/images/property/cdd.jpg',
            name:'CDD',
            listings:`${jobs.filter(job => job.contractType === 'CDD').length} Disponibles`
        },
        {
            image:'/images/property/Freelance.jpg',
            name:'Freelance',
            listings:`${jobs.filter(job => job.contractType === 'Freelance').length} Disponibles`
        },
        {
            image:'/images/property/stage.jpg',
            name:'Stage',
            listings:`${jobs.filter(job => job.contractType === 'Stage').length} Disponibles`
        },
        {
            image:'/images/property/sous-traitance.jpg',
            name:'Sous-traitance',
            listings:`${jobs.filter(job => job.contractType === 'Sous-traitance').length} Disponibles`
        },
    ]
    return(
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 mt-sm-0 pt-sm-0">
                        <div className="features-absolute">
                            <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4 mt-0">
                                {data.map((item, index) => {
                                    return(
                                        <div className="col" key={index}>
                                            <div className="categories position-relative overflow-hidden rounded-3 shadow">
                                                <Image src={item.image} width={0} height={0} sizes="100vw" style={{width:'100%', height:140}}  alt=""/>

                                                <div className="p-3">
                                                    <Link href={`/joblist?search=${item.name}`}  className="title text-dark fs-5 fw-medium">{item.name}</Link>
                                                    <p className="text-muted small mb-0">{item.listings}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}