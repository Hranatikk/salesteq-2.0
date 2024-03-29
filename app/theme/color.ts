import { palette } from "./palette"

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The screen background.
   */
  background: palette.offWhite,
  /**
   * The main tinting color.
   */
  primary: palette.purple,
  /**
   * A color used and lines and dividers.
   */
  line: palette.paleGrey,
  /**
   * The default color of text in many components.
   */
  text: palette.black,
  /**
   * Secondary information, tips, icons
   */
  dim: palette.grey,
  /**
   * Color of text inside placeholder
   */
  placeholderText: palette.lightGrey,
  /**
   * Error messages and icons.
   */
  error: palette.red,
  /**
   * Danger action buttons and statuses
   */
  dangerous: palette.lightRed,
  /**
   * Success text messages and actions
   */
  success: palette.green,
  /**
   * Color for pending statuses and neutral messages
   */
  pending: palette.blue,
}
