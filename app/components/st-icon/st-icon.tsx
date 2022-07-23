import * as React from "react"
import { observer } from "mobx-react-lite"
import IcoMoon from "react-icomoon";
import { Svg, Path } from "react-native-svg";
import json from "../../../assets/fonts/selection.json";

export interface IIconProps {
  icon: string;
  size: number;
  color: string;
  style?: any;
}

/**
 * Custom component for SVG icons
 */
export const STIcon = observer(function STIcon(props: IIconProps) {
  return (
    <IcoMoon
      native
      iconSet={json}
      SvgComponent={Svg}
      PathComponent={Path}
      {...props}
    />
  )
})
