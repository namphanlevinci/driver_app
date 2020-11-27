import { StyleSheet } from 'react-native';
/*
 * Provides universal color configs used in the app.
 * Provides universal fonts used in the app.
 */

const primaryColor = '#FFFFFF';
const secondaryColor = '#E31837';

const AppStyles = {
  colors: {
    // ===========================
    // paper default colors
    // ===========================

    primary: primaryColor, //primary color for your app, usually your brand color.
    accent: secondaryColor, // secondary color for your app which complements the primary color.
    background: '#F5F1E6', // background color for pages, such as lists.
    text: '#1B1B1B',
    disabled: '#787D84', // color for disabled elements.
    placeholder: '', // color for placeholder text, such as input placeholder.
    backdrop: '', // color for backdrops of various components such as modals.
    surface: '', // background color for elements containing content, such as cards.

    blue: '#3FB4C3',
    silver: '#9E9E9E',
    white: '#FFFFFF',
    orange: '#F0810D',
    yellow: '#FFC522',
    red: '#E31837',
    green: '#38B75A',
    redblur: '#E3183776',
  },
  fonts: {},
  styles: {
    container: { flex: 1 },

    topBar: {
      backgroundColor: secondaryColor,
    },
  },
};
export default AppStyles;
