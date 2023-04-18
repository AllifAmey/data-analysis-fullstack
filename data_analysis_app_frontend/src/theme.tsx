import { extendTheme } from "@chakra-ui/react";
import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const persicope = definePartsStyle({
  dialog: {
    borderRadius: "md",
    bg: `#191a1d`,
    color: "#f4f4f4",
  },
});

export const modalTheme = defineMultiStyleConfig({
  variants: { persicope },
});

// alter this to create global change to the font style
const theme = extendTheme({
  components: {
    Modal: modalTheme,
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
});

export default theme;
