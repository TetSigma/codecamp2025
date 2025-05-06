import { fonts } from "./fonts";
import { borderRadius } from "./borderRadius";
import { breakpoints } from "./breakPoints";
import { s} from "./scale";
const coolBlack = "#1A1A1A";  // Rich, cool black for dark theme
const lightWhite = "#ffffff"; // Soft light white for light theme

export const lightTheme = {
  colors: {
    typography: "#00000", // Black text
    typographySecondary: "#ffffff",
    background: lightWhite, // Light white background
    primary: coolBlack, // Primary color (cool black for light theme)
    secondary: "#67E855", // Vibrant green for secondary color
    mutedText: "#A1A1A1", // Gray for subtitles
    border: "#28A745", // Green border instead of deep red
    gradient: ["#34C759", "#67E855"], // Green gradient for vibrant effect
    error: "#E74C3C", // Red for error text or icons
    errorBackground: "#F8D7DA", // Light red background for error messages
  },
  s,
  borderRadius,
  fonts,
} as const;

export const darkTheme = {
  colors: {
    typography: "#ffffff", // White text
    typographySecondary: "#1A1A1A",
    background: coolBlack, // Rich cool black background
    primary: lightWhite, // Light white for primary color in dark theme
    secondary: "#67E855", // Vibrant green for secondary color
    mutedText: "#A1A1A1", // Gray for subtitles
    border: "#28A745", // Green border in dark mode
    gradient: ["#34C759", "#67E855"], // Green gradient for consistency
    error: "#E74C3C", // Red for error text or icons
    errorBackground: "#F8D7DA", // Light red background for error messages
  },
  s,
  borderRadius,
  fonts,
} as const;


import { StyleSheet } from 'react-native-unistyles'

export const appThemes = {
    light: lightTheme,
    dark: darkTheme
}


type AppBreakpoints = typeof breakpoints
type AppThemes = typeof appThemes

declare module 'react-native-unistyles' {
    export interface UnistylesThemes extends AppThemes {}
    export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
    settings: {
        initialTheme: 'light',
    },
    breakpoints,
    themes: appThemes
})