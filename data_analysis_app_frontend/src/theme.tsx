import { extendTheme } from "@chakra-ui/react";

// alter this to create global change to the font style
const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
});

export default theme;
