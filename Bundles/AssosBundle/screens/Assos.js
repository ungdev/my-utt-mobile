import React from 'react'
import { Dimensions, Image, StyleSheet, ScrollView, View } from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import GridButton from '../../../components/Menu/GridButton'

class Assos extends React.Component {
  static navigationOptions = () =>
    DefaultTopbar('Associations')

  getOrgaImageLink = orga => {
    if (!orga) return null
    return (
      'https://etu.utt.fr' +
      orga._links.find(link => link.rel === 'orga.image').uri
    )
  }
  click = asso => {
    this.props.navigation.navigate('AssosDetails', { asso })
  }
  render() {
    const { orgas } = this.props.screenProps
    let grid = []
    let gridContent = []
    for (let i = 0; i < orgas.length; i += 3) {
      gridContent.push(orgas.slice(i, i + 3))
    }

    let key = 0
    gridContent.forEach(row => {
      let rowContent = []
      row.forEach(section => {
        rowContent.push(
          <GridButton
            key={key++}
            title={section.name}
            image={
              <Image
                source={{ uri: this.getOrgaImageLink(section) }}
                style={styles.shortImage}
              />
            }
            onPress={() => this.click(section)}
          />
        )
      })
      if (rowContent.length < 3) {
        rowContent.push(<View style={styles.empty} key={key++} />)
      }
      if (rowContent.length < 3) {
        rowContent.push(<View style={styles.empty} key={key++} />)
      }
      grid.push(
        <View key={key++} style={styles.row}>
          {rowContent}
        </View>
      )
    })
    return (
      <View style={styles.container}>
        <ScrollView style={styles.grid}>{grid}</ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C6C6C6'
  },
  grid: {
    flex: 1,
    marginTop: 3
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  empty: {
    width: Dimensions.get('window').width / 3 - 6,
    height: Dimensions.get('window').width / 3 - 6,
    marginHorizontal: 1,
    marginVertical: 1
  },
  image: {
    width: Dimensions.get('window').width / 3 - 20,
    height: Dimensions.get('window').width / 3 - 20
  },
  shortImage: {
    width: Dimensions.get('window').width / 4 - 25,
    height: Dimensions.get('window').width / 4 - 25
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Assos
