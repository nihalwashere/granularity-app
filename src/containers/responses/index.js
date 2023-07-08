import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import { useSnackbar } from "notistack";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Spinner from "../../components/Spinner";
import { ViewFormButton } from "../../components/CustomButton";
import { getResponses } from "../../utils/api";
import { QUESTION_TYPE } from "../../enums/Questions";
import ImageAssets from "../../assets/images";
import "./styles.css";

const ResponsesContainer = (props) => {
  const { history, handleBreadcrumbs } = props;

  const formRef = window.location.pathname.split("/")[2];

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const [responses, setResponses] = useState([]);

  const [selectedResponse, setSelectedResponse] = useState({ response: [] });

  const handleResponseChange = (responseRef) => {
    const response = responses.find((elem) => elem.responseRef === responseRef);
    setSelectedResponse(response);
  };

  const renderAnswer = (response) => {
    if (response.type === QUESTION_TYPE.STATEMENT) {
      return "This is a statement, hence no response will be recorded.";
    }

    if (response.type === QUESTION_TYPE.DATE) {
      return moment(response.answer).format("LLL");
    }

    if (
      response.type === QUESTION_TYPE.MULTIPLE_CHOICE ||
      response.type === QUESTION_TYPE.DROPDOWN
    ) {
      if (!response.answer.length) {
        return "No Response";
      }

      return response.answer.toString();
    }

    if (!response.answer) {
      return "No Response";
    }

    return response.answer;
  };

  useEffect(() => {
    const getResponsesHandler = async () => {
      setIsLoading(true);

      const response = await getResponses({ formRef });

      if (response && response.success && response.data) {
        setResponses(response.data);
        setSelectedResponse(response.data[0]);
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }

      setTimeout(() => setIsLoading(false), 1000);
    };

    getResponsesHandler();

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
        title: "Responses",
        isLast: true,
      },
    ]);
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Granularity | Responses</title>
      </Helmet>

      {isLoading ? (
        <div className="spinner-container">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="responses-root-container">
          {responses.length ? (
            <div className="responses-container">
              <div className="responses-total-count-container">
                {responses.length}{" "}
                {responses.length === 1 ? "response" : "responses"} in total
                <ViewFormButton
                  endIcon={<OpenInNewIcon />}
                  href={`${process.env.REACT_APP_APP_URL}/form/${formRef}`}
                  target="_blank"
                  rel="noopener"
                >
                  View
                </ViewFormButton>
              </div>

              <div className="responses-container-top-divider">
                <Divider />
              </div>

              <div className="responses-content-container">
                <div className="responses-left-container">
                  <div className="responses-left-list-container">
                    {responses.map((response) => (
                      <div
                        key={response.responseRef}
                        className="responses-left-list-card"
                      >
                        <div className="responses-left-list-card-top-divider">
                          <Divider />
                        </div>

                        <span
                          className="responses-left-list-card-text"
                          onClick={() =>
                            handleResponseChange(response.responseRef)
                          }
                        >
                          {response.responseRef ===
                            selectedResponse.responseRef && (
                            <span style={{ marginRight: 5 }}>✅</span>
                          )}

                          {moment(response.createdAt).format("LLL")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedResponse && selectedResponse.createdAt && (
                  <Paper elevation={1} style={{ width: "60%" }}>
                    <div className="responses-right-container">
                      <div className="responses-right-list-container">
                        <div className="responses-right-list-container-header-container">
                          <div className="responses-right-list-container-header">
                            <span>
                              {moment(selectedResponse.createdAt).format("LLL")}
                            </span>

                            <Divider style={{ width: "100%", marginTop: 10 }} />
                          </div>
                        </div>
                        {selectedResponse.response.map((response) => (
                          <div
                            key={response.id}
                            className="responses-right-list-card-container"
                          >
                            <div className="responses-right-list-card">
                              <div className="responses-right-list-card-question">
                                {response.number}) {response.questionValue}
                              </div>
                              <div
                                className={
                                  response.type === QUESTION_TYPE.STATEMENT
                                    ? "responses-right-list-card-statement-no-response"
                                    : response.answer
                                    ? "responses-right-list-card-answer"
                                    : "responses-right-list-card-no-response"
                                }
                              >
                                {renderAnswer(response)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Paper>
                )}
              </div>
            </div>
          ) : (
            <div className="responses-empty-container">
              <div className="responses-empty-header-container">
                It&apos;s quiet...
              </div>
              <div className="responses-empty-description-container">
                This form has not received any responses yet.
              </div>
              <div className="responses-empty-illustration-container">
                <img
                  src={ImageAssets.Empty_Street_Illustration}
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ResponsesContainer.propTypes = {
  history: PropTypes.object.isRequired,
  handleBreadcrumbs: PropTypes.func.isRequired,
};

export default ResponsesContainer;
