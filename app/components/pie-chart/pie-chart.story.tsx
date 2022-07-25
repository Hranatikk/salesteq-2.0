import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { PieChart } from "./pie-chart"

storiesOf("PieChart", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="PieChart" usage="Pie chart.">
        <PieChart data={[]} showList={false} />
      </UseCase>
    </Story>
  ))
