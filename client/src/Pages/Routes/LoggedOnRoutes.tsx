import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';

const LoggedOnRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Dashboard} />
			</Switch>
		</BrowserRouter>
	);
};

export default LoggedOnRoutes;
