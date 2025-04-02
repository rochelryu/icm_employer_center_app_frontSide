'use client'
import React,{useState,useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from 'antd'
import {FiSearch,FiUser} from '../assets/icons/vander'
import LocalService from "../../../services/localStorageService";
import UserService from "../../../services/userService";

export default function Navbar({navClass,logolight,menuClass}){
    const [scroll, setScroll] = useState(false);
    const [loadedUser, setLoadedUser] = useState(false);
    const [user, setUser] = useState(null);
    const [isMenu, setisMenu] = useState(false);
    const [modal, setModal] = useState(false)

    useEffect(() => {
        activateMenu()
        getUser()
        window.addEventListener("scroll", () => {
          setScroll(window.scrollY > 50);
        });
        const closeDropdown =()=>{
            setModal(false)
        }
        document.addEventListener("mousedown", closeDropdown);
        window.scrollTo(0, 0);
      }, []);

        const getUser = async () => {
            const userInfo = LocalService.getUser()
            setUser(userInfo)
            setLoadedUser(true)
            await UserService.addVisite(); 
        }

        const toggleMenu = () => {
            setisMenu(!isMenu);
            if (document.getElementById("navigation")) {
                const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
                anchorArray.forEach(element => {
                    element.addEventListener('click', (elem) => {
                        const target = elem.target.getAttribute("href")
                        if (target !== "") {
                            if (elem.target.nextElementSibling) {
                                var submenu = elem.target.nextElementSibling.nextElementSibling;
                                submenu.classList.toggle('open');
                            }
                        }
                    })
                });
            }
        };
        function getClosest(elem, selector) {

            // Element.matches() polyfill
            if (!Element.prototype.matches) {
                Element.prototype.matches =
                    Element.prototype.matchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.oMatchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    function (s) {
                        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                            i = matches.length;
                        while (--i >= 0 && matches.item(i) !== this) { }
                        return i > -1;
                    };
            }

            // Get the closest matching element
            for (; elem && elem !== document; elem = elem.parentNode) {
                if (elem.matches(selector)) return elem;
            }
            return null;

        };

        function activateMenu() {
            var menuItems = document.getElementsByClassName("sub-menu-item");
            if (menuItems) {

                var matchingMenuItem = null;
                for (var idx = 0; idx < menuItems.length; idx++) {
                    if (window.location.href.includes(menuItems[idx].href)) {
                        matchingMenuItem = menuItems[idx];
                    }
                }

                if (matchingMenuItem) {
                    matchingMenuItem.classList.add('active');
                
                
                    var immediateParent = getClosest(matchingMenuItem, 'li');
            
                    if (immediateParent) {
                        immediateParent.classList.add('active');
                    }
                    
                    var parent = getClosest(immediateParent, '.child-menu-item');
                    if(parent){
                        parent.classList.add('active');
                    }

                    var parent = getClosest(parent || immediateParent , '.parent-menu-item');
                
                    if (parent) {
                        parent.classList.add('active');

                        var parentMenuitem = parent.querySelector('.menu-item');
                        if (parentMenuitem) {
                            parentMenuitem.classList.add('active');
                        }

                        var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
                        if (parentOfParent) {
                            parentOfParent.classList.add('active');
                        }
                    } else {
                        var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
                        if (parentOfParent) {
                            parentOfParent.classList.add('active');
                        }
                    }
                }
            }
        }
    return(
        <>
         <header id="topnav" className={`${scroll ? "nav-sticky" :""} ${navClass}`}>
            <div className="container">
                {logolight === true ? 
                    <Link className="logo" href="/">
                        <span className="logo-light-mode">
                            <Image src='/images/logo-dark.png' width={69} height={70} className="l-dark" alt=""/>
                            <Image src='/images/logo-light.png' width={69} height={70} className="l-light" alt=""/>
                        </span>
                        <Image src='/images/logo-light.png' width={69} height={70} className="logo-dark-mode" alt=""/>
                    </Link> :
                    <Link className="logo" href="/">
                        <Image src='/images/logo-dark.png' width={69} height={70} className="logo-light-mode" alt=""/>
                        <Image src='/images/logo-light.png' width={69} height={70} className="logo-dark-mode" alt=""/>
                    </Link>
                }

                <div className="menu-extras">
                    <div className="menu-item">
                        <Link href="#" className={`navbar-toggle ${isMenu ? 'open' : ''}`} id="isToggle" onClick={() => toggleMenu()}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                       
                    </div>
                </div>

                <ul className="buy-button list-inline mb-0">
                    
                    <li className="list-inline-item ps-1 mb-0">
                        {loadedUser && !user && (<Link href="/auth-login" className="btn btn-pills btn-primary">Identifiez-vous <i className="mdi mdi-arrow-right align-middle"></i></Link>)}
                        {loadedUser && user && (
                            <Tooltip placement="left" title={"Visiter votre compte"} arrow={{pointAtCenter: true}}>
                                <Link href="/profil" className="btn btn-sm btn-icon btn-pills btn-primary" ><FiUser className="fea icon-xl"/></Link>
                            </Tooltip>)}
                        
                    </li>
                </ul>
        
                <div id="navigation" style={{ display: isMenu ? 'block' : 'none' }}>
                    <ul className={menuClass}>
                        
                        <li><Link href="/" className="sub-menu-item">Accueil</Link></li>
                        
                        <li><Link href="/joblist" className="sub-menu-item">Offres emploi</Link></li>
                        <li><Link href="/formations" className="sub-menu-item">Formations</Link></li>
        
                        {/* <li className="has-submenu parent-parent-menu-item">
                            <Link href="#">Programme & Service</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li className="has-submenu parent-menu-item"><Link href="#"> Programmes </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link href="#" className="sub-menu-item">Programme 1</Link></li>
                                        <li><Link href="#" className="sub-menu-item">Programme 2</Link></li>
                                    </ul> 
                                </li>
                                <li className="has-submenu parent-menu-item"><Link href="#"> Services </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link href="#" className="sub-menu-item">Service 1</Link></li>
                                        <li><Link href="#" className="sub-menu-item">Service 2</Link></li>
                                    </ul>  
                                </li>
                                
                            </ul>
                        </li> */}
        
                        
                        
                        <li><Link href="/contact" className="sub-menu-item">Contactez-nous</Link></li>
                    </ul>
                </div>
            </div>
        </header>
        </>
    )
}