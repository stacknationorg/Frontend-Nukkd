import React from 'react'
import { Redirect } from 'react-router-dom';
import { Routes } from '../../shared/Routes';

import CustomerHome from './CustomerHome';
function UserApp(){
    const [a,setA] = React.useState(false);
    if(localStorage.getItem("cutomer-token")!=null)
        setA(true);
    if(a){
        return (
            <>
                <CustomerHome/>
            </>
        );
    }
    else{
        return <Redirect to={Routes.customerLogin.path}/>
    }

}

export default UserApp

