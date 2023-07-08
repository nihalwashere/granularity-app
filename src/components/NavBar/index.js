import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";
import ViewListIcon from "@material-ui/icons/ViewList";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Muli",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const NavBar = (props) => {
  const { name, breadcrumbs, handleBreadcrumbs, handleProfileSidebarOpen } =
    props;

  const classes = useStyles();

  const history = useHistory();

  const handleNavigation = (route) => {
    if (route === "/dashboard") {
      handleBreadcrumbs([{ title: "Dashboard", isLast: true }]);
    }

    history.push(route);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo-text">granularity</div>

      <div className="nav-actions-container">
        <div className="navbar-left-section">
          <Breadcrumbs>
            {breadcrumbs.map((breadcrumb) => {
              if (breadcrumb.isLast && !breadcrumb.navigationRoute) {
                return (
                  <Typography
                    key={breadcrumb.title}
                    color="textPrimary"
                    className={classes.link}
                  >
                    {breadcrumb.title}
                  </Typography>
                );
              }

              return (
                //  eslint-disable-next-line
                <Link
                  key={breadcrumb.title}
                  underline="none"
                  color="inherit"
                  component="button"
                  className={classes.link}
                  onClick={() => handleNavigation(breadcrumb.navigationRoute)}
                >
                  {breadcrumb.title}
                </Link>
              );
            })}
          </Breadcrumbs>
        </div>

        <div className="navbar-right-section">
          <div className="navbar-user-name">Hi, {name}</div>

          <div className="nav-action-toggle-button-container">
            <ToggleButtonGroup
              orientation="vertical"
              value="list"
              exclusive
              onChange={handleProfileSidebarOpen}
            >
              <ToggleButton value="list" aria-label="list">
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  name: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.array.isRequired,
  handleBreadcrumbs: PropTypes.func.isRequired,
  handleProfileSidebarOpen: PropTypes.func.isRequired,
};

export default NavBar;
