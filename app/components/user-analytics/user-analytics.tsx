import * as React from "react"
import { TextStyle } from "react-native"
import dayjs from "dayjs"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { spacing } from "../../theme"
import { Text } from "../text/text"
import { ComponentWrapper } from "../component-wrapper/component-wrapper"
import { TextRow } from "../text-row/text-row"
import { FlatLineChart } from "../flat-line-chart/flat-line-chart"
import { TouchableRow } from "../touchable-row/touchable-row"
import { BezierChart } from "../bezier-chart/bezier-chart"
import { PieChart } from "../pie-chart/pie-chart"
import { getColorByString } from "../../utils/get-color-by-string"
import { translate } from "../../i18n/"

const HEADER_TEXT: TextStyle = {
  marginHorizontal: spacing[4],
  marginBottom: spacing[2]
}

const CONTAINER_TITLE: TextStyle = {
  marginBottom: spacing[3]
}

const CONTAINER_SUBTITLE: TextStyle = {
  marginBottom: spacing[5]
}

export interface UserAnalyticsProps {
  profile?: any
  profileStats?: any
}

/**
 * User analytics component
 */
export const UserAnalytics = observer(function UserAnalytics(props: UserAnalyticsProps) {
  const navigation = useNavigation();

  const getPieChartData = (item) => {
    return item.map((i, index) => ({
      value: i.amount,
      name: `${i.title}`,
      svg: {
        fill: getColorByString(`${i.title}${i.index}`),
      },
      key: `pie-${index}`,
    }));
  }

  const getDateChartData = (data:any) => {
    return {
      labels: data.map(i => dayjs(new Date(i.datetime__date)).format('MMMM DD')),
      datasets: [
        {
          data : data.map(i => Number(i.sum.toFixed(2))),
          color: (opacity = 1) => `rgba(90, 84, 202, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  }
  
  const { profile, profileStats } = props;
  return (
    <>
      <Text preset="header" style={HEADER_TEXT}>{profile?.first_name} {profile?.last_name}</Text>
      <Text preset="description" style={HEADER_TEXT}>{profile?.email}</Text>

      {(profileStats || profile?.data) ?(
        <ComponentWrapper isTouchable={false}>
          {profileStats
            ? <TextRow leftText={translate("analyticsScreen.rank")} rightText={profileStats?.leveling.current.title.toString()} isLast={false} />
            : null
          }

          {profile?.data
            ? <TextRow leftText={translate("analyticsScreen.turnover")} rightText={`${profile?.data.turnover} BYN`} isLast={true} />
            : null
          }
        </ComponentWrapper>
      ) : null}

      {profileStats?.general?.filter(i => i.type === 'simple').length > 0 ? (
        <ComponentWrapper isTouchable={false}>
          {profileStats?.general?.filter(i => i.type === 'simple').map((item, index) => (
            <TextRow
              key={`simple_line_${index}`}
              leftText={item.title}
              rightText={typeof item.data === "number" ? item.data.toFixed(2).toString() : ""}
              isLast={index+1 === profileStats?.general?.filter(i => i.type === 'simple').length}
            />
          ))}
        </ComponentWrapper>
      ): null}

      {(profileStats?.leveling?.next) ? (
        <ComponentWrapper isTouchable={false}>
          <Text preset="boldTitle" style={CONTAINER_TITLE}>Progress till next rank: {profileStats?.leveling?.next.title}</Text>
          {profileStats.leveling.next.conditions.map((i, index) => (
            <FlatLineChart
              key={`flat_chart_${index}`}
              current={i.current}
              needed={i.needed}
              title={i.title}
              description={i.description}
              isLast={profileStats.leveling.next.conditions.length === index+1}
            />
          ))}
        </ComponentWrapper>
      ) : null}

      <ComponentWrapper isTouchable={false}>
        <TouchableRow
          icon="history_backward_outline_28"
          title={translate("analyticsScreen.saleHistory")}
          description={translate("analyticsScreen.saleHistoryDescription")}
          isLast={false}
          onPress={() => navigation.navigate("userSaleHistory", {user: profile})}
        />
        <TouchableRow
          icon="money_wad_outline_28"
          title={translate("analyticsScreen.revenueFromSales")}
          description={translate("analyticsScreen.revenueFromSalesDecription")}
          isLast={true}
          onPress={() => navigation.navigate("userRevenueHistory", {user: profile})}
        />
      </ComponentWrapper>
      
      {profileStats?.general?.filter(i => i.type === 'stats_with_date' && typeof i.data === "object" && i.data.length > 1).length > 0 ? (
        <>
          {profileStats?.general?.filter(i => i.type === 'stats_with_date' && typeof i.data === "object" && i.data.length > 1).map((item, index) => (
            <ComponentWrapper isTouchable={false} key={`bezier_chart_${index}`}>
              <Text preset="boldTitle" style={CONTAINER_TITLE}>{item.title}</Text>
              {item.description ? <Text preset="description" style={CONTAINER_SUBTITLE}>{item.description}</Text> : null}
      
              <BezierChart data={getDateChartData(item.data)} />
            </ComponentWrapper>
          ))}
        </>
      ) : null}

      {profileStats?.structure?.filter(i => i.type === 'stats_pie_chart' && i.data.length > 0).length > 0 ? (
        <>
          {profileStats?.structure?.filter(i => i.type === 'stats_pie_chart' && i.data.length > 0).map((item, index) => (
            <ComponentWrapper isTouchable={false} key={`pie_chart_${index}`}>
              <Text preset="boldTitle" style={CONTAINER_TITLE}>{item.title}</Text>
              {item.description ? <Text preset="description" style={CONTAINER_SUBTITLE}>{item.description}</Text> : null}
      
              <PieChart data={getPieChartData(item.data)} showList={true} />
            </ComponentWrapper>
          ))}
        </>
      ) : null}
    </>
  )
})
