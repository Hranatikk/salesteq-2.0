import React, { useState, useRef } from "react"
import {
  SafeAreaView,
  View,
  ViewStyle,
  TextStyle,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native"
import { Text } from "../text/text"
import { color, spacing } from "../../theme"

const CODE_LENGTH = 8

const inputContainerMargin = Dimensions.get("window").width * 0.05 // *0.15
const minContainerWidth = (Dimensions.get("window").width * 0.7) / 6 - 10

const CONTAINER: ViewStyle = {
  width: "90%",
  marginHorizontal: inputContainerMargin,
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
}

const INPUT_CONTAINER: ViewStyle = {
  width: minContainerWidth,
  borderColor: color.primary,
  justifyContent: "center",
  borderWidth: 0,
  borderBottomWidth: 2,
  paddingHorizontal: spacing[1],
  paddingBottom: spacing[1],
}

const INPUT_CONTAINER_FOCUSED: ViewStyle = {
  borderBottomWidth: 2.5,
}

const CODE_SYMBOL: TextStyle = {
  fontSize: 26,
  color: color.text,
}

const HIDDEN_INPUT: ViewStyle = {
  position: "absolute",
  height: 0,
  width: 0,
  opacity: 0,
}

interface IProps {
  value: string
  setValue: (txt: string) => void
}

export const CodeInput = ({ value, setValue }: IProps) => {
  const [containerIsFocused, setContainerIsFocused] = useState(false)

  const codeDigitsArray = Array.from({ length: CODE_LENGTH }, () => 0)

  const ref = useRef<TextInput>(null)

  const handleOnPress = () => {
    setContainerIsFocused(true)
    ref?.current?.focus()
  }

  const handleOnBlur = () => {
    setContainerIsFocused(false)
  }

  const toDigitInput = (_value: number, idx: number) => {
    const emptyInputChar = " "
    const digit = value[idx] || emptyInputChar

    const isCurrentDigit = idx === value.length
    const isLastDigit = idx === CODE_LENGTH - 1
    const isCodeFull = value.length === CODE_LENGTH

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull)

    const containerStyle =
      containerIsFocused && isFocused
        ? { ...INPUT_CONTAINER, ...INPUT_CONTAINER_FOCUSED }
        : INPUT_CONTAINER

    return (
      <View key={idx} style={containerStyle}>
        <Text style={CODE_SYMBOL}>{digit}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <TouchableOpacity activeOpacity={1} style={CONTAINER} onPress={handleOnPress}>
        {codeDigitsArray.map(toDigitInput)}
      </TouchableOpacity>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={handleOnBlur}
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
        autoCapitalize="none"
        autoCorrect={false}
        style={HIDDEN_INPUT}
      />
    </SafeAreaView>
  )
}
