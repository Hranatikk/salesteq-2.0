import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { TextRow } from "./text-row"

storiesOf("TextRow", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="TextRow" usage="Text row">
        <TextRow leftText="left text" rightText="right text" isLast={false} />
      </UseCase>
    </Story>
  ))
