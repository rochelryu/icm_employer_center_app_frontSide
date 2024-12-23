'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import '../../../node_modules/tiny-slider/dist/tiny-slider.css';

import ModalVideo from 'react-modal-video';
import "../../../node_modules/react-modal-video/css/modal-video.css"

import Lightbox from 'react-18-image-lightbox';
import "../../../node_modules/react-18-image-lightbox/style.css"

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

export default function AboutRight(){
    let [video, setModalVideo] = useState(false)
    let [currentImageIndex, setCurrentImageIndex] = useState(0);
    let [open, setIsOpen] = useState(false);

    let bannerImg = ['/images/property/single/1.jpg', '/images/property/single/2.jpg', '/images/property/single/3.jpg', '/images/property/single/4.jpg',]
    let heroImg = ['/images/property/single/1.jpg', '/images/property/single/2.jpg', '/images/property/single/3.jpg', '/images/property/single/4.jpg', '/images/about.jpg']

   let handleMovePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + heroImg.length - 1) % heroImg.length);
    };

    let handleMoveNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImg.length);
    };

    let handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setIsOpen(true);
    };

    let currentImage = heroImg[currentImageIndex];
    return(
    <div className="about-right">
        <div className="position-relative shadow p-2 rounded-top-pill rounded-5 bg-white img-one">
            <Link href="#" scroll={false} onClick={() => handleImageClick(4)} className="lightbox" title="">
                <Image src="/images/about.jpg" width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid rounded-top-pill rounded-5" alt=""/>
            </Link>

            <div className="cta-video">
                <Link href="#!" scroll={false} onClick={() => setModalVideo(true)} className="avatar avatar-md-md rounded-pill shadow card d-flex justify-content-center align-items-center lightbox">
                    <i className="mdi mdi-play mdi-24px text-primary"></i>
                </Link>
            </div>
            <ModalVideo
                channel="youtube"
                youtube={{ mute: 0, autoplay: 0 }}
                isOpen={video}
                videoId="yba7hPeTSjk"
                onClose={() => setModalVideo(false)} 
            />

            <div className="position-absolute top-0 end-0 z-n1">
                <Image src='/images/svg/dots.svg' width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="avatar avatar-xl-large" alt=""/>
            </div>
        </div>

        <div className="img-two">
            <div className="tiny-one-item">
                <TinySlider settings={settings}>
                    {bannerImg.map((items,index) => {
                        return(
                        <div className="tiny-slide" key={index}>
                            <div className="m-2">
                                <div className="shadow rounded-3 overflow-hidden p-2 bg-white">
                                    <Link href="#" onClick={() => handleImageClick(index)} className="lightbox" title="">
                                        <Image src={items} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid rounded-3" alt=""/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </TinySlider>
            </div>
        </div>
        {open && (
            <Lightbox
                mainSrc={currentImage}
                prevSrc={heroImg[(currentImageIndex + heroImg.length - 1) % heroImg.length]}
                nextSrc={heroImg[(currentImageIndex + 1) % heroImg.length]}

                onCloseRequest={() => setIsOpen(false)}
                onMovePrevRequest={handleMovePrev}
                onMoveNextRequest={handleMoveNext}
            />
        )}
    </div>
    )
}