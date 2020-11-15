import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import ResetPassword from '../ResetPassword/ResetPassword';
import Signup from '../Signup/Signup';

const LoggedRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={Landing} />
			</Switch>
			<Switch>
				<Route path='/login' exact component={Login} />
			</Switch>
			<Switch>
				<Route path='/signup' exact component={Signup} />
			</Switch>
			<Switch>
				<Route path='/resetPassword' exact component={ResetPassword} />
			</Switch>
		</BrowserRouter>
	);
};

export default LoggedRoutes;
