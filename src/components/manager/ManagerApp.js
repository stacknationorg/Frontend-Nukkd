import React from 'react'

import "../../assets/admin/css/material-dashboard-react.css?v=1.9.0";
import ManagerHome from './ManagerHome';
import Error404 from "../Err404";
function ManagerApp(){
    let a = false;
    if(localStorage.getItem("manager-token")!=null)
        a = true;
    if(a){
        return (
            <>
                <ManagerHome/>
            </>
        );
    }
    else{
        return <Error404/>
    }

}

export default ManagerApp

