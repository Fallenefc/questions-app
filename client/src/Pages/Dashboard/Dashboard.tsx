import React, { ReactElement, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../Components/Header/Header';
import { State } from '../../Store/reducer';

export default function Dashboard(): ReactElement {

  const user = useSelector((state: State) => state.user)

  useEffect(() => {
    console.log(user)
  })

  const handleClick = () => {
    localStorage.removeItem('token');
  }

  return (
    <div>
      <Header />
      Welcome, {user ? user.username : 'Loading'}
      <button onClick={handleClick}>Logout</button>
    </div>
  )
}
