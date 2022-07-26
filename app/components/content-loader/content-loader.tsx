import * as React from "react"
import { Dimensions } from "react-native"
import {default as CLoader, Circle, Rect} from "react-content-loader/native"
import { observer } from "mobx-react-lite"
import { color } from "../../theme"


export interface ContentLoaderProps {

}

const WINDOW_WIDTH = Dimensions.get('window').width;

/**
 * Content loader for statistics
 */
export const ContentLoader = observer(function ContentLoader(props: ContentLoaderProps) {
  return (
    <CLoader
      viewBox={`0 70 370 400`}
      backgroundColor={color.palette.grey}
    >
      <Rect x="15" y="17" rx="4" ry="4" width={WINDOW_WIDTH/1.3} height="30" />
      <Rect x="15" y="60" rx="3" ry="3" width={WINDOW_WIDTH/2} height="20" />

      <Rect x="15" y="130" rx="3" ry="3" width={WINDOW_WIDTH/3} height="20" />
      <Rect x={((WINDOW_WIDTH/3)*1.7)} y="130" rx="3" ry="3" width={WINDOW_WIDTH/3} height="20" />
      <Rect x="15" y="160" rx="3" ry="3" width={WINDOW_WIDTH/3} height="20" />
      <Rect x={((WINDOW_WIDTH/3)*1.7)} y="160" rx="3" ry="3" width={WINDOW_WIDTH/3} height="20" />
      <Rect x="15" y="190" rx="3" ry="3" width={WINDOW_WIDTH/3} height="20" />
      <Rect x={((WINDOW_WIDTH/3)*1.7)} y="190" rx="3" ry="3" width={WINDOW_WIDTH/3} height="20" />


      <Rect x="15" y="280" rx="3" ry="3" width={WINDOW_WIDTH/3} height="20" />
      <Rect x={((WINDOW_WIDTH/3)*1.7)} y="280" rx="3" ry="3" width={WINDOW_WIDTH/3} height="20" />
      <Rect x="15" y="310" rx="3" ry="3" width={WINDOW_WIDTH/3} height="20" />
      <Rect x={((WINDOW_WIDTH/3)*1.7)} y="310" rx="3" ry="3" width={WINDOW_WIDTH/3} height="20" />
      <Rect x="15" y="340" rx="3" ry="3" width={WINDOW_WIDTH/3} height="20" />
      <Rect x={((WINDOW_WIDTH/3)*1.7)} y="340" rx="3" ry="3" width={WINDOW_WIDTH/3} height="20" />


      <Rect x="15" y="430" rx="3" ry="3" width={WINDOW_WIDTH-55} height="20" />

      <Circle x="15" y="520" cx="120" cy="120" r="120" />
    </CLoader>
  )
})
