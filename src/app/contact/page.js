import React from "react";
import Link from "next/link";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";


import {FiPhone, FiHexagon, FiMapPin,FiMail} from "../assets/icons/vander"
export default function ContactUs(){
    return(
        <>
        <Navbar navClass="defaultscroll sticky" logolight={true} menuClass = "navigation-menu nav-left nav-light"/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:"url('/images/bg/04.jpg')"}}>
            <div className="bg-overlay bg-gradient-overlay-2"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <p className="text-white-50 para-desc mx-auto mb-0">Par ici !</p>
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">Nous restons attentifs à vos besoins</h5>
                        </div>
                    </div>
                </div>
                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Link href="/">ICM EMPLOYMENT CENTER</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Contactez-nous</li>
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
        <section className="section pb-0">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="p-4 rounded-3 shadow">
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Votre Nom complet <span className="text-danger">*</span></label>
                                            <input name="name" id="name" type="text" className="form-control" placeholder=""/>
                                        </div>
                                    </div>
    
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Votre Email <span className="text-danger">*</span></label>
                                            <input name="email" id="email" type="email" className="form-control" placeholder=""/>
                                        </div> 
                                    </div>
    
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Titre de la prise de contact</label>
                                            <input name="subject" id="subject" className="form-control" placeholder="Postuler mes offres, participer à une formation, etc..."/>
                                        </div>
                                    </div>
    
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="form-label">Contenu de la prise de contact <span className="text-danger">*</span></label>
                                            <textarea name="comments" id="comments" rows="4" className="form-control" placeholder="Veuillez nous donner plus de details pour la prise de contact..."></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="d-grid">
                                            <button type="submit" id="submit" name="send" className="btn btn-primary">Envoyer ce message</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="position-relative features text-center mx-lg-4 px-md-1">
                            <div className="feature-icon position-relative overflow-hidden d-flex justify-content-center">
                                <FiHexagon className="hexagon"/>
                                <div className="position-absolute top-50 start-50 translate-middle">
                                    <FiPhone className="fea icon-m-md text-primary"/>
                                </div>
                            </div>
    
                            <div className="mt-4">
                                <h5 className="mb-3">Numéro de téléphone</h5>
                                <p className="text-muted">Disponible du lundi au vendredi de 09h à 17H</p>
                                <Link href="tel:+225212725005" className="text-primary">+225 21 27 2 50 05</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-4">
                        <div className="position-relative features text-center mx-lg-4 px-md-1">
                            <div className="feature-icon position-relative overflow-hidden d-flex justify-content-center">
                                <FiHexagon className="hexagon"/>
                                <div className="position-absolute top-50 start-50 translate-middle">
                                    <FiMail className="fea icon-m-md text-primary"/>
                                </div>
                            </div>
    
                            <div className="mt-4">
                                <h5 className="mb-3">Email</h5>
                                <p className="text-muted">Disponible du lundi au vendredi de 09h à 17H</p>
                                <Link href="mailto:employmentcenter@icmholding.com" className="text-primary">employmentcenter@icmholding.com</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-4">
                        <div className="position-relative features text-center mx-lg-4 px-md-1">
                            <div className="feature-icon position-relative overflow-hidden d-flex justify-content-center">
                               <FiHexagon className="hexagon"/>
                                <div className="position-absolute top-50 start-50 translate-middle">
                                    <FiMapPin className="fea icon-m-md text-primary"/>
                                </div>
                            </div>
    
                            <div className="mt-4">
                                <h5 className="mb-3">Localisation</h5>
                                <p className="text-muted">348C, Rue des pétroliers, <br/> zone industrielle de Vridi</p>
                                <Link href="https://maps.app.goo.gl/X1wnxmmseucJvV8D6" target='_blank' className="lightbox text-primary" >Voir sur Google map</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-100 mt-60">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="card map border-0">
                            <div className="card-body p-0">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24339.588484191605!2d-4.005242006824407!3d5.260966815674043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1e8434f6ae46d%3A0xb854a6486b1947d9!2sVridi%2C%20Abidjan!5e0!3m2!1sfr!2sci!4v1736141428409!5m2!1sfr!2sci" style={{border:"0" }} title="icm" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}