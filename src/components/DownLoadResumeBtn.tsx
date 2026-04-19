import React from 'react'
import HackerBtn from './animation/HackerBtn'
import { downloadATSResume } from "@/lib/generateResume";

function DownLoadResumeBtn() {
  return (
    <div className="h-fit w-full mt-2 py-2 px-4">
      {/* Passing the event 'e' to the function */}
      <div 
        onClick={(e) => downloadATSResume(e)} 
        className="cursor-pointer w-fit"
      >
        <HackerBtn label='Download Resume' />
      </div>
    </div>
  )
}

export default DownLoadResumeBtn;
