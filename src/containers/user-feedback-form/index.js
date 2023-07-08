import React, { useEffect } from "react";
import {
  GRANULARITY_EMBED_SCRIPT_URL,
  GRANULARITY_USER_FEEDBACK_FORM_REF,
} from "../../utils/config";

const UserFeedbackForm = () => {
  useEffect(() => {
    const loadGranularity = () =>
      new Promise((resolve) => {
        const existingScript = document.getElementById("granularity-embed-lib");

        if (!existingScript) {
          const script = document.createElement("script");

          script.src = GRANULARITY_EMBED_SCRIPT_URL;
          script.id = "granularity-embed-lib";

          document.body.appendChild(script);

          script.onload = () => {
            resolve();
          };
        }

        if (existingScript) resolve();
      });

    loadGranularity().then(() => {
      // eslint-disable-next-line
      Granularity.Container({
        containerId: "user-feedback-form-container",
        formId: GRANULARITY_USER_FEEDBACK_FORM_REF,
      });
    });
  }, []);

  return (
    <div
      id="user-feedback-form-container"
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default UserFeedbackForm;
