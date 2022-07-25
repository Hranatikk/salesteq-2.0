import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { BezierChart } from "./bezier-chart"

storiesOf("BezierChart", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Bezier chart" usage="Bezier chart">
        <BezierChart data={{labels: [], datasets: []}} />
      </UseCase>
    </Story>
  ))
