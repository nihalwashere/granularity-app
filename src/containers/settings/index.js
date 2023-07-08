import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import Image_Assets from "../../assets/images";
import { SETTINGS_SECTIONS } from "../../enums/SettingsSections";
import AccountContainer from "./account";
// import BillingContainer from "./billing";
import PricingContainer from "./pricing";
// import HelpContainer from "./help";
import "./styles.css";

const SettingsContainer = (props) => {
  const {
    selectedSettingsSection,
    handleSettingsSectionChange,
    user,
    handleBreadcrumbs,
  } = props;

  useEffect(() => {
    handleBreadcrumbs([
      { title: "Dashboard", isLast: true, navigationRoute: "/dashboard" },
    ]);
  }, []);

  return (
    <div className="settings-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Granularity | Settings</title>
      </Helmet>

      <div className="settings-section-left">
        <div
          className="settings-section-container"
          onClick={() => handleSettingsSectionChange(SETTINGS_SECTIONS.ACCOUNT)}
        >
          <div
            className={
              selectedSettingsSection === SETTINGS_SECTIONS.ACCOUNT
                ? "settings-section-tab settings-section-tab-selected"
                : "settings-section-tab"
            }
          >
            <div className="settings-section-tab-image-container">
              <img
                src={Image_Assets.Account_Icon}
                alt="Account"
                className="settings-section-tab-image"
              />
            </div>
            <div className="settings-section-tab-title-description-container">
              <div
                className={
                  selectedSettingsSection === SETTINGS_SECTIONS.ACCOUNT
                    ? "settings-section-tab-title settings-section-tab-title-selected"
                    : "settings-section-tab-title"
                }
              >
                Account
              </div>
              <div className="settings-section-tab-description">
                Your profile info
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className="settings-section-container"
          onClick={() => handleSettingsSectionChange(SETTINGS_SECTIONS.BILLING)}
        >
          <div
            className={
              selectedSettingsSection === SETTINGS_SECTIONS.BILLING
                ? "settings-section-tab settings-section-tab-selected"
                : "settings-section-tab"
            }
          >
            <div className="settings-section-tab-image-container">
              <img
                src={Image_Assets.Billing_Icon}
                alt="Billing"
                className="settings-section-tab-image"
              />
            </div>
            <div className="settings-section-tab-title-description-container">
              <div className="settings-section-tab-title">Billing</div>
              <div className="settings-section-tab-description">
                Your billing info
              </div>
            </div>
          </div>
        </div> */}

        <div
          className="settings-section-container"
          onClick={() => handleSettingsSectionChange(SETTINGS_SECTIONS.PRICING)}
        >
          <div
            className={
              selectedSettingsSection === SETTINGS_SECTIONS.PRICING
                ? "settings-section-tab settings-section-tab-selected"
                : "settings-section-tab"
            }
          >
            <div className="settings-section-tab-image-container">
              <img
                src={Image_Assets.Pricing_Icon}
                alt="Pricing"
                className="settings-section-tab-image"
              />
            </div>
            <div className="settings-section-tab-title-description-container">
              <div className="settings-section-tab-title">Pricing</div>
              <div className="settings-section-tab-description">
                Your subscription plans
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className="settings-section-container"
          onClick={() => handleSettingsSectionChange(SETTINGS_SECTIONS.HELP)}
        >
          <div
            className={
              selectedSettingsSection === SETTINGS_SECTIONS.HELP
                ? "settings-section-tab settings-section-tab-selected"
                : "settings-section-tab"
            }
          >
            <div className="settings-section-tab-image-container">
              <img
                src={Image_Assets.Help_Icon}
                alt="Pricing"
                className="settings-section-tab-image"
              />
            </div>
            <div className="settings-section-tab-title-description-container">
              <div className="settings-section-tab-title">Help Center</div>
              <div className="settings-section-tab-description">
                How to articles
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div className="settings-section-right">
        {selectedSettingsSection === SETTINGS_SECTIONS.ACCOUNT && (
          <AccountContainer user={user} />
        )}

        {/* {selectedSettingsSection === SETTINGS_SECTIONS.BILLING && (
            <BillingContainer />
          )} */}

        {selectedSettingsSection === SETTINGS_SECTIONS.PRICING && (
          <PricingContainer />
        )}

        {/* {selectedSettingsSection === SETTINGS_SECTIONS.HELP && (
            <HelpContainer />
          )} */}
      </div>
    </div>
  );
};

SettingsContainer.propTypes = {
  selectedSettingsSection: PropTypes.string.isRequired,
  handleSettingsSectionChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleBreadcrumbs: PropTypes.func.isRequired,
};

export default SettingsContainer;
