import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';

const LoggedRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Landing} />
			</Switch>
			<Switch>
				<Route path='/login' exact component={Login} />
			</Switch>
		</BrowserRouter>
	);
};

export default LoggedRoutes;
