import React from "react";
import { View } from "react-native";
import 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';

// Add global CSS for Material Icons
const style = document.createElement('style');
style.innerHTML = `
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
  }

  .material-icons, .MaterialIcons {
    font-family: 'Material Icons' !important;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

  /* Fix for react-native-vector-icons in web */
  [class*="material-icons"] {
    font-family: 'Material Icons' !important;
  }
`;
document.head.appendChild(style);

/** @type{import("@storybook/react").Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    (Story, { parameters }) => (
      <View
        style={{
          flex: 1,
          backgroundColor:
            parameters.noBackground === true ? undefined : "#26c6da",
          padding: 8,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default preview;
