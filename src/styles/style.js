import { Palette } from "../colors/palette";

/**
 * Predefined styles for components
 * Could be used insteard of StyleSheet object
 * Add here some reusable styles for DRY code
 */

export const button = {
  fontSize: 15,
  fontFamily: "helvetica-regular",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderRadius: 10,
  borderStyle: "solid",
  borderColor: Palette.primary.button.borderColor,
  backgroundColor: Palette.primary.button.background
};

export const buttonText = {
  fontSize: 17,
  fontFamily: "helvetica-regular",
  color: Palette.primary.button.textColor,
};