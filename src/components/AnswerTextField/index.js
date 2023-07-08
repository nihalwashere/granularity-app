import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const AnswerTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline::placeholder": {
      color: "red",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#66b2b2",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#66b2b2",
    },
  },
})(TextField);

export default AnswerTextField;
