'use client'
import React, {useState} from 'react'
import dynamic from "next/dynamic";
// const Select = dynamic(()=>import('react-select'),{ssr:false})
import { Button, message, Upload, Spin, Tag, Space, Table, Typography as Typo, Menu, Flex, Dropdown, Divider, notification, Badge } from 'antd';

import {FiDollarSign, FiHome,FiSearch} from "../../assets/icons/vander"

export default function SelectOne({search, onChange, handleSearchItem}){
    const [stateSearch, setStateSearch] = useState(false)
    // let categories = [
    //     { value: '1', label: 'Houses' },
    //     { value: '2', label: 'Apartment' },
    //     { value: '3', label: 'Offices' },
    //     { value: '4', label: 'Townhome' },
    // ]
    // let price = [
    //     { value: '1', label: '500' },
    //     { value: '1', label: '1000' },
    //     { value: '2', label: '2000' },
    //     { value: '3', label: '3000' },
    //     { value: '4', label: '4000' },
    //     { value: '5', label: '5000' },
    //     { value: '6', label: '6000' },
    //     { value: '7', label: '7000' },
    // ]
    const handleSearch = async (e) => {
        e.preventDefault();
        if(!stateSearch) {
            setStateSearch(true)
            await handleSearchItem()
            setStateSearch(false)
        }
    }
    return(
        <>
        <form className="card-body text-start">
            <div className="registration-form text-dark text-start">
                <div className="row g-lg-0">
                    <div className="col-lg-9 col-md-6 col-12">
                        <div className="mb-lg-0 mb-3">
                            <div className="filter-search-form position-relative filter-border">
                                <FiSearch className="fea icon-ex-md icons"/>
                                <input name="name" type="text" id="job-keyword" className="form-control filter-input-box bg-light border-0" value={search} onChange={onChange} placeholder="Récherchez par titre, ou type"/>
                            </div>
                        </div>
                    </div>
                    
                    {/* <div className="col-lg-3 col-md-6 col-12">
                        <div className="mb-lg-0 mb-3">
                            <div className="filter-search-form position-relative filter-border bg-light">
                                <FiHome className="fea icon-ex-md icons"/>
                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={categories} />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="mb-lg-0 mb-3">
                            <div className="filter-search-form position-relative filter-border bg-light">
                                <FiDollarSign className="fea icon-ex-md icons"/>
                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={price} />
                            </div>
                        </div>
                    </div> */}

                    <div className="col-lg-3 col-md-6 col-12">
                        <Flex align="center" justify="center" vertical style={{margin: 10}}>
                            {<button className={"btn w-100 " + (stateSearch ? 'btn-light' : 'btn-primary')} type="button" onClick={handleSearch}> {stateSearch ? <Spin /> : 'Rechercher'}</button>}
                        </Flex>
                        {/* <div>
                            <div className="filter-search-form position-relative filter-border bg-light">
                                <FiDollarSign className="fea icon-ex-md icons"/>
                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={price} />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}