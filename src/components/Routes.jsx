import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Logs from '../pages/Logs'
import Analytics from '../pages/Analytics'
import Settings from '../pages/Settings'


const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/Logs' component={Logs}/>
            <Route path='/Analytics' component={Analytics}/>
            <Route path='/Settings' component={Settings}/>


        </Switch>
    )
}

export default Routes
