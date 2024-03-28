import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";
import { colors } from "@/constants/systemDesign";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  parts.keys
);

const baseStyle = definePartsStyle({
  dialog: {
    bg: colors.background.modal,
  },
  dialogContainer: {
    px: 10,
  },
  body: {
    pb: 4,
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
