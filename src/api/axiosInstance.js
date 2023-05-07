import axios from "axios";

export default (enqueueSnackbar, navigate = null) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
          enqueueSnackbar("Error", {
            variant: "error",
          });
        });
      }

      if (error.response.status === 422) {
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
        });
      }

      if (error.response.status === 403) {
        enqueueSnackbar(error.response.data.message, {
          variant: "error",
        });
      }
      if (error.response.status === 401) {
        axios
          .post(`${baseURL}auth/refresh`, "", {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("access_token")
              )}`,
            },
          })
          .then((res) => {
            localStorage.setItem(
              "access_token",
              JSON.stringify(res?.data.access_token)
            );
            enqueueSnackbar("Success refresh", {
              variant: "Success",
            });
            navigate("/");
          })
          .catch((err) => {
            navigate("/logIn");
            enqueueSnackbar("Try again", {
              variant: "error",
            });
          });
      }
    }
  );

  return axiosInstance;
};
