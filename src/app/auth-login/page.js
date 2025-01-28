'use client'
import React, { useState }  from "react";
import Link from "next/link";
import  UserService from '../../../services/userService';
import { Spin, notification } from 'antd';
import { useRouter } from 'next/navigation';


export default function AuthLogin(){
    const router = useRouter();
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false)

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
            const values = Object.values(formValues);
            const validForm = values.filter(value => value.trim().length === 0).length === 0
            if(validForm) {
                try {
                    setLoading(true)
                    const response = await UserService.signin(formValues);
                    setLoading(false)
                    if (response.etat) {
                        openNotificationWithIcon({type: 'success', message: 'Bon retour', description: "Nous sommes heureux de vous revoir"})
                        router.push('/profil');
                    } else {
                        openNotificationWithIcon({type: 'warning', message: 'Erreur', description: response.error})
                    }
                    
                    
                } catch (error) {
                    const {response} = error
                    setLoading(false)
                
                    for (const errorMessage of response.data.message) {
                        openNotificationWithIcon({type: 'error', message: 'Echec', description: errorMessage })
                    }
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
        <section className="bg-home zoom-image d-flex align-items-center">
            {contextHolder}
            <div className="bg-overlay image-wrap" style={{backgroundImage:"url('/images/bg/icm.jpg')", backgroundPosition:'center'}}></div>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="p-4 bg-white rounded-3 shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                            <form onSubmit={handleSubmit}>
                                <h5 className="mb-3">Connectez-vous avec vos informations</h5>
                                <div className="form-floating mb-2 mt-2">
                                            <input type="email" name="email" onChange={handleChange} value={formValues.email} className="form-control" id="floatingInput" placeholder="name@example.com"/>
                                            <label htmlFor="floatingInput">Email</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="password" name="password" onChange={handleChange} value={formValues.password} className="form-control" id="floatingPassword" placeholder="Mot de passe"/>
                                            <label htmlFor="floatingPassword">Mot de passe</label>
                                        </div>
                                    
                                        <div className="d-flex justify-content-between">
                                            <div className="mb-3">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                                    <label className="form-check-label text-muted" htmlFor="flexCheckDefault">Se souvenir moi</label>
                                                </div>
                                            </div>
                                            <span className="forgot-pass text-muted mb-0"><Link href="/auth-reset-password" className="text-muted">Mot de passe oublié ?</Link></span>
                                        </div>
                
                                <button className={"btn w-100 " + (loading ? 'btn-light' : 'btn-primary')} type="submit"> {loading ? <Spin /> : 'Connexion'}</button>

                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted me-2">Vous n&apos;avez pas de compte ?</span> <Link href="/auth-signup" className="text-dark fw-medium">Inscrivez-vous maintenant !</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
       