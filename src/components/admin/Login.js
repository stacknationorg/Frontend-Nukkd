import React from 'react'
import { Redirect } from 'react-router-dom'
import { Routes } from '../../shared/Routes'
import {APILink, Name} from "../../shared/config"
import Title from '../../shared/Title'
import "../../assets/admin/css/material-dashboard-react.css?v=1.9.0";

// core components
import GridItem from "./components/Grid/GridItem.js";
import GridContainer from "./components/Grid/GridContainer.js";

import "../../assets/admin/css/admin.css";
import axios from "axios";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

function Login(){
    const loginBox = {
        margin: "10% 0 0 33%",
        background: "#fff",
        color: "#000",
        width: "35%",
        padding: "2rem",
        borderRadius: "7px",
        boxShadow: "0 0 3px 3px #A6B5BF"
    }
    const [username,setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');

    const login = (e) => {
        e.preventDefault();
        axios.post(`${APILink}/admin/login`,{username:username, password:password})
            .then(res => {
                if(res.data.status === "SUCCESS"){
                    localStorage.setItem("admin-token",res.data.id);
                    window.location.href="/admin/dashboard"
                }
                else{
                    toastr.error(res.data.message);
                }
            })
            .catch(err => toastr.error(err.toString()));
    }
    if(localStorage.getItem("admin-token") !==null){
        return <Redirect to={Routes.adminDashboard.path} />
    }
    else{
        return(
            <>
                <Title title={`${Name} | ${Routes.adminLogin.name}`} />
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <div style={loginBox}>
                            <h2 className="text-center">Admin Panel</h2>
                            <hr/><br/>
                            <form onSubmit={(e) => login(e)}>
                                <div className="form-group mb-2">
                                    <label htmlFor="username" className="bmd-label-floating">Username</label>
                                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} name="username"/>
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="password" className="bmd-label-floating">Password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} name="password"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </GridItem>
                </GridContainer>
            </>
        );
    }
}

export default Login
