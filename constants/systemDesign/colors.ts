const darkPallete = {
  50: "#F7F7F7",
  100: "#EDEDED",
  200: "#DFDFDF",
  300: "#CCCCCC",
  400: "#B3B3B3",
  500: "#999999",
  600: "#808080",
  700: "#666666",
  800: "#333333",
  900: "#1A1A1A",
  950: "#0D0D0D",
};

const purplePallete = {
  50: "#F3E8FF",
  100: "#E4CCFF",
  200: "#C899FF",
  300: "#AC66FF",
  400: "#9033FF",
  500: "#7415FF",
  600: "#5D11CC",
  700: "#460D99",
  800: "#2F0866",
  900: "#180433",
  950: "#0C021A",
};

const brand = {
  default: darkPallete[950],
  secondary: purplePallete[500],
};

export const colors = {
  brand,
  text: {
    default: darkPallete[100],
    paragraph: darkPallete[300],
    inverted: darkPallete[900],
  },
  header: {
    default: brand.default,
  },
  background: {
    default: darkPallete[950],
    sideNav: darkPallete[900],
    conversation: {
      light: darkPallete[50],
      dark: darkPallete[900],
    },
    input: {
      light: darkPallete[100],
      dark: darkPallete[800],
    },
    modal: darkPallete[900],
  },
  button: {
    default: purplePallete[500],
    hover: purplePallete[600],
  },
  chat: {
    user: {
      background: purplePallete[500],
      text: darkPallete[50],
    },
    assistant: {
      background: {
        light: darkPallete[50],
        dark: darkPallete[900],
      },
      text: {
        light: darkPallete[900],
        dark: darkPallete[50],
      },
    },
  },
};
