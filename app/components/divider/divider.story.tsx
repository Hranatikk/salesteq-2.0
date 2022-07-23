import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { Divider } from "./divider"

storiesOf("Divider", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Divider" usage="Divider component.">
        <Divider horizontal={0} bottom={0} />
      </UseCase>
    </Story>
  ))
