import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { FlatLineChart } from "./flat-line-chart"

storiesOf("FlatLineChart", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="FlatLineChart" usage="Flat Line chart.">
        <FlatLineChart
          current={20}
          needed={100}
          title="title"
          description="description"
          isLast={true}
        />
      </UseCase>
    </Story>
  ))
