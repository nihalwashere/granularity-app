import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import Spinner from "../../components/Spinner";
import { verifyEmail } from "../../utils/api";

const VerifyEmailContainer = (props) => {
  const { history, getUserInfo } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const emailToken = window.location.pathname.split("/")[2];

    const verifyEmailHandler = async () => {
      const response = await verifyEmail({ emailToken });

      if (response && response.success) {
        enqueueSnackbar(response.message, { variant: "success" });
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }
    };

    verifyEmailHandler();

    setTimeout(() => {
      getUserInfo();

      setIsLoading(false);

      history.push("/dashboard");
    }, 1000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner loading={isLoading} />
        </div>
      ) : null}
    </div>
  );
};

VerifyEmailContainer.propTypes = {
  history: PropTypes.object.isRequired,
  getUserInfo: PropTypes.func.isRequired,
};

export default VerifyEmailContainer;
