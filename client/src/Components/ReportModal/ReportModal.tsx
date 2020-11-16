import React, { ReactElement, useEffect } from 'react';
import ReportCard from '../ReportCard/ReportCard';
import './styles.css';

interface Props {
  doneBy: any,
  title: string,
  handleReportModal: any
}

export default function ReportModal({doneBy, title, handleReportModal}: Props): ReactElement {

  return (
    <div className='report-modal'>
      <div className='report-modal-container'>
      <span onClick={handleReportModal} className='close-modal'>X</span>
        <span>Quiz Title: {title}</span>
        {doneBy.map((student: any) => {
          return <ReportCard student={student.studentEmail} score={student.score}/>
        })}
      </div>
    </div>
  )
}
