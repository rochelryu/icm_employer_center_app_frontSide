'use client'
import React, {useState,useEffect, useRef} from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import TinyMCEEditor from "../components/editor/tinymce";
import { displayStatus } from "../../../utils/helpers/status";
import { green, red } from '@mui/material/colors';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import DoDisturbOffTwoToneIcon from '@mui/icons-material/DoDisturbOffTwoTone';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import LocalService from "../../../services/localStorageService";
import { InboxOutlined } from '@ant-design/icons';
import { Button, message, Upload, Select, Spin, Tag, Space, Table, Typography as Typo, Menu, Flex, Dropdown, Divider, notification, Badge, Avatar, Radio, DatePicker, Input, Empty, Timeline } from 'antd';
import UserService from "../../../services/userService";
import JobOfferService from "../../../services/jobOfferService";
import CandidatureService from "../../../services/candidatureService";
import {CANDIDATE, RECRUITER} from "../../../constants/enums/roleEnum";
import {skillsLocals, contractType, degreeAccademy, certificationsLocal} from "../../../constants/skills/skills";
import {languageOptions, valueWrittenAndSpoken} from "../../../constants/languages/languages";

import {baseUrl, baseUrlAssetLogos} from "../../../constants/serveur/serveur";
import { useRouter } from 'next/navigation';
const { Dragger } = Upload;
const {Text, Paragraph, Title}= Typo
import {
    LogoutOutlined,
    BankOutlined,
    CalendarOutlined,
    EditOutlined,
    SmileOutlined
  } from '@ant-design/icons';
import { formatDate, horodatage } from "../../../utils/date/horodatage";
import { Typography, Box, Stack } from "@mui/material";

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const initialForm = {
    title: '',
    description: null,
    location: '',
    contractType: null,
    salaryRange: '',
    onShore: false

}

const optionsAvailableOffShore = [
    {
      label: 'Oui',
      value: true,
    },
    {
      label: 'Non',
      value: false,
    },
  ];

