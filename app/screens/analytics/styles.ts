import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from "../../theme"

export const FULL: ViewStyle = {
  flex: 1,
}

export const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}

export const HEADER_TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "center",
}

export const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}