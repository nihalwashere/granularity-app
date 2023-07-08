import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ImageAssets from "../../assets/images";
import { GRANULARITY_WEB_URL } from "../../utils/config";
import "./styles.css";

const CannotAccessForm = () => {
  return (
    <div className="cannot-access-form-container">
      <div className="cannot-access-form-text">
        Oops, you cannot access this form at the moment!
      </div>
      <div className="cannot-access-form-illustration-container">
        <img
          src={ImageAssets.Cannot_Access_Illustration}
          alt=""
          width="100%"
          height="100%"
        />
      </div>
      <div>
        <Button
          variant="contained"
          style={{
            width: 220,
            backgroundColor: "#66b2b2",
            color: "#ffffff",
            fontFamily: "Muli",
            fontSize: 14,
            "&:hover": {
              backgroundColor: "#66b2b2d1",
            },
            textTransform: "none",
          }}
        >
          <Link
            underline="none"
            color="inherit"
            href={GRANULARITY_WEB_URL}
            rel="noopener"
          >
            Continue to <span style={{ fontWeight: "bold" }}>Granularity</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CannotAccessForm;
