import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles(() => ({
  root: {
    color: "#66b2b2",
    "&.MuiRating-sizeLarge": {
      fontSize: "3rem",
    },
  },
}));

const RatingScale = (props) => {
  const { length, rating, handleRatingScale, readOnly } = props;

  const classes = useStyles();

  return (
    <Rating
      name="rating-scale"
      value={rating}
      max={length}
      onChange={(event, newRating) => handleRatingScale(newRating)}
      size="large"
      readOnly={readOnly}
      className={classes.root}
    />
  );
};

RatingScale.propTypes = {
  length: PropTypes.number.isRequired,
  rating: PropTypes.any,
  handleRatingScale: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
};

export default RatingScale;
