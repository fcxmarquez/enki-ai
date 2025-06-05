import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        smallMobile: {
          name: "Small mobile (P)",
          styles: {
            width: "275px",
            height: "568px",
          },
        },
        mobile: {
          name: "Mobile (P)",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        mobileLandscape: {
          name: "Mobile (L)",
          styles: {
            width: "667px",
            height: "375px",
          },
        },
        tablet: {
          name: "Tablet (P)",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        tabletLandscape: {
          name: "Tablet (L)",
          styles: {
            width: "1024px",
            height: "768px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1024px",
            height: "768px",
          },
        },
        largeDesktop: {
          name: "Large Desktop",
          styles: {
            width: "1440px",
            height: "900px",
          },
        },
      },
    },
  },
};

export default preview;
