import axiosInstance from "./axiosInstance";

export const logoutRequests = (navigate, enqueueSnackbar) => {
  return axiosInstance(enqueueSnackbar, navigate)
    .post("auth/logout", JSON.parse(localStorage.getItem("access_token")), {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token")
        )}`,
      },
    })
    .then((res) => {
      localStorage.clear();
      navigate("/logIn");
      enqueueSnackbar("Thanks", {
        variant: "success",
      });
    })
    .catch((err) => {
      localStorage.clear();
      navigate("/logIn");
      enqueueSnackbar("Thanks", {
        variant: "success",
      });
    });
};

export const loginRequests = (url, value, enqueueSnackbar) => {
  return axiosInstance(enqueueSnackbar).post(`auth/${url}`, value );
};

export const getInfoUserRequests = (token, enqueueSnackbar) => {
  return axiosInstance(enqueueSnackbar).get("auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getQuestionsRequests = (token, enqueueSnackbar) => {
  return axiosInstance(enqueueSnackbar).get("surveys/1", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      include: "questions",
    },
  });
};

export const getAnswersRequests = (token, enqueueSnackbar) => {
  return axiosInstance(enqueueSnackbar).get("surveys-passings/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      survey_id: 1,
      include: "answers",
    },
  });
};

export const verifyRequests = (token, value, enqueueSnackbar) => {
  return axiosInstance(enqueueSnackbar).post(`email/verify`, value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const answerRequest = (data) => {
  let headers = new Headers();
  headers.append(
    "Authorization",
    `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`
  );
  let formData = new FormData();
  formData.append("question_id", `${data.question_id}`);
  formData.append("feedback", `${data.feedback}`);
  formData.append("answer_data", `${JSON.stringify(data.answer_data)}`);
  let requestOptions = {
    method: "POST",
    headers,
    body: formData,
    redirect: "follow",
  };
  return fetch(
    `${process.env.REACT_APP_BASE_URL}answers/create`,
    requestOptions
  );
};
