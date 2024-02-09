"use client";

import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "@/theme/components/button";

const theme = extendTheme({
  components: {
    Button: buttonTheme,
  },
});

export default theme;
