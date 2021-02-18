import React from 'react'
import { Name } from '../../shared/config';
import { Routes } from '../../shared/Routes';
import Title from '../../shared/Title';

function Register(props) {
    if(localStorage.getItem("customer-token") !== null){
        props.history.goBack();
    }
    else{
        return (
            <>
                <Title title={`${Name} | ${Routes.customerRegister.name}`}/>
                <div>
                    Work in progress(Register)
                </div>
            </>
        );
    }
}

export default Register
