'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Segmented, Spin, Select, Upload, Flex, notification } from 'antd';
import  UserService from '../../../services/userService';
import  CompanyService from '../../../services/companyService';
import {domainesActivites} from "../../../constants/skills/skills";
import ImgCrop from 'antd-img-crop';
import { useRouter } from 'next/navigation';

export default function Signup(){
    const router = useRouter();
    const [formValues, setFormValues] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        website: '',
        industry: null,
        location: '',
        logo: '',
        logoName: '',
    });
    const [fileList, setFileList] = useState([]);

    const [isParticular, setParticular] = useState(true)
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value // Mise à jour dynamique basée sur le `name` du champ
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!loading) {
            try {
                if(isParticular) {
                    const values = Object.values(formValues);
                    const validForm = values.filter(value => value.trim().length === 0).length === 0
                    if(validForm) {
                        setLoading(true)
                        const response = await UserService.signup({...formValues, role: isParticular ? 'CANDIDATE': 'RECRUITER'});
                        if(response.etat) {
                            openNotificationWithIcon({type: 'success', message: 'Bon retour', description: "Bienvenue parmis nous"})
                            router.push('/profil');
                        }
                        setLoading(false)
                    }
                } else {
                    setLoading(true)
                    const response = await UserService.signup({...formValues, role: isParticular ? 'CANDIDATE': 'RECRUITER'});
                        if(response.etat) {
                            
                            const company = await CompanyService.createCompany({...formValues, name:formValues.fullName})
                            if(company.etat) {
                                openNotificationWithIcon({type: 'success', message: 'Bon retour', description: "Vous faites partie maintenant du reseau"})
                                router.push('/profil');
                            }
                            setLoading(false)
                        } else {
                            setLoading(false)
                            openNotificationWithIcon({type: 'warning', message: 'Erreur', description: "Une erreur s'est produite veuillez encore ressayer."})
                        }
                        
                }
            } catch (error) {
                const {response} = error
                    setLoading(false)
                
                    for (const errorMessage of response.data.message) {
                        openNotificationWithIcon({type: 'error', message: 'Echec', description: errorMessage })
                    }
            }
        }
    };

    const onChange = ({ fileList: newFileList }) => {
        // Limiter à un seul fichier
        const fileInfo = {
            logo: null,
            logoName: null
        }
        if (newFileList.length > 1) {
          newFileList = newFileList.slice(-1);
        }
    
        setFileList(newFileList);
    
        if (newFileList.length > 0) {
          const file = newFileList[0];
          const reader = new FileReader();

          fileInfo.logoName = file.name;
    
          reader.readAsDataURL(file.originFileObj); // Lecture du fichier en base64
    
          reader.onload = () => {
            fileInfo.logo = reader.result
            setFormValues({...formValues, ...fileInfo})
          };
        } else {
            setFormValues({...formValues, ...fileInfo})
        }
      };
    
      const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
      };

      const openNotificationWithIcon = ({type, message, description}) => {
        api[type]({
          message,
          description
        });
      };
    return(
        <section className="bg-home zoom-image d-flex align-items-center">
            {contextHolder}
            <div className="bg-overlay image-wrap" style={{backgroundImage:"url('/images/bg/03.jpg')", backgroundPosition:'center'}}></div>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="p-4 bg-white rounded-3 shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                            <form onSubmit={handleSubmit}>
                                <h5 className="mb-3">Enregistrez votre compte</h5>
                                <Segmented options={['Particulier','Entreprise']} block onChange={(value) => {setParticular(value === 'Particulier')}} />
                                    {
                                        isParticular ?
                                        (
                                            <>
                                            <div className="form-floating mb-2 mt-2">
                                                <input type="text" name="fullName" onChange={handleChange} value={formValues.fullName} className="form-control" id="floatingInput" placeholder="Harry"/>
                                                <label htmlFor="floatingInput">Nom complet</label>
                                            </div>

                                            <div className="form-floating mb-2">
                                                <input type="email" name="email" onChange={handleChange} value={formValues.email} className="form-control" id="floatingEmail" placeholder="name@example.com"/>
                                                <label htmlFor="floatingEmail">Email</label>
                                            </div>

                                            <div className="form-floating mb-2">
                                                <input type="tel" name="phoneNumber" onChange={handleChange} value={formValues.phoneNumber} className="form-control" id="floatingPhoneNumber" placeholder="0XXXXXXXXX"/>
                                                <label htmlFor="floatingPhoneNumber">Numero de téléphone</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="password" name="password" onChange={handleChange} value={formValues.password} className="form-control" id="floatingPassword" placeholder="xxxxxxxxxx"/>
                                                <label htmlFor="floatingPassword">Mot de passe</label>
                                            </div>
                                        
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                                <label className="form-check-label text-muted" htmlFor="flexCheckDefault">J&apos;accepte <Link href="#" className="text-primary">les termes et conditions d&apos;utilisations</Link></label>
                                            </div>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                            <Flex gap={'middle'} align='center' vertical justify="center" style={{margin: 10}}>
                                            <ImgCrop rotationSlider>
                                                <Upload
                                                listType="picture-card"
                                                fileList={fileList}
                                                onChange={onChange}
                                                onPreview={onPreview}
                                                beforeUpload={() => false} // Désactive l'upload automatique
                                                maxCount={1} // Limiter à un seul fichier
                                                >
                                                {fileList.length < 1 && '+ Logo'}
                                                </Upload>
                                            </ImgCrop>
                                            </Flex>
                                            <div className="form-floating mb-2 mt-2">
                                                <input type="text" name="fullName" onChange={handleChange} value={formValues.fullName} className="form-control" id="floatingInput" placeholder="Harry"/>
                                                <label htmlFor="floatingInput">Nom de l'entreprise</label>
                                            </div>
                                            <div className="form-floating mb-2 mt-2">
                                                <Select
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    value={formValues.industry}
                                                    placeholder="Quel est votre domaine d'activité"
                                                    onChange={(value) => { setFormValues({...formValues,industry: value })}}
                                                    options={domainesActivites}
                                                />
                                            </div>
                                            
                                            <div className="form-floating mb-2 mt-2">
                                                <input type="text" name="website" onChange={handleChange} value={formValues.website} className="form-control" id="floatingInput" placeholder="Harry"/>
                                                <label htmlFor="floatingInput">Site web de l'entreprise</label>
                                            </div>
                                            <div className="form-floating mb-2 mt-2">
                                                <input type="text" name="location" onChange={handleChange} value={formValues.location} className="form-control" id="floatingInput" placeholder="Harry"/>
                                                <label htmlFor="floatingInput">Lieu de l'entreprise</label>
                                            </div>

                                            <div className="form-floating mb-2">
                                                <input type="email" name="email" onChange={handleChange} value={formValues.email} className="form-control" id="floatingEmail" placeholder="name@example.com"/>
                                                <label htmlFor="floatingEmail">Email</label>
                                            </div>

                                            <div className="form-floating mb-2">
                                                <input type="tel" name="phoneNumber" onChange={handleChange} value={formValues.phoneNumber} className="form-control" id="floatingPhoneNumber" placeholder="0XXXXXXXXX"/>
                                                <label htmlFor="floatingPhoneNumber">Numero de téléphone</label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input type="password" name="password" onChange={handleChange} value={formValues.password} className="form-control" id="floatingPassword" placeholder="xxxxxxxxxx"/>
                                                <label htmlFor="floatingPassword">Mot de passe</label>
                                            </div>
                                        
                                            <div className="form-check mb-3">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                                <label className="form-check-label text-muted" htmlFor="flexCheckDefault">J&apos;accepte <Link href="#" className="text-primary">les termes et conditions d&apos;utilisations</Link></label>
                                            </div>
                                            </>
                                        )
                                    }
                                
                
                                <button className={"btn w-100 " + (loading ? 'btn-light' : 'btn-primary')} type="submit"> {loading ? <Spin /> : 'Terminer'}</button>

                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted me-2">Vous avez déjà un compte ? </span> <Link href="/auth-login" className="text-dark fw-medium">Connectez-vous</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}