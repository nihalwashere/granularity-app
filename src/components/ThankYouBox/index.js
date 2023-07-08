import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

const ThankYouBox = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span
        style={{
          marginBottom: "5%",
          fontFamily: "Muli",
          fontSize: 22,
        }}
      >
        Your response has been recorded, thanks!
      </span>

      {/* <Button
        style={{
          background: "#66b2b2",
          color: "#ffffff",
        }}
      >
        <Link underline="none" color="inherit" href="/form">
          Start again
        </Link>
      </Button> */}

      <div style={{ marginTop: "5%" }}>
        <Button
          style={{
            background: "#66b2b2",
            color: "#ffffff",
            textTransform: "none",
            fontFamily: "Muli",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          <Link
            underline="none"
            color="inherit"
            href={process.env.REACT_APP_WEB_URL}
            target="_blank"
            rel="noopener"
          >
            Try Granularity
          </Link>
        </Button>
      </div>
    </div>
  );
};

ThankYouBox.propTypes = {};

export default ThankYouBox;
