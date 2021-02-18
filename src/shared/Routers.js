import React from 'react'
import {Switch, Route} from "react-router-dom"
import { Routes } from './Routes'
import Err404 from '../components/Err404'

function Routers() {
    const keys = Object.keys(Routes)
    return (
        <Switch>
            {keys.map(key => {
                return <Route path={Routes[key].path} exact component={Routes[key].component} key={key} />
            })}
            <Route component={Err404} />
        </Switch>
    )
}

export default Routers
