import { TextStyle } from "react-native"
import { color, typography } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  fontSize: 15,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontWeight: "bold" } as TextStyle,

  /**
   * Large headers.
   */
  header: { ...BASE, fontSize: 24, fontWeight: "bold" } as TextStyle,

  /**
   * Description for inputs, fields, rows
   */
  title: { ...BASE, fontSize: 18 } as TextStyle,

  /**
   * Description for inputs, fields, rows
   */
  boldTitle: { ...BASE, fontSize: 16, fontWeight: "bold" } as TextStyle,

  /**
   * Description for inputs, fields, rows
   */
  description: { ...BASE, fontSize: 16, color: color.dim } as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: { ...BASE, fontSize: 15, color: color.dim } as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  error: { ...BASE, fontSize: 15, color: color.error } as TextStyle,

  /**
   * A smaller piece of secondary information.
   */
  secondary: { ...BASE, fontSize: 9, color: color.dim } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
