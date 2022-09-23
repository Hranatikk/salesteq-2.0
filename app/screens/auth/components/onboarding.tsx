import React, { ReactElement, useState, useEffect, useRef } from "react"
import {
  View,
  Dimensions,
  ImageStyle,
  ImageSourcePropType,
  TextStyle,
  Animated,
  ViewStyle,
} from "react-native"

// Libs
import Carousel from "react-native-reanimated-carousel"

// Components
import { AutoImage, Button, Text } from "../../../components"

// Utils
import { translate } from "../../../i18n/"

// Styles
import { color, spacing } from "../../../theme"

const WRAPPER: ViewStyle = {
  position: "absolute",
  height: Dimensions.get("window").height,
  left: 0,
  right: 0,
  justifyContent: "center",
  alignItems: "center",
}

const OVERLAY: ViewStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: color.text,
  opacity: 0.4,
}

const INNER_WRAPPER: ViewStyle = {
  height: Dimensions.get("window").height / 1.3,
  width: Dimensions.get("window").width - 20,
  backgroundColor: color.palette.white,
  borderWidth: 0,
  borderRadius: 25,
  overflow: "hidden",
  position: "relative",
}

const ONBOARDING_ITEM_WRAPPER: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.white,
  paddingTop: spacing[4],
  paddingHorizontal: spacing[2],
}

const ONBOARDING_IMAGE: ImageStyle = {
  width: Dimensions.get("window").width - 50,
  height: (Dimensions.get("window").width - 50) / 1.58,
}

const ONBOARDING_TITLE: TextStyle = {
  textAlign: "center",
  fontWeight: "normal",
  fontSize: 28,
  marginTop: spacing[9],
}

const ONBOARDING_SUBTITLE: TextStyle = {
  textAlign: "center",
  fontWeight: "normal",
  fontSize: 16,
  marginTop: spacing[5],
}

const DOTS_WRAPPER: ViewStyle = {
  position: "absolute",
  justifyContent: "center",
  flexDirection: "row",
  bottom: spacing[9],
  height: 40,
  width: "100%",
}

const DOT: ViewStyle = {
  width: 10,
  height: 10,
  borderRadius: 30,
  backgroundColor: color.primary,
  marginRight: spacing[2],
  opacity: 0.5,
}

const ACTIVE_DOT: ViewStyle = {
  opacity: 1,
}

const BTN_RESET: ViewStyle = {
  position: "absolute",
  bottom: spacing[5],
  left: spacing[6],
  right: spacing[6],
}

const onboardingContent: IOnboardingItem[] = [
  {
    id: 0,
    title: "onboarding.analysis",
    subtitle: "onboarding.analysisDescription",
    imgSource: require("../../../../assets/images/vector/analysis.png"),
  },
  {
    id: 1,
    title: "onboarding.saveTime",
    subtitle: "onboarding.saveTimeDescription",
    imgSource: require("../../../../assets/images/vector/hourglass.png"),
  },
  {
    id: 2,
    title: "onboarding.conferencesAndPush",
    subtitle: "onboarding.conferencesAndPushDescription",
    imgSource: require("../../../../assets/images/vector/teamwork.png"),
  },
  {
    id: 3,
    title: "onboarding.constantlyImprove",
    subtitle: "onboarding.constantlyImproveDescription",
    imgSource: require("../../../../assets/images/vector/learning.png"),
  },
  {
    id: 4,
    title: "onboarding.competition",
    subtitle: "onboarding.competitionDescription",
    imgSource: require("../../../../assets/images/vector/competition.png"),
  },
]

interface IOnboardingItem {
  id: number
  title: string
  subtitle: string
  imgSource: ImageSourcePropType
}

interface IProps {
  isVisible: boolean
  onClose: () => void
}

export function Onboarding({ isVisible, onClose }: IProps): ReactElement {
  const width = Dimensions.get("window").width
  const height = Dimensions.get("window").height
  const carousel = useRef(null)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [currentOnboardingItemIndex, setCurrentOnboardingItemIndex] = useState<number>(0)

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start()
    } else if (!isVisible) {
      Animated.timing(fadeAnim, {
        toValue: -900,
        duration: 400,
        useNativeDriver: false,
      }).start()
    }
  }, [isVisible])

  const onNextButtonPress = (index: number) => {
    if (currentOnboardingItemIndex + 1 === onboardingContent.length) {
      onClose()
    } else {
      setCurrentOnboardingItemIndex(index + 1)
      carousel.current.next()
    }
  }

  return (
    <Animated.View style={[WRAPPER, { bottom: fadeAnim }]}>
      <Animated.View
        style={[
          OVERLAY,
          {
            opacity: fadeAnim.interpolate({
              inputRange: [-900, 0],
              outputRange: [0, 0.4],
            }),
          },
        ]}
      />
      <View style={INNER_WRAPPER}>
        <Carousel
          loop
          ref={carousel}
          width={width - 20}
          height={height - 200}
          autoPlay={false}
          data={onboardingContent}
          enabled={false}
          renderItem={({ item }) => (
            <View style={ONBOARDING_ITEM_WRAPPER}>
              <AutoImage source={item.imgSource} style={ONBOARDING_IMAGE} />
              <Text preset="header" style={ONBOARDING_TITLE}>
                {translate(item.title)}
              </Text>
              <Text preset="default" style={ONBOARDING_SUBTITLE}>
                {translate(item.subtitle)}
              </Text>
            </View>
          )}
        />

        <View style={DOTS_WRAPPER}>
          {[...new Array(onboardingContent.length)].map((item, index) => (
            <View
              key={`dot_${index}`}
              style={[DOT, index === currentOnboardingItemIndex && ACTIVE_DOT]}
            />
          ))}
        </View>

        <Button
          activeOpacity={0.8}
          style={BTN_RESET}
          onPress={() => onNextButtonPress(currentOnboardingItemIndex)}
          text={
            currentOnboardingItemIndex + 1 === onboardingContent.length
              ? translate("common.letsGo")
              : translate("common.nextStep")
          }
        />
      </View>
    </Animated.View>
  )
}
