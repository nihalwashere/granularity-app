import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Avatar from "../Avatar";
import ImageAssets from "../../assets/images";
import { ProfileSideBarNavigationTabs } from "../../enums/ProfileSideBarNavigationTabs";
import "./styles.css";

const useStyles = makeStyles(() => ({
  root: {
    width: 350,
    height: "100%",
  },
}));

const ProfileSideBar = (props) => {
  const {
    name,
    handleClose,
    avatar,
    handleSettingsSectionChange,
    handleLogout,
  } = props;

  const classes = useStyles();

  const history = useHistory();

  const handleNavigation = (navigationItem) => {
    handleClose();

    const { route, section } = navigationItem;

    if (route && section) {
      handleSettingsSectionChange(section);
      history.push(route);
    } else {
      handleLogout();
    }
  };

  return (
    <Paper className={classes.root}>
      <div className="profile-side-bar-top-container">
        <div className="profile-side-bar-avatar-container">
          <Avatar emailMd5={avatar} name={name} />
        </div>
        <div className="profile-side-bar-name-text">{name}</div>
      </div>

      <div>
        {ProfileSideBarNavigationTabs.map((navigationItem) => (
          <div key={navigationItem.id}>
            <div
              className="profile-side-bar-navigation-list-item"
              onClick={() => handleNavigation(navigationItem)}
            >
              <div className="profile-side-bar-navigation-list-item-img-text-container">
                <img
                  src={navigationItem.icon}
                  alt="icon"
                  className="profile-side-bar-navigation-list-item-img"
                />

                <span className="profile-side-bar-navigation-list-item-text">
                  {navigationItem.text}
                </span>
              </div>

              {navigationItem.shouldRenderRightArrowIcon && (
                <div className="profile-side-bar-navigation-list-right-arrow-img">
                  <img src={ImageAssets.Right_Arrow_Icon} alt="more" />
                </div>
              )}
            </div>

            <Divider />
          </div>
        ))}
      </div>
    </Paper>
  );
};

ProfileSideBar.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleSettingsSectionChange: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default ProfileSideBar;
