import React from "react";
import Link from "next/link";
import {FiMail} from '../assets/icons/vander'

export default function GetInTuch(){
    return(
        <div className="row justify-content-center">
            <div className="col-12">
                <div className="section-title text-center">
                    <h4 className="title mb-3">Avez vous une question ? </h4>
                    <p className="text-muted para-desc mb-0 mx-auto">Contactez nous directement sans detour.</p>
                    <div className="mt-4 pt-2">
                        <Link href="/contactus" className="btn btn-pills btn-primary"><span className="h5 mb-0 me-1"><FiMail className="fea icon-sm"/></span> En cliquant ici</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}