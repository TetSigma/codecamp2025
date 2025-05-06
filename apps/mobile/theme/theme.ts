import { fonts } from "./fonts"
import { borderRadius } from "./borderRadius"
import { breakpoints } from "./breakPoints"


export const lightTheme = {
  colors: {
    typography: "#000000", // Black text
    background: "#ffffff", // White background
    primary: "#E50914", // Main Red
    secondary: "#FF1E56", // Electric Red
    mutedText: "#A1A1A1", // Gray for subtitles
    border: "#B20710", // Deep Red for outlines
    gradient: ["#E50914", "#FF1E56"], // Vibrant red gradient
  },
  fonts,
  borderRadius,
} as const;

export const darkTheme = {
  colors: {
    typography: "#ffffff", // White text
    background: "#000000", // Black background
    primary: "#E50914", // Main Red
    secondary: "#FF1E56", // Electric Red
    mutedText: "#A1A1A1", // Gray for subtitles
    border: "#B20710", // Deep Red for outlines
    gradient: ["#E50914", "#FF1E56"], // Vibrant red gradient
  },
  fonts,
  borderRadius,
} as const;

import { StyleSheet } from 'react-native-unistyles'

export const appThemes = {
    light: darkTheme,
    dark: lightTheme
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