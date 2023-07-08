import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export const LinearScaleButton = withStyles(() => ({
  root: {
    minWidth: 50,
    width: 30,
    height: 40,
    backgroundColor: "#66b2b2",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 18,
    "&:hover": {
      backgroundColor: "#66b2b2d1",
    },
    textTransform: "none",
  },
}))(Button);

const LinearScale = (props) => {
  const { length, handleLinearScale } = props;

  const linearScaleArray = [];

  for (let i = 0; i <= length; i += 1) {
    linearScaleArray.push(i);
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {linearScaleArray.map((elem) => (
        <LinearScaleButton
          key={elem}
          onClick={() => handleLinearScale(elem)}
          style={{ marginBottom: 10 }}
        >
          {elem}
        </LinearScaleButton>
      ))}
    </Grid>
  );
};

LinearScale.propTypes = {
  length: PropTypes.number.isRequired,
  handleLinearScale: PropTypes.func.isRequired,
};

export default LinearScale;
