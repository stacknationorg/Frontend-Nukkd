import React from 'react'

import "../../assets/admin/css/material-dashboard-react.css?v=1.9.0";
import AdminHome from './AdminHome';
import Error404 from "../Err404";
function AdminApp(){
    let a = false;
    if(localStorage.getItem("admin-token")!=null)
        a = true;
    if(a){
        return (
            <>
                <AdminHome/>
            </>
        );
    }
    else{
        return <Error404/>
    }

}

export default AdminApp

