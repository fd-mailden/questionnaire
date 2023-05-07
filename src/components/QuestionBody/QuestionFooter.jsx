import React from "react";
import { ProgressBar, Button } from "../UI";

function QuestionFooter({ ...props }) {
  const { mergeData, page, isLastPage, postAnswer, isFinish } = props;
  return (
    <div className="questions__footer">
      <ProgressBar
        maxProgress={mergeData.length}
        page={page + 1}
        isLastPage={isLastPage}
      />
      {isLastPage ? (
        <Button onClick={() => postAnswer()}>Close</Button>
      ) : (
        <Button disabled={mergeData[page]?.isDone} onClick={() => postAnswer()}>
          {!isFinish
            ? "Continue"
            : page === mergeData.length
            ? "Close"
            : "Finish"}
        </Button>
      )}
    </div>
  );
}

export default QuestionFooter;
