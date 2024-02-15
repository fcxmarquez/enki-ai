const darkPallete = {
  50: "#E8E8E8",
  100: "#CFCFCF",
  200: "#A1A1A1",
  300: "#707070",
  400: "#404040",
  500: "#101010",
  600: "#0D0D0D",
  700: "#0A0A0A",
  800: "#080808",
  900: "#030303",
  950: "#030303",
};

const purplePallete = {
  50: "#EEE8FD",
  100: "#DACCFA",
  200: "#B599F5",
  300: "#8F66F0",
  400: "#6A33EA",
  500: "#4D15D1",
  600: "#3E11A7",
  700: "#2E0D7D",
  800: "#1F0853",
  900: "#0F042A",
  950: "#090217",
};

const brand = {
  default: darkPallete[950],
  secondary: purplePallete[500],
};

export const colors = {
  brand,
  text: {
    default: "#8A8A8A",
  },
  header: {
    default: brand.default,
  },
  background: {
    default: brand.default,
    sideNav: darkPallete[600],
  },
  button: {
    default: brand.secondary,
  },
};
