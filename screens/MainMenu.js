import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Appbar } from 'react-native-paper'
import GridButton from '../components/Menu/GridButton'
import { ScrollView } from 'react-native-gesture-handler'
import ue from '../assets/images/menu/uvs.png'
import trombi from '../assets/images/menu/trombi.png'
import edt from '../assets/images/menu/edt.png'

class MainMenu extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount () {
    //TODO autologin
  }

  render() {
    let grid = []
    let gridContent = [
      [
        {
          name: 'Trombinoscope',
          image: trombi
        },
        {
          name: 'Guide des UEs',
          image: ue
        },
        {
          name: 'Emploi du temps',
          image: edt
        }
      ],
      [
        {
          name: ''
        },
        {
          name: ''
        },
        {
          name: 'Paramètres'
        }
      ],
    ]
    let key = 0
    gridContent.forEach(row => {
      let rowContent = []
      row.forEach(section => {
        rowContent.push(
        <GridButton
          key={key++}
          title={section.name}
          image={section.image}
        />)
      })
      grid.push(<View key={key++} style={styles.row}>{ rowContent }</View>)
    })
    return (
      <View style={styles.container}>
        <Appbar style={styles.bottom}></Appbar>
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
    marginTop: 55
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#333'
  },
});



export default MainMenu
