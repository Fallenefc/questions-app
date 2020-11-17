import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../Store/reducer';
// import { useAuth } from '../../context/AuthContext';
import LoggedOffRoutes from './LoggedOffRoutes';
import LoggedOnRoutes from './LoggedOnRoutes';

// import { Container } from './styles';

const Routes: any = () => {
  const user = useSelector((state: State) => state.user);
  console.log(user);
	return user ? <LoggedOnRoutes /> : <LoggedOffRoutes />;
};

export default Routes;
