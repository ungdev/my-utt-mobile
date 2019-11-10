import React from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { normalize } from '../../../services/font'
import { fetchEvent } from '../../../api/event'
import moment from 'moment'
import HTML from 'react-native-render-html'
import config from '../../../config'

class EventsDetails extends React.Component {
  static navigationOptions = () => DefaultTopbar('Événement')

  constructor(props) {
    super(props)
    this.state = {
      event: null
    }
    this.getEventDetails()
  }

  getEventDetails = async () => {
    try {
      const navigationEvent = this.props.navigation.getParam('event')
      const event = await fetchEvent(navigationEvent.id)
      this.setState({ event })
    } catch (e) {
      console.log(e)
      this.props.navigation.pop()
    }
  }
  getOrgaImageLink = o => {
    if (!o) return null
    const { orgas } = this.props.screenProps
    const orga = orgas.find(orga => orga.login === o)
    if (!o) return null
    return (
      config.etu_utt_baseuri +
      orga._links.find(link => link.rel === 'orga.image').uri
    )
  }

  render() {
    const { event } = this.state
    if (!event) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }
    const asso = this.props.screenProps.orgas.find(orga => orga.login === event.orga)
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{event.title}</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AssosDetails', { asso })}>
          <Image
            source={{
              uri: this.getOrgaImageLink(event.orga)
            }}
            style={{ width: 150, height: 150 }}
          />
        </TouchableOpacity>
        <Text style={styles.subtitle}>Catégories : {event.category}</Text>

        <Text style={styles.subtitle}>Début le : </Text>
        <Text style={styles.p}>
          {moment(event.begin.date).format('DD/MM [à] HH:mm')}
        </Text>
        <Text style={styles.subtitle}>Fin le : </Text>
        <Text style={styles.p}>
          {moment(event.end.date).format('DD/MM [à] HH:mm')}
        </Text>
        <Text style={styles.subtitle}>Lieu : </Text>
        <Text style={styles.p}>{event.location}</Text>
        <Text style={styles.subtitle}>Description : </Text>
        <HTML html={event.description} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tags: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: normalize(30),
    textAlign: 'center',
    marginBottom: 20
  },
  subtitle: {
    fontSize: normalize(20),
    marginTop: 20,
    marginBottom: 5,
    color: '#4098ff'
  },
  p: {
    fontSize: normalize(15),
    textAlign: 'justify'
  }
})

export default EventsDetails
