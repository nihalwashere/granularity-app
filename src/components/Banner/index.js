import React from "react";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { BannerType } from "../../enums/Banner";
// import { GRANULARITY_WEB_URL } from "../../utils/config";
import "./styles.css";

const Banner = (props) => {
  const { type, onClose, handleEmailVerificationTrigger } = props;

  return (
    <div className="banner-root-container">
      <div className="banner-container">
        {/* {type === BannerType.PLAN_UPGRADE && (
          <div className="banner-content">
            ⚠️ Create 3 forms total and get 100 responses per form this month
            for free.{" "}
            <Link href={GRANULARITY_WEB_URL} style={{ marginLeft: 3 }}>
              <span style={{ fontWeight: "bold" }}>
                Upgrade for unlimited forms, more responses, and better
                features!
              </span>
            </Link>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        )} */}

        {type === BannerType.VERIFY_EMAIL && (
          <div className="banner-content">
            ⚠️ Please verify your email in order to enable receiving email
            notifications for responses.
            {/* eslint-disable-next-line */}
            <Link
              onClick={handleEmailVerificationTrigger}
              style={{ cursor: "pointer", marginLeft: 3 }}
            >
              <span style={{ fontWeight: "bold" }}> Click here to verify!</span>
            </Link>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

Banner.propTypes = {
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  handleEmailVerificationTrigger: PropTypes.func.isRequired,
};

export default Banner;
