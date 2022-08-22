import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { TouchableRow } from "./touchable-row"

storiesOf("TouchableRow", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="TouchableRow" usage="Touchable row.">
        <TouchableRow icon="icon" title="title" description="description" isLast={false} />
      </UseCase>
    </Story>
  ))
