import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from './SignIn';
import Dash from './Dashboard';
import CarInfo from './CarDetails';
import AddCar from './AddCar';
import AddMedia from './AddMedia'
import PageNotFound from "./PageNotFound";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
        <UnauthenticatedRoute path="/login" component={SignIn} appProps={appProps}/>
        <Route path="/dashboard" component={Dash} appProps={appProps}/>
        <AuthenticatedRoute path="/carinfo" component={CarInfo} appProps={appProps}/>
        <AuthenticatedRoute path="/addcar" component={AddCar} appProps={appProps}/>
        <AuthenticatedRoute path="/addmedia" component={AddMedia} appProps={appProps}/>
        <Route component={PageNotFound} />
    </Switch>
  );
}