import React, { ReactElement } from 'react'

interface Props {
  userInfo: any,
}

export default function index({userInfo}: Props): ReactElement {

  const handleClick = () => {
    localStorage.removeItem('token');
  }

  return (
    <div>
      Welcome, {userInfo ? userInfo.username : 'Loading'}
      <button onClick={handleClick}>Logout</button>
    </div>
  )
}
