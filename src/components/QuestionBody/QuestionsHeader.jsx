import React from "react";
import arrowBack from "../../assets/img/arrow-back.svg";
import closeIcon from "../../assets/img/close-icon.svg";

function QuestionsHeader({ Prev, Next, page, isLastPage }) {
  return (
    <div className="questions__header">
      <button disabled={page === 0} onClick={Prev} className="btn-navigation">
        {page === 0 ? (
          ""
        ) : isLastPage ? (
          <img src={closeIcon} alt="closeIcon" />
        ) : (
          <img src={arrowBack} alt="arrowBack" />
        )}
      </button>
      <button disabled={isLastPage} onClick={Next} className="btn-navigation">
        Skip
      </button>
    </div>
  );
}

export default QuestionsHeader;
