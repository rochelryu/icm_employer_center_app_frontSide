'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import '../../../node_modules/tiny-slider/dist/tiny-slider.css';

export default function PropertySliderTwo(){
    let images = ['/images/property/single/1.jpg', '/images/property/single/2.jpg', '/images/property/single/3.jpg', '/images/property/single/4.jpg', '/images/property/single/5.jpg']
    let settings = {
        container: '.tiny-one-item',
        items: 1,
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
      };
    return(
    <div className="tiny-one-item">
        <TinySlider settings={settings}>
            {images.map((item, index)=>{
                return(
                <div className="tiny-slide" key={index}>
                    <div className="m-md-2">
                        <Image src={item} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="shadow rounded-3 img-fluid" alt=""/>
                    </div>
                </div>
                )
            })}
        </TinySlider>
    </div>
    )
}