export default function BlogDetail(){
    const editorRef = useRef(null);
    const [api, contextHolder] = notification.useNotification();
    const router = useRouter();
    const [formValues, setFormValues] = useState(initialForm);
    const [user, setUser] = useState(null);
    const [certificationExpireAt, setCertificationExpireAt] = useState(null);
    const [certificationOnShoreExpireAt, setCertificationOnShoreExpireAt] = useState(null);
    const [availableOffShore, setAvailableOffShore] = useState(null);
    const [domainesAdded, setDomainesAdded] = useState([]);
    const [degree, setDegree] = useState([]);
    const [certificationsAdded, setCertificationsAdded] = useState([]);
    const [certificationsOnShoreAdded, setCertificationsOnShoreAdded] = useState([]);
    const [otherCompetencesAdded, setOtherCompetencesAdded] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [domaines, setDomaines] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [loadedUser, setLoadedUser] = useState(false);
    const [yearsExperience, setYearsExperience] = useState('');
    const [stateCreateJob, setStateCreateJob] = useState(false);
    const [isEditDomaine, setIsEditDomaine] = useState(false);
    const [isEditDegree, setIsEditDegree] = useState(false);
    const [isEditYearExperience, setIsEditYearExperience] = useState(false);
    const [loadingSendOtherCompetence, setLoadingSendOtherCompetence] = useState(false);
    const [loadingSendSkill, setLoadingSendSkill] = useState(false);
    const [defaultFileList, setDefaultFileList] = useState([]);
    const [messageApi, contextMessageHolder] = message.useMessage();


    // Experience
    const [position, setPosition] = useState(null);
    const [beginAt, setBeginAt] = useState(null);
    const [endAt, setEndAt] = useState(null);
    const [company, setCompany] = useState(null);
    const [loadingSendExperience, setLoadingSendExperience] = useState(false);

    // Langue
    const [title, setTitle] = useState(null);
    const [written, setWritten] = useState(null);
    const [spoken, setSpoken] = useState(null);
    const [loadingSendLanguage, setLoadingSendLanguage] = useState(false);

    // Nationality
    const [nationality, setNationality] = useState("");
    const [loadingSendNationality, setLoadingSendNationality] = useState(false);

    // HelperContact
    const [helperContact, setHelperContact] = useState(null);
    const [loadingSendHelperContact, setLoadingSendHelperContact] = useState(false);

    // Birth
    const [birthDate, setBirthDate] = useState(null);
    const [birthPlace, setBirthPlace] = useState(null);
    const [loadingSendBirthInfo, setLoadingSendBirthInfo] = useState(false);



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

      const handleChangeExpireAtCertification = (date, dateString) => {
        setCertificationExpireAt(date);
      };

      const handleChangeExpireAtCertificationOnShore = (date, dateString) => {
        setCertificationOnShoreExpireAt(date);
      };

      const handleChangeDomaine = (value) => {
        setDomainesAdded(value)
      };
      const handleChangeOtherCompetences = (value) => {
        setOtherCompetencesAdded(value)
      };
      const handleChangeCertificationOffShore = (value) => {
        setCertificationsAdded(value)
      };
      const handleChangeCertificationOnShore = (value) => {
        setCertificationsOnShoreAdded(value)
      };
      const handleChangeDegreeAccademy = (value) => {
        setDegree(value)
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
          render: (_, { fullName, profil, levelGruaduate }) => (
            <>
            <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={`${baseUrlAssetLogos}/${profil}`}
            />
            <Typo>
              <Divider style={{margin: 0}} />
              <Paragraph>
                <Text style={{textAlign: 'center'}} strong>{fullName}</Text>
              </Paragraph>
              
              <Text underline>{degreeAccademy.filter(degreeInfo => parseInt(degreeInfo.value.split(':')[1], 10) === levelGruaduate)[0].label}</Text>
            </Typo>
            </>
            
          ),
        },
        {
            title: 'Domaines',
            key: 'domaines',
            dataIndex: 'domaines',
            render: (_, { domaines, yearExperience }) => (
              <>
                {domaines.map((domaine) => {
                  return (
                    <Tag key={`domaine-${domaine}-${Math.floor(Math.random() * 99999999)}`} color='geekblue'>
                      {domaine.toUpperCase()}
                    </Tag>
                  );
                })}
                <Text>Avec {yearExperience} année{yearExperience > 1 ? "s d'expériences" : "d'expérience"}</Text>
              </>
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
                    {skill.trim()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
            title: 'Certifications',
            key: 'certifications',
            dataIndex: 'certifications',
            render: (_, { certifications, certificationsOnShore }) => (
              <>
                
                {certificationsOnShore && certificationsOnShore.map(({certification}) => {
                  return (
                    <Tag key={`certification-${certification}-${Math.floor(Math.random() * 99999999)}`} color='gold'>
                      {certification.trim()}
                    </Tag>
                  );
                })}
                {certifications && certifications.map(({certification}) => {
                  return (
                    <Tag key={`certification-${certification}-${Math.floor(Math.random() * 99999999)}`} color='gold'>
                      {certification.trim()}
                    </Tag>
                  );
                })}
              </>
            ),
          },
        // {
        //     title: 'CV',
        //     dataIndex: 'resume',
        //     key: 'resume',
        //     render: (_, { resume }) => (
        //       <Link href={`${baseUrl}/uploads/resumes/${resume}`} target='_blank' download>
        //         <AssignmentReturnedTwoToneIcon sx={{ color: pink[500] }}  />
        //       </Link>
        //     ),
        // },
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
                const domainesInfo = await JobOfferService.getAllDomaine();
                const certificationsInfo = await JobOfferService.getAllCertifications();
                if(userOnline.etat) {
                    const {access_token, ...rest} = userOnline.result.client;
                    const domainesFilter = domainesInfo.result.map(domaine => ({label: domaine.title, value: domaine.title}));
                    const certificationsFilter = certificationsInfo.result.map(domaine => ({label: domaine.title, value: domaine.title}));
                    setDomaines(domainesFilter);
                    setCertifications(certificationsFilter);
                    setUser(rest)
                    setLoadedUser(true)
                    if(rest.role === RECRUITER) {
                        const allJobs = await JobOfferService.getMyJob()
                        if(allJobs.etat) {
                            setJobs(allJobs.result)
                        }
                    }
                    if(rest.domainsActivity.length === 0) {
                        setIsEditDomaine(true);
                    }
                    if(!rest.levelGruaduate) {
                        setIsEditDegree(true);
                    }
                    setAvailableOffShore(rest.onShore);
                }
            } catch (error) {
                LocalService.clear()
                router.push('/')
            }
        }
        
    }

    const handleSumbitDomaines = async (e) => {
        e.preventDefault()
        if(domainesAdded.length > 0 && !loadingSendSkill) {
            setLoadingSendSkill(true)
            try {
                const userOnline = await UserService.updateUser({domainsActivity: domainesAdded});
                if(userOnline.etat) {
                    const {access_token, ...rest} = userOnline.result.client;
                    setUser(rest);
                    
                    setLoadingSendSkill(false);
                    setDomainesAdded([]);
                    if(rest.domainsActivity.length > 0) {
                        setIsEditDomaine(false);
                    }
                }
            } catch (error) {
                const {response} = error
                
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({type: 'error', message: 'Echec', description: errorMessage })
                }
            }
        }
    }

    const handleSumbitSkill = async (e) => {
        e.preventDefault()
        if(otherCompetencesAdded.length > 0 && !loadingSendOtherCompetence) {
            setLoadingSendOtherCompetence(true)
            try {
                const userOnline = await UserService.updateUser({skills: otherCompetencesAdded});
                if(userOnline.etat) {
                    const {access_token, ...rest} = userOnline.result.client;
                    setUser(rest);
                    
                    setLoadingSendOtherCompetence(false);
                    setOtherCompetencesAdded([]);
                    
                }
            } catch (error) {
                const {response} = error
                
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({type: 'error', message: 'Echec', description: errorMessage })
                }
            }
        }
    }

    const handleSumbitCertificationOffShore = async (e) => {
        e.preventDefault()
        if(certificationsAdded.length > 0 && certificationExpireAt) {
            setLoadingSendOtherCompetence(true);
            try {
                const userOnline = await UserService.updateUser({certifications: {certification: certificationsAdded[0], expire_at: certificationExpireAt.toISOString()}});
                if(userOnline.etat) {
                    const {access_token, ...rest} = userOnline.result.client;
                    setUser(rest);
                    setLoadingSendOtherCompetence(false);
                    setCertificationsAdded([]);
                    setCertificationExpireAt(null);
                    
                }
            } catch (error) {
                const {response} = error
                
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({type: 'error', message: 'Echec', description: errorMessage })
                }
            }
        }
    }

    const handleSumbitCertificationOnShore = async (e) => {
        e.preventDefault()
        if(certificationsOnShoreAdded.length > 0 && certificationOnShoreExpireAt) {
            setLoadingSendSkill(true);
            try {
                const userOnline = await UserService.updateUser({certificationsOnShore: {certification: certificationsOnShoreAdded, expire_at: certificationOnShoreExpireAt.toISOString()}});
                if(userOnline.etat) {
                    const {access_token, ...rest} = userOnline.result.client;
                    setUser(rest);
                    setLoadingSendSkill(false);
                    setCertificationsOnShoreAdded([]);
                    setCertificationOnShoreExpireAt(null);
                
                }
            } catch (error) {
                const {response} = error
                
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({type: 'error', message: 'Echec', description: errorMessage })
                }
            }
        }
    }

    const handleSumbitAvailableOffShore = async (onShore) => {
        try {
            setAvailableOffShore(onShore);
            const userOnline = await UserService.updateUser({onShore});
            if(userOnline.etat) {
                const {access_token, ...rest} = userOnline.result.client;
                setUser(rest);
            }
        } catch (error) {
            const {response} = error
            
            for (const errorMessage of response.data.message) {
                openNotificationWithIcon({type: 'error', message: 'Echec', description: errorMessage })
            }
        }
        
    }

    const handleSumbitDegree = async (e) => {
        e.preventDefault()
        if(degree.length > 0) {
            try {
                const levelGruaduate = parseInt(degree.split(':')[1], 10)
                const userOnline = await UserService.updateUser({levelGruaduate});
                if(userOnline.etat) {
                    const {access_token, ...rest} = userOnline.result.client;
                    setUser(rest);
                    
                    setDegree([]);
                    setIsEditDegree(false);
                    
                }
            } catch (error) {
                const {response} = error
                
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({type: 'error', message: 'Echec', description: errorMessage })
                }
            }
        }
    }

    const handleSumbitYearExperience = async (e) => {
        e.preventDefault()
        if(yearsExperience.length > 0) {
            try {
                const yearExperience = new Date().getFullYear() - parseInt(yearsExperience, 10);
                const userOnline = await UserService.updateUser({yearExperience});
                if(userOnline.etat) {
                    const {access_token, ...rest} = userOnline.result.client;
                    setUser(rest);
                    
                    setYearsExperience('');
                    setIsEditYearExperience(false);
                    
                }
            } catch (error) {
                const {response} = error
                
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({type: 'error', message: 'Echec', description: errorMessage })
                }
            }
        }
    }

    const handleSumbitJob = async (e) => {
        e.preventDefault()
        if(otherCompetencesAdded.length > 0 && !stateCreateJob) {
            setStateCreateJob(true)
            try {
                messageApi.loading("emploi en cours de création")
                const newJob = await JobOfferService.createJob({...formValues, skills: otherCompetencesAdded.join(';')});
                if(newJob.etat) {
                    setFormValues({
                        title: '',
                        description: null,
                        location: '',
                        contractType: null,
                        salaryRange: '',
                        onShore: false
                    
                    })
                    setDomainesAdded([])
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

    const handleSubmitBirthInfo = async (e) => {
        e.preventDefault();
        if (birthDate && birthPlace) {
            setLoadingSendBirthInfo(true);
            try {
                const userOnline = await UserService.updateUser({
                    birthDate: birthDate.toISOString(),
                    birthPlace
                });
                if (userOnline.etat) {
                    const { access_token, ...rest } = userOnline.result.client;
                    setUser(rest);
                    setLoadingSendBirthInfo(false);
                    setBirthDate(null);
                    setBirthPlace(null);
                }
            } catch (error) {
                const { response } = error;
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({ type: 'error', message: 'Echec', description: errorMessage });
                }
            }
        }
    };

    const handleSubmitExperience = async (e) => {
        e.preventDefault();
        if (position && company && beginAt) {
            setLoadingSendExperience(true);
            try {
                const userOnline = await UserService.updateUser({
                    experiences: { position, company, begin_at: beginAt.toISOString(), end_at: endAt ? endAt.toISOString() : null }
                });
                if (userOnline.etat) {
                    const { access_token, ...rest } = userOnline.result.client;
                    setUser(rest);
                    setLoadingSendExperience(false);
                    setPosition(null);
                    setCompany(null);
                    setBeginAt(null);
                    setEndAt(null);
                }
            } catch (error) {
                const { response } = error;
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({ type: 'error', message: 'Echec', description: errorMessage });
                }
            }
        }
    };

    const handleSubmitLanguage = async (e) => {
        e.preventDefault();
        if (title && written && spoken) {
            setLoadingSendLanguage(true);
            try {
                const userOnline = await UserService.updateUser({
                    languages: { title, written, spoken }
                });
                if (userOnline.etat) {
                    const { access_token, ...rest } = userOnline.result.client;
                    setUser(rest);
                    setLoadingSendLanguage(false);
                    setTitle(null);
                    setWritten(null);
                    setSpoken(null);
                }
            } catch (error) {
                const { response } = error;
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({ type: 'error', message: 'Echec', description: errorMessage });
                }
            }
        }
    };

    const handleSubmitNationality = async (e) => {
        e.preventDefault();
        if (nationality) {
            setLoadingSendNationality(true);
            try {
                const userOnline = await UserService.updateUser({
                    nationality
                });
                if (userOnline.etat) {
                    const { access_token, ...rest } = userOnline.result.client;
                    setUser(rest);
                    setLoadingSendNationality(false);
                    setNationality("");
                }
            } catch (error) {
                const { response } = error;
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({ type: 'error', message: 'Echec', description: errorMessage });
                }
            }
        }
    };

    const handleSubmitHelperContact = async (e) => {
        e.preventDefault();
        if (helperContact) {
            setLoadingSendHelperContact(true);
            try {
                const userOnline = await UserService.updateUser({
                    helperContact
                });
                if (userOnline.etat) {
                    const { access_token, ...rest } = userOnline.result.client;
                    setUser(rest);
                    setLoadingSendHelperContact(false);
                    setHelperContact(null);
                }
            } catch (error) {
                const { response } = error;
                for (const errorMessage of response.data.message) {
                    openNotificationWithIcon({ type: 'error', message: 'Echec', description: errorMessage });
                }
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
        {contextMessageHolder}
        <Navbar navClass="defaultscroll sticky" logolight={true} menuClass = "navigation-menu nav-left nav-light"/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:"url('/images/bg/02.jpg')"}}>
            <div className="bg-overlay bg-gradient-overlay-2"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            
                            {loadedUser && user &&
                            <>
                            <Avatar
                            size={{ xs: 94, sm: 102, md: 110, lg: 124, xl: 130, xxl: 150 }}
                            src={`${baseUrlAssetLogos}/${user.profil}`}
                            />
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark mt-1">{user.fullName}</h5>
                            <span className="badge bg-primary">{user.role === CANDIDATE ? 'Profil Candidat': 'Compte Entreprise'}</span>
                            <br />
                            </>
                            }
                            
                            

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
                                            <div className='col-md-3'>
                                                <div className="text-center">
                                                    <h6 className="pb-1 bg-light rounded-3">Infos naissance</h6>
                                                    <ul className="tagcloud list-unstyled mt-1">
                                                        
                                                        {user && user.birthDate && <li key={`birthDate_${Math.floor(Math.random() * 99999999)}`} className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">{formatDate(user.birthDate)}</Link></li>}
                                                        {user && user.birthPlace && <li key={`birthPlace_${Math.floor(Math.random() * 99999999)}`} className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">{user.birthPlace}</Link></li>}
                                                    </ul>
                                                    <Box width={'100%'}>
                                                        <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between'>
                                                            <DatePicker 
                                                                style={{ width: '100%' }} 
                                                                value={birthDate} 
                                                                placeholder="Date de naissance" 
                                                                onChange={(date) => setBirthDate(date)} 
                                                            />
                                                            <Input
                                                                style={{ width: '100%' }}
                                                                value={birthPlace}
                                                                placeholder="Lieu de naissance"
                                                                onChange={(e) => setBirthPlace(e.target.value)}
                                                            />
                                                        </Stack>
                                                    </Box>
                                                    <div className='mt-3 mb-3'>
                                                        {birthDate && birthPlace && <button 
                                                            className={"btn w-100 " + (loadingSendBirthInfo ? 'btn-light' : 'btn-primary')} 
                                                            type="button" 
                                                            onClick={handleSubmitBirthInfo}
                                                        >
                                                            {loadingSendBirthInfo ? <Spin /> : 'Ajouter Informations'}
                                                        </button>}
                                                    </div>
                                                </div>
                                                <Box component={'div'} sx={{maxHeight: 110}}>
                                                    <Dragger {...props}>
                                                        <p className="ant-upload-drag-icon">
                                                        <InboxOutlined />
                                                        </p>
                                                        <p className="ant-upload-text">Cliquez ou faites glisser votre cv ici</p>
                                                        <p className="ant-upload-hint">
                                                        Prise en charge uniquement de pdf.
                                                        </p>
                                                    </Dragger>
                                                </Box>
                                            </div>
                                            <div className='col-md-3'>
                                                <div className="text-center">
                                                    <h6 className="pb-1 bg-light rounded-3">Domaines d'activités</h6>
                                                    <ul className="tagcloud list-unstyled mt-1">
                                                        
                                                        {user && user.domainsActivity.length > 0 && user.domainsActivity.map((domaine, index) => <li key={`domaine-${index}_${Math.floor(Math.random() * 99999999)}`} className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">{domaine}</Link></li>)}


                                                    </ul>

                                                    { isEditDomaine &&
                                                        <Select
                                                        mode="multiple"
                                                        allowClear
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        maxCount={2}
                                                        
                                                        value={domainesAdded}
                                                        placeholder="Ajouter maximum 2 domaines"
                                                        onChange={handleChangeDomaine}
                                                        options={domaines}
                                                    />
                                                    }
                                                    <div className='mt-3 mb-3'>
                                                    {domainesAdded.length > 0 && isEditDomaine && <button className={"btn w-100 " + (loadingSendSkill ? 'btn-light' : 'btn-primary')} type="button" onClick={handleSumbitDomaines}> {loadingSendSkill ? <Spin /> : 'Terminer'}</button>}
                                                    {user && user.domainsActivity.length > 0 && !isEditDomaine && <button className="btn w-100 btn-info" type="button" onClick={(e)=>{
                                                        e.preventDefault();
                                                        setIsEditDomaine(true);
                                                        handleChangeDomaine(user.domainsActivity)
                                                    }}>Modifier</button>}
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-center">
                                                    <h6 className="pb-1 bg-light rounded-3">Palettes de compétences</h6>
                                                    <ul className="tagcloud list-unstyled mt-1">
                                                        
                                                        {user && user.skills.length > 0 && user.skills.map((skill, index) => <li key={`skill-${index}_${Math.floor(Math.random() * 99999999)}`} className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">{skill}</Link></li>)}


                                                    </ul>

                                                        <Select
                                                        mode="tags"
                                                        allowClear
                                                        style={{
                                                            width: '100%',
                                                        }}                                                        
                                                        value={otherCompetencesAdded}
                                                        placeholder="Ajouter des compétences"
                                                        onChange={handleChangeOtherCompetences}
                                                        options={skillsLocals}
                                                    />
                                                    <div className='mt-3 mb-3'>
                                                    {otherCompetencesAdded.length > 0 && <button className={"btn w-100 " + (loadingSendOtherCompetence ? 'btn-light' : 'btn-primary')} type="button" onClick={handleSumbitSkill}> {loadingSendOtherCompetence ? <Spin /> : 'Terminer'}</button>}
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3'>
                                                <div className="text-center">
                                                    <h6 className="pb-1 bg-light rounded-3">Niveau d'étude</h6>
                                                    <ul className="tagcloud list-unstyled mt-1">
                                                        
                                                        {user && user.levelGruaduate && <li className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">{degreeAccademy.find(degreeItem => parseInt(degreeItem.value.split(':')[1], 10) === user.levelGruaduate).label}</Link></li>}


                                                    </ul>

                                                    { isEditDegree &&
                                                        <Select
                                                        allowClear
                                                        style={{
                                                            width: '100%',
                                                        }}                                                        
                                                        value={degree}
                                                        placeholder="Choisissez votre niveau d'étude"
                                                        onChange={handleChangeDegreeAccademy}
                                                        options={degreeAccademy}
                                                    />
                                                    }
                                                    <div className='mt-3 mb-3'>
                                                    {degree.length > 0 && isEditDegree && <button className={"btn w-100 " + (loadingSendSkill ? 'btn-light' : 'btn-primary')} type="button" onClick={handleSumbitDegree}> {loadingSendSkill ? <Spin /> : 'Terminer'}</button>}
                                                    {user && user.levelGruaduate && !isEditDegree && <button className="btn w-100 btn-light" type="button" onClick={(e)=>{
                                                        e.preventDefault();
                                                        setIsEditDegree(true)
                                                    }}>Modifier</button>}
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-center">
                                                    <h6 className="pb-1 bg-light rounded-3">Diplôme et certifications</h6>
                                                    <ul className="tagcloud list-unstyled mt-1">
                                                        
                                                        {user && user.certifications.length > 0 && user.certifications.map(({certification}, index) => <li key={`certification-${index}_${Math.floor(Math.random() * 99999999)}`} className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">{certification}</Link></li>)}


                                                    </ul>

                                                    <Box width={'100%'}>
                                                        <Stack direction='column' spacing={2} alignItems='center' justifyContent='center'>
                                                            <Select
                                                            maxCount={1}
                                                                mode="tags"
                                                                allowClear
                                                                style={{
                                                                    width: '100%',
                                                                }}                                                        
                                                                value={certificationsAdded}
                                                                placeholder="Certifications"
                                                                onChange={handleChangeCertificationOffShore}
                                                                options={certificationsLocal}
                                                            />
                                                            <DatePicker onChange={handleChangeExpireAtCertification} placeholder="Date d'expiration" value={certificationExpireAt} style={{width: '100%'}} />
                                                        </Stack>
                                                    </Box>
                                                    <div className='mt-3 mb-3'>
                                                    {certificationsAdded.length > 0 && <button className={"btn w-100 " + (loadingSendOtherCompetence ? 'btn-light' : 'btn-primary')} type="button" onClick={handleSumbitCertificationOffShore}> {loadingSendOtherCompetence ? <Spin /> : 'Terminer'}</button>}
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-3'>
                                            <div className="text-center">
                                                    <h6 className="pb-1 bg-light rounded-3">Travaillez vous en mer ?</h6>
                                                    <Flex vertical gap="middle">
                                                        <Radio.Group
                                                            block
                                                            options={optionsAvailableOffShore}
                                                            value={availableOffShore}
                                                            onChange={(e)=>{
                                                                e.preventDefault();
                                                                handleSumbitAvailableOffShore(e.target.value);
                                                                
                                                            }}
                                                            optionType="button"
                                                            buttonStyle="solid"
                                                        />
                                                    </Flex>
                                                </div>
                                                {
                                                    availableOffShore &&
                                                    (
                                                        <div className="mt-2 text-center">
                                                            <h6 className="pb-1 bg-light rounded-3">Certifications</h6>
                                                            <ul className="tagcloud list-unstyled mt-1">
                                                                
                                                            {user && user.certificationsOnShore.length > 0 && user.certificationsOnShore.map(({certification}, index) => <li key={`certificationOnShore-${index}_${Math.floor(Math.random() * 99999999)}`} className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">{certification}</Link></li>)}


                                                            </ul>
                                                            <Box width={'100%'}>
                                                                <Stack direction='column' spacing={2} alignItems='center' justifyContent='center'>
                                                                    <Select
                                                                        
                                                                        allowClear
                                                                        style={{
                                                                            width: '100%',
                                                                        }}                                                        
                                                                        value={certificationsOnShoreAdded}
                                                                        placeholder="Certifications reçu"
                                                                        onChange={handleChangeCertificationOnShore}
                                                                        options={certifications}
                                                                    />
                                                                    <DatePicker onChange={handleChangeExpireAtCertificationOnShore} placeholder="Date d'expiration" value={certificationOnShoreExpireAt} style={{width: '100%'}} />
                                                                </Stack>
                                                            </Box>
                                                                
                                                            <div className='mt-3 mb-3'>
                                                            {certificationsOnShoreAdded.length > 0 && <button className={"btn w-100 " + (loadingSendSkill ? 'btn-light' : 'btn-primary')} type="button" onClick={handleSumbitCertificationOnShore}> {loadingSendSkill ? <Spin /> : 'Terminer'}</button>}
                                                            
                                                            </div>
                                                        </div>
                                                    )
                                                }

<div className="mt-2 text-center">
                                                            <h6 className="pb-1 bg-light rounded-3">Année d'experience</h6>
                                                            {/* <p>Combien d'année d'experience avez-vous dans votre domaine de prédilection</p> */}
                                                            {
                                                                !isEditYearExperience ? (
                                                                    <ul className="tagcloud list-unstyled mt-1">
                                                                    {user && <li key={`certificationOnShore_${Math.floor(Math.random() * 99999999)}`} className="list-inline-item m-1"><Link href="#" className="rounded-3 fw-medium text-dark inline-block py-2 px-3">{new Date().getFullYear() - user.yearExperience} {new Date().getFullYear() - user.yearExperience > 1 ? 'années':'année'}</Link></li>}
                                                                    </ul>
                                                                )
                                                                :
                                                                (
                                                                    <Select
                                                                        
                                                                        allowClear
                                                                        style={{
                                                                            width: '100%',
                                                                        }}                                                        
                                                                        value={yearsExperience}
                                                                        placeholder="Combien d'année d'expérience avez-vous"
                                                                        onChange={(value) => {setYearsExperience(value)}}
                                                                        options={Array.from({ length: 20 }, (_, i) => ({ label: `${i+1} année${i+1>1 ? 's':''}`, value: (i+1).toString() }))}
                                                                    />
                                                                )
                                                            }

                                                            
                                                            <div className='mt-3 mb-3'>
                                                            {isEditYearExperience && <button className={"btn w-100 btn-primary"} type="button" onClick={handleSumbitYearExperience}> {loadingSendSkill ? <Spin /> : 'Terminer'}</button>}
                                                    {user && !isEditYearExperience && <button className="btn w-100 btn-info" type="button" onClick={(e)=>{
                                                        e.preventDefault();
                                                        setIsEditYearExperience(true);
                                                        setYearsExperience((new Date().getFullYear() - user.yearExperience).toString())
                                                    }}>Modifier</button>}
                                                            
                                                            </div>
                                                        </div>
                                                
                                            </div>
                                        </div>

                                    </div>

                                    <div className="card-body mt-4">
                                        
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="text-center">
                                                    <h6 className="pb-1 bg-light rounded-3">Expériences professionnelles</h6>
                                                    {user && user.experiences.length > 0 ? user.experiences.map((experience, index) => (
                                                        <Accordion sx={{mb: 2}}>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls={`panel3-content-experience-${index}`}
                                                                id={`panel3-header-experience-${index}`}
                                                            >
                                                                <Typography component="span">{experience.position}</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <Timeline
                                                                    items={[
                                                                        {
                                                                            color: 'blue',
                                                                            dot: <BankOutlined />,
                                                                            position:'left',
                                                                            children: (
                                                                                <Typo>
                                                                                    <Title level={5}>Entreprise</Title>
                                                                                    <Paragraph>
                                                                                        <Text>{experience.company}</Text>
                                                                                    </Paragraph>
                                                                                </Typo>
                                                                            )
                                                                        },
                                                                        {
                                                                            color: 'green',
                                                                            dot: <CalendarOutlined />,
                                                                            position:'left',
                                                                            children: (
                                                                                <Typo>
                                                                                    <Title level={5}>Date de début</Title>
                                                                                    <Paragraph>
                                                                                        <Text>{formatDate(experience.begin_at)}</Text>
                                                                                    </Paragraph>
                                                                                </Typo>
                                                                            )
                                                                        },
                                                                        {
                                                                            color: 'red',
                                                                            dot: <CalendarOutlined />,
                                                                            position:'left',
                                                                            children: (
                                                                                <Typo>
                                                                                    <Title level={5}>Date de fin</Title>
                                                                                    <Paragraph>
                                                                                        <Text>{experience.end_at ? formatDate(experience.end_at) : 'y travail encore'}</Text>
                                                                                    </Paragraph>
                                                                                </Typo>
                                                                            )
                                                                        },

                                                                    ]}
                                                                />
                                                            </AccordionDetails>
                                                            {/* <AccordionActions>
                                                                <Button>Cancel</Button>
                                                                <Button>Agree</Button>
                                                            </AccordionActions> */}
                                                    </Accordion>
                                                    )):
                                                    (
                                                        <Empty style={{marginBottom: 10}} description={
                                                            <Typo.Text>
                                                            Aucune expérience professionnel renseignée
                                                            </Typo.Text>
                                                        } />
                                                    )}

                                                    <Box width={'100%'} sx={{mt: 2}}>
                                                        <h6 className="pb-1 bg-light rounded-3">Ajouter une nouvelle expérience</h6>
                                                        <Input style={{marginBottom: 5}} type="text" name="position" id="position"
                                                                    value={position}
                                                                    placeholder="Poste occupé"
                                                                    onChange={(e) => setPosition(e.target.value)}
                                                                />
                                                            <Input style={{marginBottom: 5}} type="text" name="company" id="company"
                                                                    value={company}
                                                                    placeholder="Nom de l'entreprise"
                                                                    onChange={(e) => setCompany(e.target.value)}
                                                                />
                                                            
                                                            <DatePicker 
                                                                onChange={(date) => setBeginAt(date)} 
                                                                placeholder="Date de début" 
                                                                value={beginAt} 
                                                                style={{ width: '100%', marginBottom: 5 }} 
                                                            />
                                                            <DatePicker 
                                                                onChange={(date) => setEndAt(date)} 
                                                                placeholder="Date de fin" 
                                                                value={endAt} 
                                                                style={{ width: '100%', marginBottom: 5 }} 
                                                            />
                                                    </Box>
                                                    <div className='mt-3 mb-3'>
                                                        {position && company && beginAt && <button 
                                                            className={"btn w-100 " + (loadingSendExperience ? 'btn-light' : 'btn-primary')} 
                                                            type="button" 
                                                            onClick={handleSubmitExperience}
                                                        >
                                                            {loadingSendExperience ? <Spin /> : 'Ajouter Expérience'}
                                                        </button>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="text-center">
                                                    <h6 className="pb-1 bg-light rounded-3">Langues</h6>
                                                    {user && user.languages.length > 0 ? user.languages.map((language, index) => (
                                                        <Accordion sx={{mb: 2}}>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls={`panel3-content-${index}`}
                                                                id={`panel3-header-${index}`}
                                                            >
                                                                <Typography component="span">{language.title}</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <Timeline
                                                                    items={[
                                                                        {
                                                                            color: 'blue',
                                                                            dot: <EditOutlined />,
                                                                            position:'left',
                                                                            children: (
                                                                                <Typo>
                                                                                    <Title level={5}>À l'écrit</Title>
                                                                                    <Paragraph>
                                                                                        <Text>{language.written === 'A' ? 'Très bien': language.written === 'B' ? 'Bien': 'Pas du tout'}</Text>
                                                                                    </Paragraph>
                                                                                </Typo>
                                                                            )
                                                                        },
                                                                        {
                                                                            color: 'green',
                                                                            dot: <SmileOutlined />,
                                                                            position:'left',
                                                                            children: (
                                                                                <Typo>
                                                                                    <Title level={5}>À l'oral</Title>
                                                                                    <Paragraph>
                                                                                        <Text>{language.spoken === 'A' ? 'Très bien': language.spoken === 'B' ? 'Bien': 'Pas du tout'}</Text>
                                                                                    </Paragraph>
                                                                                </Typo>
                                                                            )
                                                                        },

                                                                    ]}
                                                                />
                                                            </AccordionDetails>
                                                            
                                                    </Accordion>
                                                    )):
                                                    (
                                                        <Empty style={{marginBottom: 10}} description={
                                                            <Typo.Text>
                                                            Aucune langue renseignée
                                                            </Typo.Text>
                                                        } />
                                                    )}

                                                    <Box width={'100%'} sx={{mt: 2}}>
                                                    <h6 className="pb-1 bg-light rounded-3">Ajouter une nouvelle langue</h6>
                                                        <Stack direction='column' spacing={2} alignItems='center' justifyContent='center'>
                                                            <Select
                                                                style={{ width: '100%' }}
                                                                value={title}
                                                                placeholder="Sélectionnez une langue"
                                                                onChange={(value) => setTitle(value)}
                                                                options={languageOptions}
                                                            />
                                                            <Select
                                                                style={{ width: '100%' }}
                                                                value={written}
                                                                placeholder="Niveau écrit"
                                                                onChange={(value) => setWritten(value)}
                                                                options={valueWrittenAndSpoken}
                                                            />
                                                            <Select
                                                                style={{ width: '100%' }}
                                                                value={spoken}
                                                                placeholder="Niveau oral"
                                                                onChange={(value) => setSpoken(value)}
                                                                options={valueWrittenAndSpoken}
                                                            />
                                                        </Stack>
                                                    </Box>
                                                    <div className='mt-3 mb-3'>
                                                        {title && written && spoken && <button 
                                                            className={"btn w-100 " + (loadingSendLanguage ? 'btn-light' : 'btn-primary')} 
                                                            type="button" 
                                                            onClick={handleSubmitLanguage}
                                                        >
                                                            {loadingSendLanguage ? <Spin /> : 'Ajouter Langue'}
                                                        </button>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="text-center">
                                                    <h6 className="pb-1 bg-light rounded-3">Nationalité</h6>
                                                    {user && user.nationality && <Typography component="span">{user.nationality}</Typography>}

                                                    <Box width={'100%'}>
                                                        <Stack direction='column' spacing={2} alignItems='center' justifyContent='center'>
                                                            <Input
                                                                style={{ width: '100%' }}
                                                                value={nationality}
                                                                placeholder="Saisissez votre nationalité"
                                                                onChange={(e) => setNationality(e.target.value)}
                                                            />
                                                        </Stack>
                                                    </Box>
                                                    <div className='mt-3 mb-3'>
                                                        {nationality && <button 
                                                            className={"btn w-100 " + (loadingSendNationality ? 'btn-light' : 'btn-primary')} 
                                                            type="button" 
                                                            onClick={handleSubmitNationality}
                                                        >
                                                            {loadingSendNationality ? <Spin /> : 'Ajouter Nationalité'}
                                                        </button>}
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-center">
                                                    <h6 className="pb-1 bg-light rounded-3">Autre contact</h6>
                                                    {user && user.helperContact && <Typography component="span">{user.helperContact}</Typography>}

                                                    <Box width={'100%'} sx={{mt: 2}}>
                                                        <Stack direction='column' spacing={2} alignItems='center' justifyContent='center'>
                                                            <Input
                                                                style={{ width: '100%' }}
                                                                value={helperContact}
                                                                placeholder="Un autre numéro à joindre en cas d'urgence"
                                                                onChange={(e) => setHelperContact(e.target.value)}
                                                            />
                                                        </Stack>
                                                    </Box>
                                                    <div className='mt-3 mb-3'>
                                                        {helperContact && <button 
                                                            className={"btn w-100 " + (loadingSendHelperContact ? 'btn-light' : 'btn-primary')} 
                                                            type="button" 
                                                            onClick={handleSubmitHelperContact}
                                                        >
                                                            {loadingSendHelperContact ? <Spin /> : "Ajouter contact d'urgence"}
                                                        </button>}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        

                                        
                                    </div>
                                    
                                        {/* <blockquote className="text-center mx-auto blockquote"><i className="mdi mdi-format-quote-open mdi-48px text-muted opacity-2 d-block"></i> Je suis un jeune passionné et sachant travailler sous pression.<small className="d-block text-muted mt-2">- Intro</small></blockquote> */}
                                                                
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
                                            {user?.candidatures?.map((candidature)=>{
                                                return(
                                                    <div key={`candidature_${Math.floor(Math.random() * 99999999)}`} className="col-lg-6 col-md-6 col-12">
                                                        <Link href={`/job/${candidature.jobOffer._id}`}>
                                                        <div className="blog blog-primary d-flex align-items-center mt-3">
                                                            <Image src={`${baseUrlAssetLogos}/${candidature.jobOffer.cover}`} width={105} height={65} className="avatar avatar-small rounded-3" style={{width: "auto"}} alt={candidature.jobOffer.title}/>
                                                            <div className="flex-1 ms-3">
                                                                <h6 className="d-block title text-dark fw-medium">{candidature.jobOffer.title}</h6>
                                                                <span className="text-muted small">{horodatage(candidature.created_at)}</span>
                                                                <Tag style={{marginLeft: 5}} color={displayStatus(candidature.status)[1]}>{displayStatus(candidature.status)[0]}</Tag>
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
                                        <ul className="tagcloud list-unstyled mt-1">
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
                                                        <label htmlFor="floatingInput">Situation géographique</label>
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
                                                            mode="tags"
                                                            allowClear
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                            value={otherCompetencesAdded}
                                                            placeholder="Ajouter les compétences"
                                                            onChange={handleChangeOtherCompetences}
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


                                                <div className="col-md-12 col-12">
                                                    <div className="form-check mt-3 mb-3">
                                                        <input className="form-check-input" type="checkbox" checked={formValues.onShore} id="flexCheckDefault" onClick={(e) => {
                                                            setFormValues({...formValues, onShore: !formValues.onShore })
                                                        }}/>
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">Cette offre d'emploie est sur mer</label>
                                                    </div>
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
                                                                            <Image src={`${baseUrlAssetLogos}/${job.cover}`} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid h-100 w-100" alt="illustration job"/>
                                                                            
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