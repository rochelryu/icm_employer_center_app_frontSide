import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function  ResetPassword(){
    return(
        <section className="bg-home zoom-image d-flex align-items-center">
            <div className="bg-overlay image-wrap" style={{backgroundImage:"url('/images/bg/icm.jpg')", backgroundPosition:'center'}}></div>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="p-4 bg-white rounded-3 shadow-md mx-auto w-100" style={{maxWidth:'400px'}}>
                            <form>
                                <Link href="/"><Image src="/images/logo-icon-80.png" width={80} height={80} className="mb-4 d-block mx-auto" alt=""/></Link>
                                <h5 className="mb-3">Reset your password</h5>

                                <p className="text-muted">Please enter your email address. You will receive a link to create a new password via email.</p>
                            
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                
                                <button className="btn btn-primary w-100" type="submit">Send</button>

                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted me-2">Remember your password ? </span> <Link href="/auth-login" className="text-dark fw-medium">Sign in</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
