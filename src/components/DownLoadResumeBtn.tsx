import React from 'react'
import HackerBtn from './animation/HackerBtn'

function DownLoadResumeBtn() {
  return (
    <div className="h-fit w-full mt-2 py-2 px-4">
      {/* 
         REMOVED the onClick from here to prevent double downloading. 
         The HackerBtn inside handles the click now.
      */}
      <div className="w-fit">
        <HackerBtn label='Download Resume' />
      </div>
    </div>
  )
}

export default DownLoadResumeBtn;
