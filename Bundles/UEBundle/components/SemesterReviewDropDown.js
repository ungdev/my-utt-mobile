import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { List } from 'react-native-paper'
const translate = type => {
  switch (type) {
    case 'final':
      return 'Final'
    case 'midterm':
      return 'Médian'
    case 'partiel':
      return 'Partiel'
    case 'partiel_1':
      return 'Partiel 1'
    case 'partiel_2':
      return 'Partiel 2'
    case 'dm':
      return 'Devoir Maison'
    default:
      return type
  }
}
const openReview = (review, semester, navigation) => {
  const url = 'https://etu.utt.fr' + review._links[0].uri
  navigation.navigate('Viewer', {
    name: translate(review.type) + ' ' + semester,
    url
  })
}
const SemesterReviewDropDown = props => {
  const valid = props.reviews.filter(review => review.validated)
  const invalid = props.reviews.filter(review => !review.validated)
  return (
    <List.Accordion title={props.semester}>
      {valid.length > 0 && (
        <View style={[styles.container, styles.valid]}>
          <Text style={styles.approved}>Approuvées par l'équipe</Text>
          {valid.map(review => (
            <TouchableOpacity
              key={review.id}
              onPress={() =>
                openReview(review, props.semester, props.navigation)
              }
            >
              <View style={styles.annale}>
                <Text>{translate(review.type)}</Text>
                <Text>{review.sender.fullName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {invalid.length > 0 && (
        <View style={[styles.container, styles.invalid]}>
          <Text style={styles.approved}>En attente de validation</Text>
          {invalid.map(review => (
            <TouchableOpacity
              key={review.id}
              onPress={() =>
                openReview(review, props.semester, props.navigation)
              }
            >
              <View style={styles.annale}>
                <Text>{translate(review.type)}</Text>
                <Text>{review.sender.fullName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </List.Accordion>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginBottom: 5
  },
  valid: {
    backgroundColor: '#DFF0D8'
  },
  invalid: {
    backgroundColor: '#F2DEDE'
  },
  approved: {
    color: '#9A9A9A',
    fontSize: 10
  },
  annale: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default SemesterReviewDropDown
