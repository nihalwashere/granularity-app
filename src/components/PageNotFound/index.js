import React from "react";
import { GRANULARITY_SUPPORT_EMAIL } from "../../utils/constants";
import ImageAssets from "../../assets/images";
import "./styles.css";

const PageNotFound = () => {
  return (
    <div className="page-not-found-container">
      <div className="page-not-found-text">Page Not Found</div>
      <div className="page-not-found-description-text">
        Something has gone awry, please contact {GRANULARITY_SUPPORT_EMAIL}
      </div>
      <div className="page-not-found-illustration-container">
        <img
          src={ImageAssets.Page_Not_Found_Illustration}
          alt=""
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
