export const getColorAndBackground = (md5) => {
  let matches = md5.match(/.{2}/g);

  if (!matches) {
    matches = [];
  }

  const [red, green, blue] = matches.map((hex) => parseInt(hex, 16));

  // Formula from https://www.w3.org/TR/AERT/#color-contrast
  const luminance = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;

  const color = luminance > 0.6 ? "#222" : "#fff";

  return {
    background: `rgb(${[red, green, blue]})`,
    color,
  };
};

export const getInitials = (name, maxLength = 3) => {
  const chars = [...name.trim()];

  if (name.length <= maxLength) return name;

  const initials = [];

  // eslint-disable-next-line
  for (const [idx, char] of chars.entries()) {
    if (
      char.toLowerCase() !== char ||
      !chars[idx - 1] ||
      /\s/.test(chars[idx - 1])
    ) {
      initials.push(char);

      if (initials.length === maxLength) break;
    }
  }

  return initials.join("");
};
