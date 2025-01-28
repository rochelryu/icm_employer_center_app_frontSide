'use client'
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

export default function IndexThreeSlider(){
    return(
        <section className="swiper-slider-hero position-relative d-block vh-100" id="home">
            <Carousel infiniteLoop={true} className="vh-100" autoPlay={true} showThumbs={false} showStatus={false}>
                <div className="slide-inner slide-bg-image d-flex align-items-center vh-100" style={{backgroundImage:"url('/images/bg/icm.jpg')"}}>
                    <div className="bg-overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="title-heading text-start">
                                    <h1 className="heading fw-bold text-white title-dark mb-3">10765 Hillshire Ave, <br/> Baton Rouge, LA 70810, USA</h1>
                                    <p className="para-desc text-white-50 title-dark mb-0">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                                    
                                    <div className="mt-4 pt-2">
                                        <Link href="#" className="btn btn-pills btn-primary">View Details <i className="mdi mdi-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide-inner slide-bg-image d-flex align-items-center vh-100" style={{backgroundImage:"url('/images/bg/04.jpg')"}}>
                    <div className="bg-overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="title-heading text-start">
                                    <h1 className="heading fw-bold text-white title-dark mb-3">10765 Hillshire Ave, <br/> Baton Rouge, LA 70810, USA</h1>
                                    <p className="para-desc text-white-50 title-dark mb-0">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                                    
                                    <div className="mt-4 pt-2">
                                        <Link href="#" className="btn btn-pills btn-primary">View Details <i className="mdi mdi-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide-inner slide-bg-image d-flex align-items-center vh-100" style={{backgroundImage:"url('/images/bg/05.jpg')"}}>
                    <div className="bg-overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="title-heading text-start">
                                    <h1 className="heading fw-bold text-white title-dark mb-3">10765 Hillshire Ave, <br/> Baton Rouge, LA 70810, USA</h1>
                                    <p className="para-desc text-white-50 title-dark mb-0">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                                    
                                    <div className="mt-4 pt-2">
                                        <Link href="#" className="btn btn-pills btn-primary">View Details <i className="mdi mdi-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
            </Carousel>
        </section>
    )
}

