import React, { useEffect} from "react";
import WeeklyPoll from "../components/WeeklyPoll";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loading, Title } from "../components/UI";
import { useSnackbar } from "notistack";
import { selectIsAuth } from "../storToolkit/auth/authSelector";
import { getQuestionsAction } from "../storToolkit/questions/questionActions";
import {
  selectQuestions,
  selectAnswers,
  selectIsQuestionsError,
  selectIsQuestionsLoading,
} from "../storToolkit/questions/questionsSelector";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isAuth = useSelector(selectIsAuth);
  const answers = useSelector(selectAnswers);
  const questions = useSelector(selectQuestions);
  const isError = useSelector(selectIsQuestionsError);
  const isDataLoading = useSelector(selectIsQuestionsLoading);

  let isVerify = JSON.parse(localStorage.getItem("user_info"));
  useEffect(() => {
    if (isAuth) {
      let access_token = JSON.parse(localStorage.getItem("access_token"));
      const token = { token: access_token, enqueueSnackbar: enqueueSnackbar };
      dispatch(getQuestionsAction(token));
    }
  }, []);
  return (
    <main>
      {!isDataLoading ? (
        isError ? (
          <Title>Server Error Try again !!!!</Title>
        ) : isAuth ? (
          answers.length === questions.questions.length ? (
            navigate("/close")
          ) : (
            <WeeklyPoll
              pageNumber={false}
              answersStore={answers}
              questionsStore={questions.questions}
            />
          )
        ) : (
          navigate("/success")
        )
      ) : (
        <Loading height="100" width="100" />
      )}
    </main>
  );
}

export default Main;
