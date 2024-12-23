'use client'
import React, {useState, useEffect} from "react";
import Link from "next/link";
import { useParams } from 'next/navigation';
import LocalService from "../../../../services/localStorageService";

import PropertyDetailImg from "../../components/propertyDetailImg";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import ScrollTop from "../../components/scrollTop";
import ProprtySlider from "../../components/propertySlider";
import UserService from "../../../../services/userService";
import JobOfferService from "../../../../services/jobOfferService";
import CandidatureService from "../../../../services/candidatureService";
import { horodatage } from "../../../../utils/date/horodatage";
import { displayStatus } from "../../../../utils/helpers/status";
import { Tag, Spin, notification } from 'antd';

import { useRouter } from 'next/navigation';

export default function Job(){
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [user, setUser] = useState(null);
    const [jobInfo, setJobInfo] = useState(null);
    const [jobsSimilar, setJobsSimilar] = useState([]);
    const [loadedInfo, setLoadedInfo] = useState(false)
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        getUser()
        getJobInfo()
      }, [])

    const getUser = async () => {
        const userInfo = LocalService.getUser()
        if(userInfo) {
            setUser(userInfo)
            try {
                const userOnline = await UserService.getInfoUser();
                if(userOnline.etat) {
                    const {access_token, ...rest} = userOnline.result.client;
                    setUser(rest)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        
    }

    const getJobInfo = async () => {
        const userInfo = LocalService.getUser()
        try {

            const jobInfo = await JobOfferService.getDetailsJob({_id: id, authenticate: userInfo !== null});
            if(jobInfo.etat) {
                const {job, jobs} = jobInfo.result;
                setJobInfo(job),
                setJobsSimilar(jobs)
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
                    const response = await CandidatureService.createCandidature({jobOffer: id});
                    
                    if (response.etat) {
                        await getJobInfo()
                        openNotificationWithIcon({type: 'success', message: 'Candidature envoyée', description: "Les employeurs vous feront un retour dans les plus brefs delais"})
                    
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

    return(
        <>
        {contextHolder}
        <Navbar navClass="defaultscroll sticky" menuClass = "navigation-menu nav-left"/>
        <section className="section mt-5 pt-4">
            <div className="container-fluid mt-2">
                <PropertyDetailImg/>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row g-4">
                    <div className="col-lg-8 col-md-7 col-12">
                        <div className="section-title">
                            <h4 className="title mb-0">{jobInfo?.title}</h4>
                            

                            <p className="text-muted">{jobInfo?.description}</p>

                            {jobInfo && jobInfo.skills.map(skill => <Link key={skill.trim()} href="#" className="badge badge-link bg-primary ms-1">{skill.trim()}</Link>)}
                                
                            
                            {/* <div className="card map border-0">
                                <div className="card-body p-0">
                                    <iframe src="https://www.google.com/maps/place/Adjam%C3%A9+ROXY/@5.3496047,-4.0252015,17z/data=!3m1!4b1!4m6!3m5!1s0xfc1eb1ccc72188d:0xc3eaf2b3fab6adaa!8m2!3d5.3496047!4d-4.0252015!16s%2Fg%2F11c55kbvrs?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" className="rounded-3" style={{border:'0'}} title="Townter" allowFullScreen></iframe>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="rounded-3 shadow bg-white sticky-bar p-4">
                            <h5 className="mb-3">Prétention salariale :</h5>

                            <div className="d-flex align-items-center justify-content-between">
                                <h5 className="mb-0">{jobInfo?.salaryRange} Frs</h5>
                                <span className="badge bg-primary">{jobInfo?.contractType}</span>
                            </div>

                            <div className="">
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="small text-muted">Lieu</span>
                                    <span className="small">{jobInfo?.location}</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="small text-muted">Publié depuis</span>
                                    <span className="small">{jobInfo && horodatage(new Date(jobInfo?.postedAt))}</span>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <span className="small text-muted">Compétence matché</span>
                                    <span className="small">{user && jobInfo && jobInfo?.skills.filter(skill => user.skills.includes(skill.trim())).length}/{jobInfo?.skills.length}</span>
                                </div>
                            </div>

                            <div className="d-flex mt-3">
                                {
                                    jobInfo?.candidature === 'None' ?
                                    <button type='button' onClick={handleCandidate} className={"btn w-100 me-2 " + (loading ? 'btn-light' : 'btn-primary')}>{loading ? <Spin /> : 'Postuler'}</button>
                                    :
                                    jobInfo && <Tag color={displayStatus(jobInfo?.candidature)[1]}>{displayStatus(jobInfo?.candidature)[0]}</Tag>
                                }
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
                            <h4 className="title mb-3">Autre emploie</h4>
                        </div>
                    </div>
                </div>

                <ProprtySlider jobs={jobsSimilar}/>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )

    
}