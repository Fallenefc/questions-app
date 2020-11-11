import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard'

interface Props {
	userInfo: any
}

const LoggedOnRoutes = ({userInfo}: Props) => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/'
				component={() => <Dashboard userInfo={userInfo}/>}
				/>
			</Switch>
		</BrowserRouter>
	);
};

export default LoggedOnRoutes;
