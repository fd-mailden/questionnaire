import { Button, Loading, Title } from "../components/UI";
import React, { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { verifyAction } from "../storToolkit/auth/authActions";
import { selectIsLoading } from "../storToolkit/auth/authSelector";
function Verify() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  let [searchParams, setSearchParams] = useSearchParams();
  let { id, hash } = useParams();
  let expires = searchParams.get("expires");
  let signature = searchParams.get("signature");
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("access_token"));
    const urlData = {
      id: id,
      hash: hash,
      expires: expires,
      signature: signature,
    };

    dispatch(
      verifyAction({
        token: token,
        urlData: urlData,
        enqueueSnackbar: enqueueSnackbar,
        navigate: navigate,
      })
    );
  }, []);

  return (
    <div className="verify">
      {!isLoading ? (
        <div className="">
          <Title> Account verified </Title>
          <Button onClick={() => navigate("/")}> Questions </Button>
        </div>
      ) : (
        <Loading width="50" height="50" />
      )}
    </div>
  );
}

export default Verify;
