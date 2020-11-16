import React, { ReactElement } from 'react'
import './styles.css'

interface Props {
  // should take two props: text and the function to close the modal
  text: string,
  handleAlertModal: any,
  handleModalClick?: any
}

export default function AlertModal({text, handleAlertModal, handleModalClick}: Props): ReactElement {
  return (
    <div className='alert-modal' onClick={handleAlertModal}>
      <span>{text}</span>
      <button onClick={handleModalClick}>Ok</button>
    </div>
  )
}
