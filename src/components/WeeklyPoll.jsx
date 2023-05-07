import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/img/logo-Icon.svg";
import Feedback from "./Feedback";
import { Loading } from "./UI";
import { useSnackbar } from "notistack";
import { answerRequest, logoutRequests } from "../api/authorizationRequests";
import { useDispatch, useSelector } from "react-redux";
import { QuestionsHeader, Questions, QuestionFooter } from "./QuestionBody";
import mergeResponse from "../helpers/mergeResponse";
import {
  mergeDataToStoreAction,
  setDoneAction,
} from "../storToolkit/questions/questionsReducers";
import actualityPage from "../helpers/actualityPage";
import { selectMergeData } from "../storToolkit/questions/questionsSelector";
import { useMutation } from "react-query";

function WeeklyPoll({ answersStore, questionsStore }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mergeData = useSelector(selectMergeData);
  const [isFinish, setFinish] = useState(false);
  const [page, setPage] = useState(0);
  const [opacity, setOpacity] = useState(false);
  const isLastPage = page === mergeData.length;
  const [isFeedback, setFeedback] = useState(false);
  const mutation = useMutation((answer) => answerRequest(answer));
  useEffect(() => {
    dispatch(
      mergeDataToStoreAction(mergeResponse(questionsStore, answersStore))
    );
    setPage(actualityPage(mergeResponse(questionsStore, answersStore)));
  }, []);
  useEffect(() => {
    setFeedback(false);
  }, [page]);
  useEffect(() => {
    if (mutation.isError) {
      setOpacity(false);
      enqueueSnackbar("Error", {
        variant: "error",
      });
    }
    if (mutation.isSuccess) {
      successRequest();
    }
  }, [mutation.isSuccess, mutation.isError]);
  function nextPage() {
    setPage(page + 1);
  }
  function prevPage() {
    setPage(page - 1);
  }
  function successRequest() {
    setOpacity(false);
    enqueueSnackbar("Success", { variant: "Success" });
    nextPage();
    dispatch(setDoneAction({ id: page, isDone: true }));
  }

  function invalidAnswer() {
    setOpacity(false);
    enqueueSnackbar("you didn't answer the question ", {
      variant: "error",
    });
  }

  function submitAnswer() {
    if (
      Object.keys(mergeData[page].origin_answer.answer_data).length === 0 ||
      mergeData[page].origin_answer.answer_data.length == 0
    ) {
      invalidAnswer();
    } else {
      mutation.mutate(mergeData[page].origin_answer);
    }
  }

  function postAnswer() {
    setOpacity(true);
    page === mergeData.length
      ? logoutRequests(navigate, enqueueSnackbar).finally(() => {
        setOpacity(false);
        })
      : submitAnswer();
  }

  return (
    <div
      className="questions"
      style={opacity ? { pointerEvents: "none", opacity: "0.4" } : null}
    >
      <QuestionsHeader
        page={page}
        Prev={prevPage}
        Next={nextPage}
        isLastPage={isLastPage}
      />
      {mutation.isLoading ? (
        <Loading height="100" width="100" />
      ) : (
        <div className="questions__content">
          <img src={logoIcon} alt="logoIcon" />
          {isFeedback ? (
            <Feedback
              mergeData={mergeData}
              setModalActive={setFeedback}
              page={page}
              feedback={mergeData[page]?.origin_answer?.feedback}
            />
          ) : (
            <Questions
              mergeData={mergeData}
              page={page}
              setFinish={setFinish}
            />
          )}

          {!isFeedback ? (
            <button
              style={
                isLastPage ? { pointerEvents: "none", opacity: "0" } : null
              }
              onClick={() => {
                setFeedback(!isFeedback);
              }}
              className="btn-navigation"
            >
              Add feedback
            </button>
          ) : null}
        </div>
      )}
      <QuestionFooter
        mergeData={mergeData}
        page={page}
        isLastPage={isLastPage}
        postAnswer={postAnswer}
        isFinish={isFinish}
      />
    </div>
  );
}

export default WeeklyPoll;
