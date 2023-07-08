import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { getAccountStats } from "../../../utils/api";
import "./styles.css";

const PricingContainer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [accountStats, setAccountStats] = useState({ forms: 0, responses: 0 });

  useEffect(() => {
    const getAccountStatsHandler = async () => {
      const response = await getAccountStats();

      if (response && response.success && response.data) {
        setAccountStats(response.data);
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }
    };

    getAccountStatsHandler();
  }, []);

  return (
    <div className="pricing-root-container">
      <div className="pricing-container">
        <div className="pricing-header">Pricing</div>

        <Paper elevation={1} style={{ width: "100%" }}>
          <div className="pricing-plan-stats-container">
            <div className="pricing-plan-stats-header">
              Granularity Free Beta
            </div>

            <div className="pricing-plan-stats-info-container">
              <div className="pricing-plan-stats-info-header">Forms</div>
              <div className="pricing-plan-stats-info">
                {accountStats.forms}
              </div>
            </div>

            <Divider />

            <div
              className="pricing-plan-stats-info-container"
              style={{ marginTop: "2%" }}
            >
              <div className="pricing-plan-stats-info-header">Responses</div>
              <div className="pricing-plan-stats-info">
                {accountStats.responses}
              </div>
            </div>
          </div>
        </Paper>

        <Paper elevation={1} style={{ width: "100%", marginTop: "10%" }}>
          <div className="pricing-plan-info-container">
            <div className="pricing-plan-info-header">
              Your Free Beta plan includes
            </div>

            <div className="pricing-plan-info">✅ Unlimited forms</div>
            <div className="pricing-plan-info">
              ✅ Unlimited questions per form
            </div>
            <div className="pricing-plan-info">✅ Unlimited responses</div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default PricingContainer;
