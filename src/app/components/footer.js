import React from "react";
import Link from "next/link";
import Image from "next/image";

import {FiLinkedin, FiMail, FiMapPin, FiPhone} from "../assets/icons/vander"

export default function Footer(){
    return(
        <>
        <section className="bg-building-pic d-table w-100" style={{backgroundImage:"url('/images/building.png')"}}></section>
        <footer className="bg-footer">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="footer-py-60 footer-border">
                            <div className="row">
                                <div className="col-lg-5 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
                                    <Link href="#" className="logo-footer">
                                        <Image src='/images/logo-light.png' width={69} height={70} alt=""/>
                                    </Link>
                                    <p className="mt-4">Une plateforme idéale pour chercher du boulot.</p>
                                    <ul className="list-unstyled social-icon foot-social-icon mb-0 mt-4">
                                        <li className="list-inline-item"><Link href="#" target="_blank" className="rounded-3"><FiLinkedin className="fea icon-sm align-middle"/></Link></li>
                                        <li className="list-inline-item"><Link href="mailto:employmentcenter@holding.com" className="rounded-3"><FiMail className="fea icon-sm align-middle"/></Link></li>
                                    </ul>
                                </div>
                                
                                
                                
                                {/* <div className="col-lg-2 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                                    <h5 className="footer-head">Liens utiles</h5>
                                    <ul className="list-unstyled footer-list mt-4">
                                        <li><Link href="#" className="text-foot"><i className="mdi mdi-chevron-right align-middle me-1"></i> Terms of Services</Link></li>
                                        <li><Link href="#" className="text-foot"><i className="mdi mdi-chevron-right align-middle me-1"></i> Privacy Policy</Link></li>
                                        <li><Link href="#" className="text-foot"><i className="mdi mdi-chevron-right align-middle me-1"></i> Listing</Link></li>
                                        <li><Link href="#" className="text-foot"><i className="mdi mdi-chevron-right align-middle me-1"></i> Contact us</Link></li>
                                    </ul>
                                </div> */}
            
                                <div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                                    <h5 className="footer-head">Contact Detail</h5>

                                    <div className="d-flex mt-4">
                                        <FiMapPin className="fea icon-sm text-primary mt-1 me-3"/>
                                        <div className="">
                                            <p className="mb-2">Vridi Zone portuaire, <br/> Rue de la métalurgie, 1125</p>
                                            <Link target='_blank' href="https://maps.app.goo.gl/X1wnxmmseucJvV8D6" className="text-primary lightbox">Voir sur Google map</Link>
                                        </div>
                                    </div>
        
                                    <div className="d-flex mt-4">
                                        <FiMail className="fea icon-sm text-primary mt-1 me-3"/>
                                        <Link href="mailto:employmentcenter@holding.com" className="text-foot">employmentcenter@holding.com</Link>
                                    </div>
                                    
                                    <div className="d-flex mt-4">
                                        <FiPhone className="fea icon-sm text-primary mt-1 me-3"/>
                                        <Link href="tel:+225212725005" className="text-foot">+225 21 27 2 50 05</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-py-30 footer-bar">
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <div className="text-center">
                                <p className="mb-0">© {new Date().getFullYear()} TIICMANIA. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}