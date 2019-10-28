import React from 'react'
import { AsyncStorage, ScrollView, StyleSheet, Text, View } from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { Calendar } from 'react-native-calendars'
import moment from 'moment'
import { LocaleConfig } from 'react-native-calendars'
import { EVENTS_KEY } from '../../../constants/StorageKey'
import { fetchEvents } from '../../../services/api'
import EventLine from '../components/EventLine'

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.'
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi'
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
}
LocaleConfig.defaultLocale = 'fr'

class Events extends React.Component {
  static navigationOptions = () =>
    DefaultTopbar('Événements')

  constructor(props) {
    super(props)
    this.state = {
      current: moment().format('YYYY-MM-DD'),
      events: [],
      fetching: true,
      fetchedMonths: []
    }
  }

  componentDidMount() {
    this.getEventsFromMemory()
    this.getEventsFromServer(moment().format('YYYY-MM-DD'))
  }

  getEventsFromMemory = async () => {
    try {
      const events = await AsyncStorage.getItem(EVENTS_KEY)
      if (events) this.setState({ events: JSON.parse(events) })
    } catch (e) {
      console.log(e)
    }
  }
  getEventsFromServer = async date => {
    try {
      const { fetchedMonths } = this.state
      if (fetchedMonths.find(month => month === date)) return
      fetchedMonths.push(date)
      this.setState({ fetching: true, fetchedMonths })
      const nextdate = moment(date)
        .add(1, 'month')
        .format('YYYY-MM-DD')
      const newevents = await fetchEvents(
        date.substr(0, date.length - 2) + '01',
        nextdate.substr(0, nextdate.length - 2) + '01'
      )
      const oldevents = this.state.events
      let events = [...newevents, ...oldevents]
      for (let i = 0; i < events.length; ++i) {
        for (let j = i + 1; j < events.length; ++j) {
          if (
            events[i].title === events[j].title &&
            events[i].begin.date === events[j].begin.date &&
            events[i].end.date === events[j].end.date
          )
            events.splice(j--, 1)
        }
      }
      this.setState({ events, fetching: false })
      await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(events))
    } catch (e) {
      console.log(e)
      this.props.navigation.navigate('Login')
    }
  }

  getOrgaImageLink = orga => {
    if (!orga) return null
    return (
      'https://etu.utt.fr' +
      orga._links.find(link => link.rel === 'orga.image').uri
    )
  }
  render() {
    const { current, fetching, events } = this.state
    const { orgas } = this.props.screenProps
    let markedDates = {}
    events.forEach((event, index) => {
      const date = moment(event.begin.date).format('YYYY-MM-DD')
      if (!markedDates[date])
        markedDates[date] = {
          dots: []
        }
      markedDates[date].dots.push({
        key: event.title + index,
        color: '#4098ff',
        selectedDotColor: 'gray'
      })
    })

    if (!markedDates[current]) markedDates[current] = {}
    markedDates[current].selected = true
    markedDates[current].selectedColor = '#4098ff'
    const dayEvents = events
      .filter(
        event => moment(event.begin.date).format('YYYY-MM-DD') === current
      )
      .map(event => ({
        ...event,
        orga: orgas.find(orga => orga.login === event.orga)
      }))
    if (dayEvents.length > 0) {
      for (let i = dayEvents.length; i < 5; i++) {
        dayEvents.push('empty')
      }
    }
    return (
      <View style={{ flex: 1 }}>
        <Calendar
          current={current}
          onDayPress={day => {
            this.setState({ current: day.dateString })
          }}
          onDayLongPress={day => {
            this.setState({ current: day.dateString })
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={month => {
            this.setState({ current: month })
            this.getEventsFromServer(month.dateString)
          }}
          firstDay={1}
          markedDates={markedDates}
          markingType={'multi-dot'}
          displayLoadingIndicator={fetching}
          style={styles.calendar}
        />
        <ScrollView style={styles.dayEvents}>
          {dayEvents.length > 0 ? (
            dayEvents.map((event, index) =>
              event === 'empty' ? (
                <EventLine empty key={index}></EventLine>
              ) : (
                <EventLine
                  key={index}
                  category={event.category}
                  start={event.begin.date}
                  end={event.end.date}
                  image={this.getOrgaImageLink(event.orga)}
                  onPress={() =>
                    this.props.navigation.navigate('EventsDetails', { event })
                  }
                >
                  {event.title}
                </EventLine>
              )
            )
          ) : (
            <React.Fragment>
              <EventLine empty></EventLine>
              <EventLine empty></EventLine>
              <EventLine empty>Aucun événement ce jour</EventLine>
              <EventLine empty></EventLine>
              <EventLine empty></EventLine>
            </React.Fragment>
          )}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dayEvents: {
    alignSelf: 'stretch'
  },
  calendar: { marginBottom: 2 }
})

export default Events
