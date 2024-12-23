import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PropertyType(){

    let data = [
        {
            image: '/images/icons/house.png',
            name: 'Houses',
            title: '46 Listings'
        },
        {
            image: '/images/icons/bungalow.png',
            name: 'Villas',
            title: '124 Listings'
        },
        {
            image: '/images/icons/buildings.png',
            name: 'Apartments',
            title: '265 Listings'
        },
        {
            image: '/images/icons/commercial.png',
            name: 'Commercial',
            title: '452 Listings'
        },
        {
            image: '/images/icons/industries.png',
            name: 'Industries',
            title: '12 Listings'
        },
    ]
    return(
        <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4 mt-0">
            {data.map((item,index) => {
                return(
                <div className="col" key={index}>
                    <div className="categories position-relative overflow-hidden rounded-3 p-4 text-center">
                        <Image src={item.image} width={65} height={65} className="avatar avatar-small" alt="Townter"/>

                        <div className="mt-4">
                            <Link href="" className="title text-dark fs-5 fw-medium">{item.name}</Link>
                            <p className="text-muted small mb-0">{item.title}</p>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
    )
}