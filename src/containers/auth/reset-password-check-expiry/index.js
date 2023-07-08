import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../../../components/Spinner";
import { checkResetPasswordLinkExpiry } from "../../../utils/api";

const ResetPasswordCheckExpiryContainer = (props) => {
  const { history } = props;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const token = window.location.pathname.split("/")[2];

    const checkResetPasswordExpiryHandler = async () => {
      const response = await checkResetPasswordLinkExpiry({ token });

      if (
        response &&
        response.success &&
        response.data &&
        response.data.email
      ) {
        history.push("/reset-password", {
          email: response.data.email,
          isLinkExpired: false,
        });
      } else {
        history.push("/reset-password", { isLinkExpired: true });
      }
    };

    checkResetPasswordExpiryHandler();

    setIsLoading(false);
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

ResetPasswordCheckExpiryContainer.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ResetPasswordCheckExpiryContainer;
