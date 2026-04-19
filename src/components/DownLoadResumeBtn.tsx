import React from 'react'
import HackerBtn from './animation/HackerBtn'
import { downloadATSResume } from "@/lib/generateResume"; // Logic from Step 2

function DownLoadResumeBtn() {
  return (
    <div className="h-fit w-full mt-2 py-2 px-4">
      {/* 
         We wrap the HackerBtn in a div with onClick. 
         This keeps the exact animation and look of the HackerBtn 
         but triggers the download when clicked.
      */}
      <div onClick={downloadATSResume} className="cursor-pointer w-fit">
        <HackerBtn label='Download Resume' />
      </div>
    </div>
  )
}

export default DownLoadResumeBtn;
