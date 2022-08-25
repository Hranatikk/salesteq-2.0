import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { Card } from "./card"

storiesOf("Card", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Card item" usage="Card item.">
        <Card
          title="Title"
          subtitle="Subtitle"
          onPress={() => console.log("e")}
          iconName="game_outline_28"
          iconText="Icon description"
          iconTextColor={color.palette.grey}
          statusText="Status: Gold"
          statusTextColor={color.palette.red}
        />
      </UseCase>
    </Story>
  ))
