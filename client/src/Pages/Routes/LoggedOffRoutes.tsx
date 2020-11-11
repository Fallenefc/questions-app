import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from '../Landing/Landing';

const LoggedRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Landing} />
			</Switch>
		</BrowserRouter>
	);
};

export default LoggedRoutes;
