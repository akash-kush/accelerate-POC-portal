
import React, { Component, Fragment } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage/homepage";
import PersistentDrawerLeft from './components/headerComponents/App-Bar/appBar';
import registerPartner from './components/register-partner/register-partner';
import FinalRegisterPage from './components/register-partner/finalRegisterPage';
import history from './history';


export default class Routes extends Component {
    constructor(props){
        super()
    }
    render() {
        return (
            <Router history={history}>
                 {/* <Route  exact path="/" component={NavBar} /> */}
                 <Route exact path="/" render={props=>
                <Fragment>
                {/* <NavBar/> */}
                <PersistentDrawerLeft/>
                {/* <PrimarySearchAppBar/> */}
                <Homepage/>
                </Fragment>
                
                }/>
                <Switch>
                    <Route  path="/registerPartner" component={registerPartner} />
                    <Route  path="/:finalsetpsforRegistration" component={FinalRegisterPage} />
                    >
                    {/* <Route path="/Products" component={Products} /> */}
                </Switch>
            </Router>
        )
    }
}