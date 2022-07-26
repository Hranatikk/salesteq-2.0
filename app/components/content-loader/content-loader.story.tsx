import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { ContentLoader } from "./content-loader"

storiesOf("ContentLoader", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="ContentLoader" usage="Content loader.">
        <ContentLoader />
      </UseCase>
    </Story>
  ))
