"use client";

import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "@/theme/components/button";
import { modalTheme } from "@/theme/components/modal";

const theme = extendTheme({
  components: {
    Button: buttonTheme,
    Modal: modalTheme,
  },
});

export default theme;
