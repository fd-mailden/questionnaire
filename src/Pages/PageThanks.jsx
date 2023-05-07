import React from "react";
import { Title, Button } from "../components/UI";
import logoIcon from "../assets/img/logo-Icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { logoutRequests } from "../api/authorizationRequests";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { clearStore } from "../storToolkit/questions/questionsReducers";

function PageThanks() {
  const date = useSelector((state) => state.questions.date);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  function userLogout() {
    logoutRequests(navigate, enqueueSnackbar);
    dispatch(clearStore());
  }

  return (
    <div className="questions questions--thanks">
      <div className="questions__content">
        <img src={logoIcon} alt="logoIcon" />
        <Title>Thanks</Title>
        <Title>test will closed</Title>
        <Title>{date}</Title>
      </div>
      <div className="questions__footer">
        <Button onClick={() => userLogout()}>Close</Button>
      </div>
    </div>
  );
}

export default PageThanks;
