import React from 'react'
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import { Routes } from '../shared/Routes';
import NavLinks from "../shared/NavLinks";

function Navigation({logo}) {
    const location = useLocation();
    let style = {};
    location.pathname==="/"?
        style = {height:"300px"}:
        style = {height:"70px",paddingBottom:"10px"}
    if(window.location.pathname.includes('/admin') || window.location.pathname.includes('/manager')){
        return(<></>);
    }
    return (
        <div>
            <div className="header-blue" style={style}>
                <nav className={`navbar ${location.pathname!=="/"? 'bg-dark': ''} navbar-light navbar-expand-md navigation-clean-search`}>
                    <div className="container-fluid"><Link className="navbar-brand" to="/"><img height="25px" width="25px" src={logo} alt="Website logo"/></Link><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse"
                            id="navcol-1">
                            <ul className="nav navbar-nav">
                                <NavLinks />
                            </ul>
                        </div>
                    </div>
                </nav>
                {location.pathname==="/"? <Header />: <></>}
            </div>
        </div>
    )
}

export default Navigation
