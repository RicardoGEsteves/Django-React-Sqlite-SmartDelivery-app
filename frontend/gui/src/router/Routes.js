import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../components/Home';
import About from '../components/About';
import Contacts from '../components/Contacts';
import DeliveriesHistory from '../components/DeliveriesHistory';
import Delivery from '../components/Delivery';
import Simulator from '../components/Simulator';
const Routes = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contacts' component={Contacts} />
        <Route exact path='/history' component={DeliveriesHistory} />
        <Route exact path='/delivery' component={Delivery} />
        <Route exact path='/simulator' component={Simulator} />
    </Switch>
);

export default Routes;
