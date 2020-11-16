import React from 'react';
// import { useAuth } from '../../context/AuthContext';
import LoggedOffRoutes from './LoggedOffRoutes';
import LoggedOnRoutes from './LoggedOnRoutes';

// import { Container } from './styles';

interface Props {
  userInfo: any
}

const Routes: any = ({userInfo}: Props) => {
	return userInfo ? <LoggedOnRoutes userInfo={userInfo} /> : <LoggedOffRoutes />;
};

export default Routes;
