import React from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import { blogData } from "../data/data";

export default function Blogs(){
    return(
        <>
        <Navbar navClass="defaultscroll sticky" logolight={true} menuClass = "navigation-menu nav-left nav-light"/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:"url('/images/bg/03.jpg')"}}>
            <div className="bg-overlay bg-gradient-overlay-2"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <p className="text-white-50 para-desc mx-auto mb-0">Latest News</p>
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Blogs & News</h5>
                        </div>
                    </div>
                </div>
                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Link href="/">Towntor</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Blog</li>
                        </ul>
                    </nav>
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
                    {blogData.map((item,index) =>{
                        return(
                            <div className="col-lg-4 col-md-6" key={index}>
                                <div className="card blog blog-primary shadow rounded-3 overflow-hidden border-0">
                                    <div className="card-img blog-image position-relative overflow-hidden rounded-0">
                                        <div className="position-relative overflow-hidden">
                                            <Image src={item.image}  width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                            <div className="card-overlay"></div>
                                        </div>

                                        <div className="blog-tag p-3">
                                            <Link href="" className="badge bg-primary">{item.tag}</Link>
                                        </div>
                                    </div>

                                    <div className="card-body content p-0">
                                        <div className="p-4">
                                            <Link href={`/blog-detail/${item.id}`} className="title fw-medium fs-5 text-dark">{item.title}</Link>
                                            <p className="text-muted mt-2">{item.desc}</p>

                                            <Link href="" className="text-dark read-more">Read More <i className="mdi mdi-chevron-right align-middle"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>

                <div className="row">
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
                </div>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}
