import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Routes } from '../../shared/Routes'
import Err404 from '../Err404'

function CustomerHome() {
    return (
        <Switch>
            <Route component={Err404} />
        </Switch>
    )
}

export default CustomerHome
