import { defineStyleConfig, defineStyle } from "@chakra-ui/styled-system";
import { colors } from "@/constants/systemDesign";

const buttonPrimary = defineStyle({
  background: colors.button.default,
});

export const buttonTheme = defineStyleConfig({
  variants: {
    buttonPrimary,
  },
  defaultProps: { variant: "buttonPrimary" },
});
