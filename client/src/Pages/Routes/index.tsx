import React from 'react';
// import { useAuth } from '../../context/AuthContext';
import LoggedOffRoutes from './LoggedOffRoutes';
import LoggedOnRoutes from './LoggedOnRoutes';

// import { Container } from './styles';

interface Props {
  loggedIn: any,
  userInfo: any
}

const Routes: any = ({loggedIn, userInfo}: Props) => {
	return loggedIn ? <LoggedOnRoutes userInfo={userInfo} /> : <LoggedOffRoutes />;
};

export default Routes;
