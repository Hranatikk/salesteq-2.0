import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { View } from "react-native";
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { ComponentWrapper } from "./component-wrapper"

storiesOf("ComponentWrapper", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="ComponentWrapper" usage="Component wrapper.">
        <ComponentWrapper>
          <View />
        </ComponentWrapper>
      </UseCase>
    </Story>
  ))
