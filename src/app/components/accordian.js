'use client'
import React, { useState } from "react";

export default function Accordion(){
    let [activeIndex, setActiveIndex] = useState(1)
    let accordianData = [
        {
            id:1,
            title:'How does it work ?',
            desc:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
        },
        {
            id:2,
            title:'Do I need a designer to use Towntor ?',
            desc:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
        },
        {
            id:3,
            title:'What do I need to do to start selling ?',
            desc:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
        },
        {
            id:4,
            title:'What happens when I receive an order ?',
            desc:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
        },
    ] 

    return(
        <>
        <div className="accordion mt-4 pt-2" id="buyingquestion">
            {accordianData.map((item,index) =>{
            return(
            <div className="accordion-item rounded-3 mb-3" key={index}>
                <h2 className="accordion-header" id="headingOne">
                    <button className={`accordion-button border-0 bg-light ${activeIndex === item.id ? "active" : ""}`} onClick={()=>setActiveIndex(item.id)}>
                        {item.title}
                    </button>
                </h2>
                {activeIndex === item.id && (
                    <div id="collapseOne" className="accordion-collapse border-0" >
                        <div className="accordion-body text-muted">
                        {item.desc}
                        </div>
                    </div>
                )}
            </div>
            )
            })}
        </div>
        </>
    )
}