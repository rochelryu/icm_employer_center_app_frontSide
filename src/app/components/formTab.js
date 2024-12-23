'use client'
import React, { useState } from "react";
import Link from "next/link";

export default function FormTab(){
    let [activeIndex, setActiveIndex] = useState(0)
    return(
        <div >
            <ul className="nav nav-pills bg-white shadow border-bottom p-3 flex-row d-md-inline-flex nav-justified mb-0 rounded-top-3 position-relative overflow-hidden">
                <li className="nav-item m-1">
                    <Link className={`${activeIndex === 0 ? 'active' : '' } nav-link py-2 px-4  rounded-3 fw-medium`} href="#" scroll={false} onClick={()=>setActiveIndex(0)} >
                        Buy
                    </Link>
                </li>
                
                <li className="nav-item m-1">
                    <Link className={`${activeIndex === 1 ? 'active' : '' } nav-link py-2 px-4  rounded-3 fw-medium`} href="#" scroll={false} onClick={()=>setActiveIndex(1)}>
                        Sell
                    </Link>
                </li>

                <li className="nav-item m-1">
                    <Link className={`${activeIndex === 2 ? 'active' : '' } nav-link py-2 px-4  rounded-3 fw-medium`} href="#" scroll={false} onClick={()=>setActiveIndex(2)}>
                        Rent
                    </Link>
                </li>
            </ul>
            
            <div className="tab-content bg-white rounded-bottom-3 rounded-end-3 sm-rounded-0 shadow">
                {activeIndex === 0 ? 
                    <div className="card border-0 tab-pane fade show active">
                        <div className="text-center subscribe-form p-4">
                            <form style={{maxWidth:'800px'}}>
                                <div className="mb-0">
                                    <input type="text" id="help" name="name" className="shadow rounded-3 bg-white" required="" placeholder="City, Address, Zip"/>
                                    <button type="submit" className="btn btn-primary rounded-3">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>:""
                }
                {activeIndex === 1 ? 
                    <div className="card border-0 tab-pane fade show active">
                        <div className="text-center subscribe-form p-4">
                            <form style={{maxWidth:'800px'}}>
                                <div className="mb-0">
                                    <input type="text" id="help" name="name" className="shadow rounded-3 bg-white" required="" placeholder="City, Address, Zip"/>
                                    <button type="submit" className="btn btn-primary rounded-3">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>:""
                }
                {activeIndex === 2 ? 
                    <div className="card border-0 tab-pane fade show active">
                        <div className="text-center subscribe-form p-4">
                            <form style={{maxWidth:'800px'}}>
                                <div className="mb-0">
                                    <input type="text" id="help" name="name" className="shadow rounded-3 bg-white" required="" placeholder="City, Address, Zip"/>
                                    <button type="submit" className="btn btn-primary rounded-3">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>:""
                }

                
            </div>
        </div>
    )
}