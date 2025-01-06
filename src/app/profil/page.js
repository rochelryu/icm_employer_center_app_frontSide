'use client'
import React, {useState,useEffect, useRef} from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AssignmentReturnedTwoToneIcon from '@mui/icons-material/AssignmentReturnedTwoTone';
import ScrollTop from "../components/scrollTop";
import TinyMCEEditor from "../components/editor/tinymce";
import { displayStatus } from "../../../utils/helpers/status";
import { pink, green, red } from '@mui/material/colors';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import DoDisturbOffTwoToneIcon from '@mui/icons-material/DoDisturbOffTwoTone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import LocalService from "../../../services/localStorageService";
import { InboxOutlined } from '@ant-design/icons';
import { Button, message, Upload, Select, Spin, Tag, Space, Table, Typography as Typo, Menu, Flex, Dropdown, Divider, notification, Badge } from 'antd';
import UserService from "../../../services/userService";
import JobOfferService from "../../../services/jobOfferService";
import CandidatureService from "../../../services/candidatureService";
import {CANDIDATE, RECRUITER} from "../../../constants/enums/roleEnum";
import {skillsLocals, contractType} from "../../../constants/skills/skills";
import {baseUrl} from "../../../constants/serveur/serveur";
import { useRouter } from 'next/navigation';
const { Dragger } = Upload;
const {Text}= Typo
import {
    LogoutOutlined
  } from '@ant-design/icons';
import { horodatage } from "../../../utils/date/horodatage";
import { Typography, Box } from "@mui/material";

const initialForm = {
    title: '',
    description: null,
    location: '',
    contractType: null,
    salaryRange: '',

}

