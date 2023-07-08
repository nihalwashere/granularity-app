import ImageAssets from "../assets/images";

export const EmbedType = {
  IFRAME: "iframe",
  JAVASCRIPT: "javascript",
  REACTJS: "reactjs",
  NOTION: "notion",
};

export const EmbedUnitTypes = [
  {
    name: "%",
    value: "%",
  },
  {
    name: "px",
    value: "px",
  },
];

export const EmbedOptions = [
  {
    id: 1,
    icon: ImageAssets.Iframe_Logo,
    name: "Iframe",
    type: EmbedType.IFRAME,
  },
  {
    id: 2,
    icon: ImageAssets.JavaScript_Logo,
    name: "HTML & JS",
    type: EmbedType.JAVASCRIPT,
  },
  {
    id: 3,
    icon: ImageAssets.ReactJS_Logo,
    name: "React.js",
    type: EmbedType.REACTJS,
  },
  {
    id: 4,
    icon: ImageAssets.Notion_Logo,
    name: "Notion",
    type: EmbedType.NOTION,
  },
];

export const EmbedLayoutType = {
  STANDARD: "standard",
  POPUP: "popup",
};

export const EmbedLayoutOptions = [
  {
    name: "Standard",
    value: EmbedLayoutType.STANDARD,
  },
  {
    name: "Pop Up",
    value: EmbedLayoutType.POPUP,
  },
];
