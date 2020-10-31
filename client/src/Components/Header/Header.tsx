import React, { ReactElement } from 'react'
import './styles.css'

export default function Header(): ReactElement<React.FC> {
  return (
    <header className='header'>
      <div className='home'>
        <span>Home</span>
      </div>
      <div className='about'>
        <span>About</span>
      </div>
    </header>
  )
}
