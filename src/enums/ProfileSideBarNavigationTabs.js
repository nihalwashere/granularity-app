import ImageAssets from "../assets/images";
import { SETTINGS_SECTIONS } from "./SettingsSections";
import { NAVIGATION_ROUTES } from "./NavigationRoutes";

export const ProfileSideBarNavigationTabs = [
  {
    id: 1,
    icon: ImageAssets.Account_Icon,
    text: "Account",
    route: NAVIGATION_ROUTES.SETTINGS,
    section: SETTINGS_SECTIONS.ACCOUNT,
    shouldRenderRightArrowIcon: true,
  },
  // {
  //   id: 2,
  //   icon: ImageAssets.Billing_Icon,
  //   text: "Billing",
  //   route: NAVIGATION_ROUTES.SETTINGS,
  //   section: SETTINGS_SECTIONS.BILLING,
  //   shouldRenderRightArrowIcon: true,
  // },
  {
    id: 3,
    icon: ImageAssets.Pricing_Icon,
    text: "Pricing",
    route: NAVIGATION_ROUTES.SETTINGS,
    section: SETTINGS_SECTIONS.PRICING,
    shouldRenderRightArrowIcon: true,
  },
  // {
  //   id: 4,
  //   icon: ImageAssets.Help_Icon,
  //   text: "Help",
  //   route: NAVIGATION_ROUTES.SETTINGS,
  //   section: SETTINGS_SECTIONS.HELP,
  //   shouldRenderRightArrowIcon: true,
  // },
  {
    id: 5,
    icon: ImageAssets.Logout_Icon,
    text: "Logout",
    route: null, // handle logout
    section: null,
    shouldRenderRightArrowIcon: false,
  },
];
