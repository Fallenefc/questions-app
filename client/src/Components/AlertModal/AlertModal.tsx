import React, { ReactElement } from 'react'
import './styles.css'

interface Props {
  // should take two props: text and the function to close the modal
  text: string,
  handleAlertModal: any
}

export default function AlertModal({text, handleAlertModal}: Props): ReactElement {
  return (
    <div className='alert-modal' onClick={handleAlertModal}>
      <span>{text}</span>
      <button>Ok</button>
    </div>
  )
}
