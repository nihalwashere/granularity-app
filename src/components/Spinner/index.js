import React from "react";
import PropTypes from "prop-types";
import BeatLoader from "react-spinners/BeatLoader";

const Spinner = ({ loading }) => (
  <BeatLoader color="#66b2b2" loading={loading} />
);

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Spinner;
