import React, {useRef} from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { HorizontalSlider } from "./horizontal-slider"

storiesOf("HorizontalSlider", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Horizontal slider" usage="Horizontal slider.">
        <HorizontalSlider innerRef={useRef(null)} />
      </UseCase>
    </Story>
  ))
