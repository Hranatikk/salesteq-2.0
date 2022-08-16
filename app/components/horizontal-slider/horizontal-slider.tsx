import React from "react"
import { ScrollView } from "react-native"
import { observer } from "mobx-react-lite"

export interface HorizontalSliderProps {
  children?: React.ReactNode
  innerRef: React.RefObject<ScrollView>
}

/**
 * Horizontal slider
 */
export const HorizontalSlider = observer(function HorizontalSlider(props: HorizontalSliderProps, ref) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ref={props.innerRef}
      scrollEnabled={false}
    >
      {props.children}
    </ScrollView>
  )
})
