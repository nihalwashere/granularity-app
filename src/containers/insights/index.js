import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Spinner from "../../components/Spinner";
import { ViewFormButton } from "../../components/CustomButton";
import { getInsights } from "../../utils/api";
import { QUESTION_TYPES_OPTIONS } from "../../enums/Questions";
import { GRANULARITY_APP_URL } from "../../utils/config";
import "./styles.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#66b2b2",
    color: theme.palette.common.white,
    fontFamily: "Muli",
  },
  body: {
    fontSize: 14,
    fontFamily: "Muli",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const getQuestionTypeName = (type) =>
  QUESTION_TYPES_OPTIONS.find((elem) => elem.type === type).name;

const InsightsContainer = (props) => {
  const classes = useStyles();

  const { history, handleBreadcrumbs } = props;

  const { enqueueSnackbar } = useSnackbar();

  const formRef = window.location.pathname.split("/")[2];

  const [isLoading, setIsLoading] = useState(false);

  const [insights, setInsights] = useState({
    opens: 0,
    starts: 0,
    completions: 0,
    completionRate: 0,
    questions: [],
  });

  useEffect(() => {
    const getInsightsHandler = async () => {
      setIsLoading(true);

      const response = await getInsights({ formRef });

      if (response && response.success && response.data) {
        setInsights(response.data);
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }

      setTimeout(() => setIsLoading(false), 1000);
    };

    getInsightsHandler();

    handleBreadcrumbs([
      { title: "Dashboard", navigationRoute: "/dashboard" },
      {
        title:
          history.location &&
          history.location.state &&
          history.location.state.title
            ? history.location.state.title
            : "Form",
        navigationRoute: `/form-builder/${formRef}`,
      },
      {
        title: "Insights",
        isLast: true,
      },
    ]);
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Granularity | Insights</title>
      </Helmet>

      {isLoading ? (
        <div className="spinner-container">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="insights-root-container">
          <div className="insights-container">
            <div className="insights-overview-container">
              <div className="insights-overview-header">
                Overview
                <ViewFormButton
                  endIcon={<OpenInNewIcon />}
                  href={`${GRANULARITY_APP_URL}/form/${formRef}`}
                  target="_blank"
                  rel="noopener"
                >
                  View
                </ViewFormButton>
              </div>
              <div className="insights-overview-stats-container">
                <div className="insights-overview-stat">
                  <span className="insights-overview-stat-header">Opens</span>
                  <span className="insights-overview-stat-value">
                    {insights.opens}
                  </span>
                </div>

                <div className="insights-overview-stat">
                  <span className="insights-overview-stat-header">Starts</span>
                  <span className="insights-overview-stat-value">
                    {insights.starts}
                  </span>
                </div>

                <div className="insights-overview-stat">
                  <span className="insights-overview-stat-header">
                    Completions
                  </span>
                  <span className="insights-overview-stat-value">
                    {insights.completions}
                  </span>
                </div>

                <div className="insights-overview-stat">
                  <span className="insights-overview-stat-header">
                    Completion Rate
                  </span>
                  <span className="insights-overview-stat-value">
                    {insights.completionRate}%
                  </span>
                </div>
              </div>
            </div>

            <div className="insights-question-container">
              <div className="insights-question-header">
                Insights per question
              </div>
              <div className="insights-question-table-container">
                <TableContainer component={Paper}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Question</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                        <StyledTableCell align="right">Views</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {insights.questions.map((question) => (
                        <StyledTableRow key={question.id}>
                          <StyledTableCell component="th" scope="row">
                            {question.questionValue || "..."}
                          </StyledTableCell>
                          <StyledTableCell>
                            {getQuestionTypeName(question.type)}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {question.views}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

InsightsContainer.propTypes = {
  history: PropTypes.object.isRequired,
  handleBreadcrumbs: PropTypes.func.isRequired,
};

export default InsightsContainer;
