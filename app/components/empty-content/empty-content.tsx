import * as React from "react"
import { TextStyle, View, ViewStyle, Dimensions, ImageStyle, ImageURISource } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing } from "../../theme"
import { Text } from "../text/text"
import { AutoImage } from "../auto-image/auto-image"
import { Button } from "../button/button"

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const IMAGE: ImageStyle = {
  height: Dimensions.get("window").height / 4,
  width: (Dimensions.get("window").height / 4) * 1.5,
}

const TITLE: TextStyle = {
  textAlign: "center",
  marginTop: spacing[7],
  marginHorizontal: spacing[4]
}

const SUBTITLE: TextStyle = {
  textAlign: "center",
  marginTop: spacing[4],
  marginHorizontal: spacing[4]
}

const PRIMARY_BUTTON: ViewStyle = {
  marginTop: spacing[6],
  width: Dimensions.get("window").width / 1.3,
}

export interface EmptyContentProps {
  title: string
  subtitle?: string
  imageURI?: ImageURISource
  primaryButtonText?: string
  onPrimaryButtonClick?: () => void
}

/**
 * Empty content with image
 */
export const EmptyContent = observer(function EmptyContent(props: EmptyContentProps) {
  const { imageURI, title, subtitle, primaryButtonText, onPrimaryButtonClick } = props

  return (
    <View style={CONTAINER}>
      {imageURI
        ? <AutoImage source={imageURI} style={IMAGE} />
        : null
      }


      <Text preset="title" style={TITLE}>{title}</Text>
      {subtitle ? <Text preset="description" style={SUBTITLE}>{subtitle}</Text> : null}

      {primaryButtonText
        ? (
          <Button
            text={primaryButtonText}
            preset="primary"
            style={PRIMARY_BUTTON}
            activeOpacity={0.8}
            onPress={() => onPrimaryButtonClick()}
          />
        )
        : null
      }
    </View>
  )
})
