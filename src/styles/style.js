import React from "react";
import { Platform } from "react-native";
import { Palette } from "../colors/palette";

/**
 * Predefined styles for components
 * Could be used insteard of StyleSheet object
 * Add here some reusable styles for DRY code
 */

export const button = {
  fontSize: 15,
  fontFamily: "Helvetica",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderRadius: 10,
  borderStyle: "solid",
  borderColor: Palette.primary.button.borderColor,
  backgroundColor: Palette.primary.button.background
};

export const buttonText = {
  fontSize: 16,
  fontFamily: "Helvetica",
  color: Palette.primary.button.textColor,
};

export const toast = {
  text1Style: {
    fontFamily: "Helvetica",
    fontSize: 16,
  },
  topOffset: 50,
}