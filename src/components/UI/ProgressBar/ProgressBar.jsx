import React from "react";
import './ProgressBar.module.scss'
function ProgressBar({maxProgress, isLastPage, page}) {
  return (
    <div className="progress-container">
      <div className="progress" style={{ width: `${isLastPage ? 100 : (100 / maxProgress)* page }%` }}></div>
    </div>
  );
}

export default ProgressBar;