export default function BlogDetail(){
    const editorRef = useRef(null);
    const [api, contextHolder] = notification.useNotification();
    const router = useRouter();
    const [formValues, setFormValues] = useState(initialForm);
    const [user, setUser] = useState(null);
    const [skillsAdded, setSkillsAdded] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loadedUser, setLoadedUser] = useState(false);
    const [stateCreateJob, setStateCreateJob] = useState(false);
    const [loadingSendSkill, setLoadingSendSkill] = useState(false)
    const [defaultFileList, setDefaultFileList] = useState([]);
    const [messageApi, contextMessageHolder] = message.useMessage();


    useEffect(() => {
        getUser()
      }, []);


    useEffect(() => {
        if (user?.resume) {
            setDefaultFileList([
                {
                    uid: '1',
                    name: user.resume,
                    status: 'done',
                    url: `${baseUrl}/uploads/resumes/${user.resume}`,
                },
            ]);
        }
    }, [user]);





    const props = {
        accept: 'application/pdf',
        name: 'cv_file',
        multiple: false,
        action: `${baseUrl}/api/v1/user/upload-cv`,
        headers: {
            Authorization: LocalService.getToken(), // Récupère le token JWT du localStorage
          },
        beforeUpload(file) {
            const isPdf = file.type === 'application/pdf';
            if (!isPdf) {
                messageApi.error('Vous ne pouvez télécharger que des fichiers PDF !');
            }
            return isPdf || Upload.LIST_IGNORE; // Rejette les fichiers non conformes
          },
        onChange(info) {
            const { file, fileList: newFileList } = info;

            // Gestion des états de fichier
            if (file.status === 'done') {
                messageApi.success(`${file.name} chargé avec succès.`);
            } else if (file.status === 'error') {
                messageApi.error(`${file.name} chargement échoué.`);
            }
            const lastElementArray = newFileList.slice(-1);
        
            // Met à jour la liste locale des fichiers
            setDefaultFileList(lastElementArray);
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
        fileList: defaultFileList,
        progress: {
            strokeColor: {
              '0%': '#108ee9',
              '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
          },
      };

      const handleChange = (value) => {
        setSkillsAdded(value)
      };

      const handleClearEditor = () => {
        if (editorRef.current) {
          editorRef.current.clearContent();
        }
      };

      const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value // Mise à jour dynamique basée sur le `name` du champ
        });
      };

      const columns = [
        {
          title: 'Nom',
          dataIndex: 'fullName',
          key: 'fullName',
        },
    
        {
          title: 'Adresse',
          dataIndex: 'email',
          key: 'email',
          render: (_, { email, phoneNumber }) => (
            <Typo>
              <Text>{email}</Text>
              <Divider style={{margin: 0}} />
              <Text strong>{phoneNumber}</Text>
            </Typo>
          ),
        },
        {
          title: 'Compétences',
          key: 'skills',
          dataIndex: 'skills',
          render: (_, { skills }) => (
            <>
              {skills.map((skill) => {
                return (
                  <Tag key={`skill-${skill}-${Math.floor(Math.random() * 99999999)}`}>
                    {skill.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
            title: 'CV',
            dataIndex: 'resume',
            key: 'resume',
            render: (_, { resume }) => (
              <Link href={`${baseUrl}/uploads/resumes/${resume}`} target='_blank' download>
                <AssignmentReturnedTwoToneIcon sx={{ color: pink[500] }}  />
              </Link>
            ),
        },
        {
            title: 'Etat de candidature',
            key: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
            dataIndex: 'status',
            render: (_, { status }) => {
                let color = status === 'Pending' ?  'geekblue' : status === 'Accepted' ? 'green': 'volcano';
                let title = status === 'Pending' ?  'En attente' : status === 'Accepted' ? 'Acceptée': 'Refusée';
                  return (
                    <Tag color={color} key={`status-${status}-${Math.floor(Math.random() * 99999999)}`}>
                      {title}
                    </Tag>
                  );
            },
          },
        {
          title: 'Action',
          key: '_id',
          render: (_, {_id}) => (
            <Space size="middle">
                <Dropdown overlay={menuItems(_id)} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                <MoreHorizIcon />
                            </a>
                        </Dropdown>
            </Space>
          ),
        },
      ];

      const menuItems = (_id) => (
        <Menu>
            <Menu.Item key={`updateItem${_id}_${Math.floor(Math.random() * 99999999)}`} onClick={() => handleActionCandidate(_id, true)}>
                <Flex gap={'middle'} align='center' justify='space-between'>
            Approuver <CheckCircleTwoToneIcon sx={{color: green[500]}} />
                </Flex>
            </Menu.Item>
            <Menu.Item className='hover-danger' key={`removeItem${_id}_${Math.floor(Math.random() * 99999999)}`} onClick={() => handleActionCandidate(_id, false)}>
                <Flex gap={'middle'} align='center' justify='space-between'>
                    Rejetter <DoDisturbOffTwoToneIcon sx={{color: red[500]}}/>
                </Flex>
            </Menu.Item>
        </Menu>
    )

    const handleActionCandidate = async (_id, approbation) => {
        try {
            messageApi.loading("Nous enregistrons votre choix")
            const response = await CandidatureService.validateCandidature({candidatureId: _id, status: approbation ? 'Accepted': 'Rejected'});
                    
                    if (response.etat) {
                        await getUser()
                        openNotificationWithIcon({type: 'success', message: 'Reponse envoyée', description: "Le candidat sera informé de cette décision"})
                    
                    } else {
                        openNotificationWithIcon({type: 'warning', message: 'Erreur', description: response.error})
                    }
        } catch (error) {
            const {response} = error
                setStateCreateJob(false)
                
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({type: 'error', message: 'Echec', description: errorMessage })
                }
        }
    }

    const handleEditorContentChange = (newContent) => {
        setFormValues({...formValues, description: newContent});
      };

    const getUser = async () => {
        const userInfo = LocalService.getUser()
        if(userInfo) {
            setUser(userInfo)
            setLoadedUser(userInfo.role === CANDIDATE)
            try {
                const userOnline = await UserService.getInfoUser();
                if(userOnline.etat) {
                    const {access_token, ...rest} = userOnline.result.client;
                    setUser(rest)
                    setLoadedUser(true)
                    if(rest.role === RECRUITER) {
                        const allJobs = await JobOfferService.getMyJob()
                        if(allJobs.etat) {
                            setJobs(allJobs.result)
                        }
                    }
                }
            } catch (error) {
                LocalService.clear()
                router.push('/')
            }
        }
        
    }

    const handleSumbitSkill = async (e) => {
        e.preventDefault()
        if(skillsAdded.length > 0 && !loadingSendSkill) {
            setLoadingSendSkill(true)
            try {
                const userOnline = await UserService.updateUser({skills: skillsAdded});
                if(userOnline.etat) {
                    const {access_token, ...rest} = userOnline.result.client;
                    setUser(rest)
                    
                    setLoadingSendSkill(false)
                    setSkillsAdded([])
                }
            } catch (error) {
                const {response} = error
                setStateCreateJob(false)
                
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({type: 'error', message: 'Echec', description: errorMessage })
                }
            }
        }
    }

    const handleSumbitJob = async (e) => {
        e.preventDefault()
        if(skillsAdded.length > 0 && !stateCreateJob) {
            setStateCreateJob(true)
            try {
                messageApi.loading("emploi en cours de création")
                const newJob = await JobOfferService.createJob({...formValues, skills: skillsAdded.join(';')});
                if(newJob.etat) {
                    setFormValues({
                        title: '',
                        description: null,
                        location: '',
                        contractType: null,
                        salaryRange: '',
                    
                    })
                    setSkillsAdded([])
                    handleClearEditor()
                    await getUser()
                    messageApi.success("Demande emploi en cours de validation par l'administration")
                } else {
                    messageApi.warning("Une erreur s'est produite")
                }
                setStateCreateJob(false)
            } catch (error) {
                const {response} = error
                setStateCreateJob(false)
                
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({type: 'error', message: 'Echec', description: errorMessage })
                }
            }
        }
    }

    const openNotificationWithIcon = ({type, message, description}) => {
        api[type]({
          message,
          description
        });
      };

    return(
        <>
        {contextHolder}
        {contextMessageHolder}
        <Navbar navClass="defaultscroll sticky" logolight={true} menuClass = "navigation-menu nav-left nav-light"/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:"url('/images/bg/02.jpg')"}}>
            <div className="bg-overlay bg-gradient-overlay-2"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <span className="badge bg-primary">{loadedUser && user && `${user.role === CANDIDATE ? 'Profil Candidat': 'Compte Entreprise'}`}</span>
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark mt-4">{loadedUser && user && user.fullName}</h5>

                            {/* <ul className="list-inline text-center mb-0">
                                <li className="list-inline-item mx-4 mt-4">
                                    <span className="text-white-50 d-block">Author</span>
                                    <Link href="#" className="text-white title-dark">Christina Gonzalez</Link>
                                </li>

                                <li className="list-inline-item mx-4 mt-4">
                                    <span className="text-white-50 d-block">Date</span>
                                    <span className="text-white title-dark">19th June 2023</span>
                                </li>

                                <li className="list-inline-item mx-4 mt-4">
                                    <span className="text-white-50 d-block">Read Time</span>
                                    <span className="text-white title-dark">8 min read</span>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Button type="dashed" onClick={(e)=>{
                                e.preventDefault()
                                LocalService.clear()
                                router.replace('/')
                            }} icon={<LogoutOutlined />} iconPosition={'start'}>Deconnexion</Button></li>
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
                    <div className="col-lg-12 col-md-12 col-12">
                        {
                            user?.role === 'CANDIDATE' && (
                                <>
                                <div className="card border-0 shadow rounded-3 overflow-hidden">
                                    <div className="container mt-3">
                                        <div className='row'>
                                            <div className='col-md-5'>
                                            <Dragger {...props}>
                                                <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                                </p>
                                                <p className="ant-upload-text">Cliquez ou faites glisser votre cv ici</p>
                                                <p className="ant-upload-hint">
                                                Prise en charge uniquement de pdf.
                                                </p>
                                            </Dragger>
                                            </div>
                                            <div className='col-md-7'>
                                            <div className="mt-4 pt-2 text-center">
                                                <h6 className="pt-2 pb-2 bg-light rounded-3">Mes Palettes de compétences</h6>
                                                <ul className="tagcloud list-unstyled mt-4">
                                                    
                                                    {user && user.skills.length > 0 && user.skills.map((skill, index) => <li key={`skill-${index}_${Math.floor(Math.random() * 99999999)}`} className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">{skill}</Link></li>)}


                                                </ul>

                                                <Select
                                                    mode="multiple"
                                                    allowClear
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    value={skillsAdded}
                                                    placeholder="Complêtez vos compétences"
                                                    onChange={handleChange}
                                                    options={skillsLocals}
                                                />
                                                <div className='mt-3 mb-3'>
                                                {skillsAdded.length > 0 && <button className={"btn w-100 " + (loadingSendSkill ? 'btn-light' : 'btn-primary')} type="button" onClick={handleSumbitSkill}> {loadingSendSkill ? <Spin /> : 'Terminer'}</button>}
                                                </div>
                                            </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="card-body">
                                        
                                    
                                        <blockquote className="text-center mx-auto blockquote"><i className="mdi mdi-format-quote-open mdi-48px text-muted opacity-2 d-block"></i> Je suis un jeune passionné et sachant travailler sous pression.<small className="d-block text-muted mt-2">- Intro</small></blockquote>
                                                                
                                        {/* <Link href="#" className="badge badge-link bg-primary ms-1">Minimal</Link>
                                        <Link href="#" className="badge badge-link bg-primary ms-1">Interior</Link>
                                        <Link href="#" className="badge badge-link bg-primary ms-1">Furniture</Link> */}
                                    </div>
                                </div>
                                <div className="card bg-white p-4 rounded-3 shadow sticky-bar">
                            
                                    <div className="">
                                        <h6 className="pt-2 pb-2 bg-light rounded-3 text-center">Récemment postulé</h6>
                                        <div className="mt-4 container">
                                            <div className="row">
                                            {user?.candidatures?.map((candidature,index)=>{
                                                return(
                                                    <div key={`candidature_${Math.floor(Math.random() * 99999999)}`} className="col-lg-6 col-md-6 col-12">
                                                        <Link href={`/job/${candidature.jobOffer._id}`}>
                                                        <div className="blog blog-primary d-flex align-items-center mt-3">
                                                            <Image src={'/images/property/offre.jpg'} width={105} height={65} className="avatar avatar-small rounded-3" style={{width: "auto"}} alt={candidature.jobOffer.title}/>
                                                            <div className="flex-1 ms-3">
                                                                <h6 className="d-block title text-dark fw-medium">{candidature.jobOffer.title}</h6>
                                                                <span className="text-muted small">{horodatage(candidature.created_at)}</span>
                                                                <Tag color={displayStatus(candidature.status)[1]}>{displayStatus(candidature.status)[0]}</Tag>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    </div>
                                                )
                                            })}
                                            </div>
                                        </div>
                                    </div>
                                

                                
                                    {/* <div className="mt-4 pt-2 text-center">
                                        <h6 className="pt-2 pb-2 bg-light rounded-3">Palette de compétence</h6>
                                        <ul className="tagcloud list-unstyled mt-4">
                                            <li className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">Business</Link></li>
                                            <li className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">Finance</Link></li>
                                            <li className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">Marketing</Link></li>
                                            <li className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">Fashion</Link></li>
                                            <li className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">Bride</Link></li>
                                            <li className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">Lifestyle</Link></li>
                                            <li className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">Travel</Link></li>
                                            <li className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">Beauty</Link></li>
                                            <li className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">Video</Link></li>
                                            <li className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">Audio</Link></li>
                                        </ul>
                                    </div> */}
                                
                                </div>
                                </>
                                
                            )
                        }
                        {
                            user?.role === 'RECRUITER' && (
                                <>
                                <div className="card border-0 shadow rounded-3 overflow-hidden">
                                    <div className="card-title">
                                            <Typography variant="h3" className="text-center title fs-5 text-dark fw-medium" sx={{m: 2}}>
                                                Création d'offre d'emploi
                                            </Typography>
                                        </div>
                                    

                                    <div className="card-body">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-12 col-12">
                                                    <div className="form-floating mb-2 mt-2">
                                                        <input type="text" name="title" onChange={handleChangeInput} value={formValues.title} className="form-control" id="floatingInput" placeholder="Développeur Javascript Senior"/>
                                                        <label htmlFor="floatingInput">Titre de l'offre</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-6">
                                                    <div className="form-floating mb-2 mt-2">
                                                        <input type="text" name="location" onChange={handleChangeInput} value={formValues.location} className="form-control" id="floatingInput" placeholder="Abidjan, cocody"/>
                                                        <label htmlFor="floatingInput">Lieu du poste</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-6">
                                                    <div className="form-floating mb-2 mt-2">
                                                        <input type="text" name="salaryRange" onChange={handleChangeInput} value={formValues.salaryRange} className="form-control" id="floatingInput" placeholder="100000"/>
                                                        <label htmlFor="floatingInput">Prétention salariale</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-6">
                                                    <div className="form-floating mb-2 mt-2">
                                                        <Select
                                                            mode="multiple"
                                                            allowClear
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            value={skillsAdded}
                                                            placeholder="Ajouter les compétences"
                                                            onChange={handleChange}
                                                            options={skillsLocals}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-6">
                                                    <div className="form-floating mb-2 mt-2">
                                                        <Select
                                                            allowClear
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            value={formValues.contractType}
                                                            placeholder="Sélectionner le type de contrat"
                                                            onChange={(value) => {setFormValues({...formValues, contractType: value})}}
                                                            options={contractType}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-12 col-12">
                                                    
                                                    <TinyMCEEditor ref={editorRef} onChange={handleEditorContentChange} initialValue={formValues.description} />
                                                </div>

                                                <div className="col-md-12 col-12 mt-3 mb-3">
                                                    
                                                    <Flex align="center" justify="center">
                                                    <button className={"btn w-100 " + (stateCreateJob ? 'btn-light' : 'btn-primary')} type="button" onClick={handleSumbitJob}> {stateCreateJob ? <Spin /> : 'Enregistrer'}</button>
                                                    </Flex>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    <div className="card border-0 shadow rounded-3 overflow-hidden">
                                        <div className="card-title">
                                            <Typography variant="h3" className="text-center title fs-5 text-dark fw-medium" sx={{m: 2}}>
                                                Toutes mes offres crées
                                            </Typography>
                                        </div>
                                        <div className="card-body">
                                            {
                                                jobs.map(job => (
                                                    <Box key={`job_${job._id}_${Math.floor(Math.random() * 99999999)}`} component={'div'} sx={{mt: 2}}>
                                                        <Link href={job.isActive ? `/job/${job._id}`: '#'}>
                                    
                                                            <Badge.Ribbon text={job.isActive ? 'En ligne': 'En attente validation'} color={job.isActive ? 'green': 'red'}>
                                                                <div className="card property property-list border-0 shadow position-relative overflow-hidden rounded-3">
                                                                    <div className="d-md-flex">
                                                                        <div className="property-image position-relative overflow-hidden shadow flex-md-shrink-0 rounded-3 m-2">
                                                                            <Image src={'/images/property/offre.jpg'} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid h-100 w-100" alt="illustration job"/>
                                                                            
                                                                        </div>
                                                                        <div className="card-body content p-3">
                                                                            {/* <Link href={`/property-detail/${item.id}`} className="title fs-5 text-dark fw-medium">{item.title}</Link> */}
                                                                            <h3 className="title fs-5 text-dark fw-medium">{job.title}</h3>

                                                                            <ul className="list-unstyled mt-3 py-3 border-top border-bottom d-flex align-items-center justify-content-between">
                                                                                <li className="d-flex align-items-center me-3">
                                                                                    <i className="mdi mdi-tag-multiple fs-5 me-2 text-primary"></i>
                                                                                    <span className="text-muted">{job.contractType}</span>
                                                                                </li>
                                                                                <li className="d-flex align-items-center">
                                                                                    <i className="mdi mdi-table-account fs-5 me-2 text-primary"></i>
                                                                                    <span className="text-muted">{job.location}</span>
                                                                                </li>
                                                                            </ul>
                                                                            <ul className="list-unstyled d-flex justify-content-between mt-2 mb-0">
                                                                                <li className="list-inline-item mb-0">
                                                                                    <span className="text-muted">Prétention salaire</span>
                                                                                    <p className="fw-medium mb-0">{job.salaryRange} Frs</p>
                                                                                </li>
                                                                                <li className="list-inline-item mb-0 text-muted">
                                                                                    <p className="text-muted text-end m-0">Publié depuis</p>
                                                                                    <ul className="fw-medium text-warning list-unstyled mb-0">
                                                                                        {horodatage(new Date(job.postedAt)) }
                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Badge.Ribbon>
                                                        </Link>

                                                        {
                                                            job.isActive && (
                                                                <Box>
                                                                    <Typography variant="h6" sx={{m: 2}}>
                                                                        Candidatures à cette offre
                                                                    </Typography>
                                                                    <Table
                                                                        dataSource={job.candidatures}
                                                                        columns={columns}
                                                                    />
                                                                </Box>
                                                            )
                                                        }
                                                    </Box>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        {/* <div className="card shadow rounded-3 border-0 mt-4">
                            <div className="card-body">
                                <h5 className="card-title mb-0">Comments :</h5>

                                <ul className="media-list list-unstyled mb-0">
                                    {commentsData.map((item, index) => {
                                        return(
                                            <li className="mt-4" key={index}>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <Link className="pe-3" href="#">
                                                            <Image src={item.image} width={45} height={45} className="img-fluid avatar avatar-md-sm rounded-circle shadow" alt="img"/>
                                                        </Link>
                                                        <div className="commentor-detail">
                                                            <h6 className="mb-0"><Link href="#" className="text-dark media-heading">{item.name}</Link></h6>
                                                            <small className="text-muted">{item.date}</small>
                                                        </div>
                                                    </div>
                                                    <Link href="#" className="text-muted"><i className="mdi mdi-reply"></i> Reply</Link>
                                                </div>
                                                <div className="mt-3">
                                                    <p className="text-muted fst-italic p-3 bg-light rounded-3">{item.desc}</p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className="card shadow rounded-3 mt-4">
                            <div className="card-body">
                                <h5 className="card-title mb-0">Leave A Comment :</h5>

                                <form className="mt-4">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Your Comment</label>
                                                <textarea id="message" placeholder="Your Comment" rows="5" name="message" className="form-control" required=""></textarea>
                                            </div>
                                        </div>
    
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label">Name <span className="text-danger">*</span></label>
                                                <input id="name" name="name" type="text" placeholder="Name" className="form-control" required=""/>
                                            </div>
                                        </div>
    
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label">Your Email <span className="text-danger">*</span></label>
                                                <input id="email" type="email" placeholder="Email" name="email" className="form-control" required=""/>
                                            </div>
                                        </div>
    
                                        <div className="col-md-12">
                                            <div className="send d-grid">
                                                <button type="submit" className="btn btn-primary">Send Message</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="card shadow rounded-3 mt-4">
                            <div className="card-body">
                                <h5 className="card-title mb-0">Related News :</h5>

                                <div className="row g-4 mt-0">
                                    {blogData.slice(0,2).map((item, index)=>{
                                        return(
                                        <div className="col-lg-6" key={index}>
                                            <div className="card blog blog-primary shadow rounded-3 overflow-hidden border-0">
                                                <div className="card-img blog-image position-relative overflow-hidden rounded-0">
                                                    <div className="position-relative overflow-hidden">
                                                        <Image src={item.image} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
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
                            </div>
                        </div> */}
                    </div>
                    
                </div>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}