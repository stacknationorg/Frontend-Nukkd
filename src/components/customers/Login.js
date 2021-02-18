import React from 'react'
import { Name } from '../../shared/config';
import { Routes } from '../../shared/Routes';
import Title from '../../shared/Title';

function Login(props) {
        if(localStorage.getItem("customer-token") !== null){
            props.history.goBack();
        }
        else{
            return (
                <>
                    <Title title={`${Name} | ${Routes.customerLogin.name}`}/>
                    <div>
                        Work in progress(Login)
                    </div>
                </>
            );
        }
}

export default Login
