import React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { fetchUEReviews } from '../../../api/ue'
import SemesterReviewDropDown from '../components/SemesterReviewDropDown'
import DefaultTopbar from '../../../constants/DefaultTopbar'

class UEReviews extends React.Component {
  constructor(props) {
    super(props)
    this.getReviews(props.navigation.getParam('slug'))
    this.state = {
      reviews: null
    }
  }
  static navigationOptions = ({ navigation }) => {
    const title = `${navigation.getParam('code', '...')} - Annales`
    return DefaultTopbar(title)
  }

  getReviews = async slug => {
    try {
      const reviews = await fetchUEReviews(slug)
      this.setState({ reviews })
    } catch (e) {
      console.log(e)
    }
  }
  sortEntries = (a, b) => {
    if (a[0].substr(1) > b[0].substr(1)) return -1
    if (a[0].substr(1) < b[0].substr(1)) return 1
    if (a[0].charAt(0) > b[0].charAt(0)) return 1
    if (a[0].charAt(0) < b[0].charAt(0)) return -1
    return 0
  }

  render() {
    const { reviews } = this.state
    if (!reviews)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    let semesters = {}
    reviews.forEach(review => {
      if (!semesters[review.semester]) semesters[review.semester] = [review]
      else semesters[review.semester].push(review)
    })
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.subcontainer}>
          {Object.entries(semesters)
            .sort(this.sortEntries)
            .map((entries, index) => (
              <SemesterReviewDropDown
                key={index}
                semester={entries[0]}
                reviews={entries[1]}
                navigation={this.props.navigation}
              />
            ))}
          {reviews.length === 0 && (
            <View style={styles.empty}>
              <Text>Aucune annale pour cette UE</Text>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subcontainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width * 0.9
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  back: { flexDirection: 'row', alignItems: 'center' },
  empty: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 15
  }
})

export default UEReviews
