import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { FORM_PUBLISH_STATUS } from "../../enums/FormPublishStatus";

export const Publish = withStyles(() => ({
  root: {
    width: 125,
    backgroundColor: "#66b2b2",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#66b2b2d1",
    },
    textTransform: "none",
  },
}))(Button);

export const Published = withStyles(() => ({
  root: {
    width: 125,
    backgroundColor: "#e3e3e3",
    color: "#bbbbbb",
    fontFamily: "Muli",
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#e3e3e3",
    },
    textTransform: "none",
  },
}))(Button);

const PublishButton = (props) => {
  const { status, onClick } = props;

  return (
    <div>
      {status === FORM_PUBLISH_STATUS.PUBLISH ? (
        <Publish onClick={onClick}>{status}</Publish>
      ) : (
        <Published disabled>{status}</Published>
      )}
    </div>
  );
};

PublishButton.propTypes = {
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PublishButton;
