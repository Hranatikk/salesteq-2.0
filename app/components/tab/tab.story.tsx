import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { Tab } from "./tab"

storiesOf("Tab", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Tab" usage="Tab component.">
        <Tab isActive={false} text="Text" />
      </UseCase>
    </Story>
  ))
