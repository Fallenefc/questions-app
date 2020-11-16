import React, { ReactElement, useEffect } from "react";

interface Props {
  student: string,
  score: number,
}

export default function ReportCard({ student, score }: Props): ReactElement {
  useEffect(() => {
    console.log(student, score);
  });

  return (
    <>
      <div>Student: {student}</div>  
      <div>Score: {score}</div>
    </>
  );
}
