import React, { FC, useState, useEffect } from "react"
import { View, FlatList, TextStyle, ViewStyle } from "react-native"

// Libs
import { Calendar } from "react-native-calendars"
import dayjs from "dayjs"

// State
import { observer } from "mobx-react-lite"

// Navigation
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

// Components
import {
  Screen,
  SimpleBackground,
  Header,
  ComponentWrapper,
  Card,
  Text,
} from "../../components"

// Styles
import { color, spacing } from "../../theme"

const FULL: ViewStyle = {
  flex: 1,
}

const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}

const HEADER_TITLE: TextStyle = {
  fontSize: 18,
  textAlign: "center",
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const calendarEvents = [
  {
    id: 0,
    date: new Date('2022-07-28'),
    title: 'Meeting #1',
    subtitle: 'Meeting with clients',
    participants: ['Ivan Staver', 'Nikita Zyl'],
  },
  {
    id: 1,
    date: new Date('2022-07-28'),
    title: 'Daily call',
    subtitle: 'Daily call for department',
    participants: ['Ivan Staver', 'Nikita Zyl', 'Andrei Shaban'],
  },
  {
    id: 2,
    date: new Date('2022-07-30'),
    title: 'Daily call',
    subtitle: 'Simple daily call',
    participants: ['Nikita Zyl'],
  },
  {
    id: 3,
    date: new Date('2022-07-29'),
    title: 'Meeting #3',
    subtitle: 'New meeting with new department at new date',
    participants: ['Gleb Skripinsky'],
  },
  {
    id: 4,
    date: new Date('2022-07-01'),
    title: 'Meeting #2',
    subtitle: 'New meeting with new department at new date',
    participants: ['Ivan Staver', 'Nikita Zyl'],
  },
  {
    id: 5,
    date: new Date('2022-07-28'),
    title: 'Meeting #3',
    subtitle: 'New meeting with new department at new date',
    participants: ['Ivan Staver', 'Nikita Zyl'],
  },
  {
    id: 6,
    date: new Date('2022-07-28'),
    title: 'Meeting #4',
    subtitle: 'New meeting with new department at new date',
    participants: ['Ivan Staver', 'Nikita Zyl'],
  },
  {
    id: 7,
    date: new Date('2022-07-28'),
    title: 'Meeting #5',
    subtitle: 'New meeting with new department at new date',
    participants: ['Ivan Staver', 'Nikita Zyl'],
  },
];


export const CalendarScreen: FC<StackScreenProps<NavigatorParamList, "calendar">> = observer(function CalendarScreen() {
  const [selectedDate, setDate] = useState('');

  useEffect(() => {
    const currentDare = dayjs(new Date()).format('YYYY-MM-DD');
    setDate(`${currentDare}`);
  }, [])

  const getMarkedDates = () => {
    const newMarkedDates = {};
    const selectedToFormat = {
      id: 0,
      date: new Date(selectedDate),
      title: '',
      subtitle: '',
      participants: [''],
    };

    calendarEvents.concat([selectedToFormat]).map(event => {
      newMarkedDates[dayjs(event.date).format('YYYY-MM-DD')] = {
        selected: dayjs(event.date).format('YYYY-MM-DD') === selectedDate,
        marked: dayjs(event.date).format('YYYY-MM-DD') !== selectedDate,
      };
    });

    return newMarkedDates;
  }

  const getEventsOnDate = () => {
    const events = calendarEvents.filter(i => dayjs(i.date).format('YYYY-MM-DD') === selectedDate);
    return events;
  }

  const renderCalendar = () => {
    return (
      <ComponentWrapper isTouchable={false}>
        <Calendar
          current={new Date().toDateString()}
          onDayPress={day => setDate(day.dateString)}
          monthFormat={'yyyy MM'}
          hideArrows={false}
          hideExtraDays={false}
          disableMonthChange={true}
          firstDay={1}
          hideDayNames={false}
          onPressArrowLeft={subtractMonth => subtractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          disableArrowLeft={false}
          disableArrowRight={false}
          disableAllTouchEventsForDisabledDays={true}
          renderHeader={date => (
            <Text>{dayjs(date).format('DD MMMM YYYY')}</Text>
          )}
          theme={{
            todayTextColor: color.primary,
            arrowColor: color.primary,
            selectedDayBackgroundColor: color.primary,
            selectedDayTextColor: color.palette.white,
            dotColor: color.primary,
          }}
          markingType={'custom'}
          markedDates={getMarkedDates()}
        />
      </ComponentWrapper>
    );
  }

  const renderItem = (item) => {
    return (
      <Card
        title={item.title}
        subtitle={item.subtitle}
        onPress={() => {}}
        iconName="users_outline_28"
        iconText={item.participants.join(', ')}
        iconTextColor={color.text}
      />
    )
  }

  return (
    <View testID="CalendarScreen" style={FULL}>
      <SimpleBackground />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerTx="calendarScreen.title"
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />

        <FlatList
          keyExtractor={(item) => `event_${item.id}`}
          data={getEventsOnDate()}
          renderItem={({item}) => renderItem(item)}
          // refreshing={isFetching}
          // onRefresh={() => this.loadInfo()}
          ListHeaderComponent={() => renderCalendar()}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <></>
          )}
        />        
      </Screen>
    </View>
  )
})
