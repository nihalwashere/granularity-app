import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const PrimaryButton = withStyles(() => ({
  root: {
    color: "#ffffff",
    fontFamily: "Muli",
    backgroundColor: "#ff8c00",
    "&:hover": {
      backgroundColor: "#ff8c00c2",
    },
  },
}))(Button);

export const SecondaryButton = withStyles(() => ({
  root: {
    color: "#ffffff",
    fontFamily: "Muli",
    backgroundColor: "#6A5ACD",
    "&:hover": {
      backgroundColor: "#6a5acdd4",
    },
  },
}))(Button);

export const DangerButton = withStyles(() => ({
  root: {
    color: "#ffffff",
    fontFamily: "Muli",
    backgroundColor: "#EE3B3B",
    "&:hover": {
      backgroundColor: "#ee3b3bcc",
    },
  },
}))(Button);

export const OKButton = withStyles(() => ({
  root: {
    width: 80,
    backgroundColor: "#66b2b2",
    color: "#ffffff",
    fontFamily: "Muli",
    fontWeight: "bold",
    fontSize: 20,
    "&:hover": {
      backgroundColor: "#66b2b2d1",
    },
    textTransform: "none",
  },
}))(Button);

export const InsightsButton = withStyles(() => ({
  root: {
    width: 110,
    backgroundColor: "#262627",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#262627ad",
    },
    textTransform: "none",
  },
}))(Button);

export const ResponsesButton = withStyles(() => ({
  root: {
    width: 110,
    backgroundColor: "#3f51b5",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#3f51b587",
    },
    textTransform: "none",
  },
}))(Button);

export const ConnectButton = withStyles(() => ({
  root: {
    width: 110,
    backgroundColor: "#f1522e",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#f1522ea8",
    },
    textTransform: "none",
  },
}))(Button);

export const ShareButton = withStyles(() => ({
  root: {
    width: 110,
    backgroundColor: "#f50057",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#f5005796",
    },
    textTransform: "none",
  },
}))(Button);

export const ViewFormButton = withStyles(() => ({
  root: {
    width: 100,
    backgroundColor: "#262627",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#262627ad",
    },
    textTransform: "none",
  },
}))(Button);

export const SubmitButton = withStyles(() => ({
  root: {
    width: 120,
    backgroundColor: "#66b2b2",
    color: "#ffffff",
    fontFamily: "Muli",
    fontWeight: "bold",
    fontSize: 20,
    "&:hover": {
      backgroundColor: "#66b2b2d1",
    },
    textTransform: "none",
  },
}))(Button);

export const CopyButton = withStyles(() => ({
  root: {
    width: 70,
    backgroundColor: "#66b2b2",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 16,
    "&:hover": {
      backgroundColor: "#66b2b2d1",
    },
    textTransform: "none",
  },
}))(Button);

export const SaveButton = withStyles(() => ({
  root: {
    width: 70,
    height: 40,
    backgroundColor: "#66b2b2",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 16,
    "&:hover": {
      backgroundColor: "#66b2b2d1",
    },
    textTransform: "none",
  },
}))(Button);

export const DeleteButton = withStyles(() => ({
  root: {
    width: 70,
    backgroundColor: "#af0404",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 16,
    "&:hover": {
      backgroundColor: "#af0404a1",
    },
    textTransform: "none",
  },
}))(Button);

export const OkayButton = withStyles(() => ({
  root: {
    width: 70,
    backgroundColor: "#66b2b2",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 16,
    "&:hover": {
      backgroundColor: "#66b2b2d1",
    },
    textTransform: "none",
  },
}))(Button);
