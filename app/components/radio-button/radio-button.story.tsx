import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { RadioButton } from "./radio-button"

storiesOf("RadioButton", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Radio" usage="Radio button.">
        <RadioButton title="string" subtitle="string" isActive={false} />
      </UseCase>
    </Story>
  ))
