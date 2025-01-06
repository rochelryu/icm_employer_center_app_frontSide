'use client'
import React, {useState, useEffect} from "react";
import Link from "next/link";
import { useParams } from 'next/navigation';
import LocalService from "../../../../services/localStorageService";

import PropertyDetailImg from "../../components/propertyDetailImg";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ScrollTop from "../../components/scrollTop";
import ProprtyFormation from "../../components/propertyFormation";
import TrainingService from "../../../../services/trainingService";
import CandidatureService from "../../../../services/candidatureService";
import { horodatage } from "../../../../utils/date/horodatage";
import {baseUrlAssetFormations} from "../../../../constants/serveur/serveur";

import { Tag, Spin, notification } from 'antd';
import DOMPurify from 'dompurify';


import { useRouter } from 'next/navigation';

export default function DetailFormation(){
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [user, setUser] = useState(null);
    const [formationInfo, setFormationInfo] = useState(null);
    const [formationsSimilar, setFormationsSimilar] = useState([]);
    const [loadedInfo, setLoadedInfo] = useState(false)
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        getUser()
        getFormationInfo()
      }, [])

    const getUser = async () => {
        const userInfo = LocalService.getUser()
        if(userInfo) {
            setUser(userInfo)
        }
        
    }

    const getFormationInfo = async () => {
        try {
            const {result, etat} = await TrainingService.getDetailsTraining({_id: id});
            if(etat) {
                const {formation, formations} = result;
                setFormationInfo(formation),
                setFormationsSimilar(formations)
                setLoadedInfo(true)
            }
        } catch (error) {
            console.log(error.message)
        }
        
    }

    const handleCandidate = async (e) => {
        e.preventDefault();
        if(!loading) {
            if(user) {
                try {
                    setLoading(true)
                    const response = await TrainingService.createParticipation({trainingId: id});
                    
                    if (response.etat) {
                        await getFormationInfo()
                        openNotificationWithIcon({type: 'success', message: 'Participation envoyée', description: "Vous êtes dorénavant un participant de cette formation"})
                    
                    } else {
                        openNotificationWithIcon({type: 'warning', message: 'Erreur', description: response.error})
                    }
                    setLoading(false)
                    
                    
                } catch (error) {
                    const {response} = error
                    setLoading(false)
                
                    for (const errorMessage of response.data.message) {
                        openNotificationWithIcon({type: 'error', message: 'Echec', description: errorMessage })
                    }
                }
            } else {
                router.push('/auth-login')
            }
            
        }
    };

    const openNotificationWithIcon = ({type, message, description}) => {
        api[type]({
          message,
          description
        });
      };

      const displayButtonAction = () => {
        if(user && loadedInfo) {
            
            return formationInfo?.participants.includes(user?._id) ?
            <Tag color={'green'}>Vous êtes un participant</Tag>
            :
            <button type='button' onClick={handleCandidate} className={"btn w-100 me-2 " + (loading ? 'btn-light' : 'btn-primary')}>{loading ? <Spin /> : 'Participer'}</button> 
            
        } else if(!user && loadedInfo) {
            return <button type='button' onClick={handleCandidate} className={"btn w-100 me-2 " + (loading ? 'btn-light' : 'btn-primary')}>{loading ? <Spin /> : 'Participer'}</button> 
        }
      }

    return(
        <>
        {contextHolder}
        <Navbar navClass="defaultscroll sticky" menuClass = "navigation-menu nav-left"/>
        <section className="section">
            <section className="bg-half-170 d-table w-100" style={{backgroundImage:`url('${baseUrlAssetFormations}/${formationInfo?.cover}')`}}>
                <div className="bg-overlay bg-gradient-overlay-2"></div>
                <div className="container">
                    <div className="row mt-5 justify-content-center">
                        <div className="col-12">
                            <div className="title-heading text-center">
                                <p className="text-white para-desc mx-auto mb-0">{formationInfo?.title}</p>
                                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark"><Link href="#" className="badge badge-link bg-primary ms-1">{formationInfo?.instructor}</Link></h5>
                            </div>
                        </div>
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

            <div className="container mt-100 mt-60">
                <div className="row g-4">
                    <div className="col-lg-8 col-md-7 col-12">
                        <div className="section-title">
                            {/* <h4 className="title mb-0">{formationInfo?.title}</h4> */}

                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formationInfo?.description) }} />
                            {/* <Box component='div'>
                                {jobInfo?.description}
                            </Box> */}                                
                            
                            {/* <div className="card map border-0">
                                <div className="card-body p-0">
                                    <iframe src="https://www.google.com/maps/place/Adjam%C3%A9+ROXY/@5.3496047,-4.0252015,17z/data=!3m1!4b1!4m6!3m5!1s0xfc1eb1ccc72188d:0xc3eaf2b3fab6adaa!8m2!3d5.3496047!4d-4.0252015!16s%2Fg%2F11c55kbvrs?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" className="rounded-3" style={{border:'0'}} title="Townter" allowFullScreen></iframe>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="rounded-3 shadow bg-white sticky-bar p-4">
                            <h5 className="mb-3">Infos supplémentaires :</h5>

                            <div className="d-flex align-items-center justify-content-between">
                                <h5 className="mb-0">Nombre participants</h5>
                                <span className="badge bg-primary">{formationInfo?.participants.length}</span>
                            </div>

                            <div className="">
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="small text-muted">Lieu</span>
                                    <span className="small">{formationInfo?.location}</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="small text-muted">Date de début</span>
                                    <span className="small">{formationInfo && horodatage(new Date(formationInfo?.startDate))}</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="small text-muted">Date de fin</span>
                                    <span className="small">{formationInfo && horodatage(new Date(formationInfo?.endDate))}</span>
                                </div>
                            </div>

                            <div className="d-flex mt-3">
                                {displayButtonAction()}
                                {/* <Link href="#" className="btn btn-primary w-100">Offer now</Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row justify-content-center">
                    <div className="col">
                        <div className="section-title text-center mb-4 pb-2">
                            <h4 className="title mb-3">Autre emploi</h4>
                        </div>
                    </div>
                </div>

                <ProprtyFormation formations={formationsSimilar}/>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )

    
}