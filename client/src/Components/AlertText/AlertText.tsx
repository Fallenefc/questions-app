import React, { ReactElement } from 'react';
import './styles.css';

interface Props {
  text: string
}

export default function AlertText({text}: Props): ReactElement {
  return (
    <div className='alert-text'>
      <i className="fa fa-info-circle"></i>
      {text}
    </div>
  )
}
