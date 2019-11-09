import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import Icon from 'react-native-vector-icons/FontAwesome'
import { InputItem } from '@ant-design/react-native'
import RNPickerSelect from 'react-native-picker-select'
import Button from '../../../components/Button'

class Trombi extends React.Component {
  static navigationOptions = () => {
    return DefaultTopbar('Trombinoscope')
  }
  constructor(props) {
    super(props)
    this.state = {
      branch: '',
      level: '',
      formation: '',
      speciality: '',
      name: '',
      email: '',
      studentId: '',
      phone: ''
      //ue: '' TODO
    }
  }
  search = () => {
    const {
      branch,
      level,
      speciality,
      formation,
      name,
      email,
      studentId,
      phone
    } = this.state
    if (
      branch === '' &&
      level === '' &&
      speciality === '' &&
      formation === '' &&
      name === '' &&
      email === '' &&
      studentId === '' &&
      phone === ''
    ) {
      return
    }
    this.props.navigation.navigate('TrombiResult', { search: this.state })
  }
  render() {
    const formations = [
      { label: 'Ingénieur', value: 'Ingénieur' },
      {
        label: 'Master sciences et technologies',
        value: 'Master sciences et technologies'
      }
    ]
    let branches = [
      { label: 'RT', value: 'RT', formation: 'Ingénieur' },
      { label: 'ISI', value: 'ISI', formation: 'Ingénieur' },
      { label: 'A2I', value: 'A2I', formation: 'Ingénieur' },
      { label: 'MTE', value: 'MTE', formation: 'Ingénieur' },
      { label: 'GM', value: 'GM', formation: 'Ingénieur' },
      { label: 'GI', value: 'GI', formation: 'Ingénieur' },
      { label: 'MM', value: 'MM', formation: 'Ingénieur' },
      { label: 'TC', value: 'TC', formation: 'Ingénieur' },
      {
        label: 'PAIP',
        value: 'PAIP',
        formation: 'Master sciences et technologies'
      },
      {
        label: 'ISC',
        value: 'ISC',
        formation: 'Master sciences et technologies'
      },
      {
        label: 'RE',
        value: 'RE',
        formation: 'Master sciences et technologies'
      },
      {
        label: 'STIC',
        value: 'STIC',
        formation: 'Master sciences et technologies'
      }
    ]
    let specialities = [
      { label: 'Libre', value: 'LIBRE', branch: 'all' },
      { label: 'ONT', value: 'ONT', branch: 'PAIP' },
      { label: 'SSC', value: 'SSC', branch: 'RT' },
      { label: 'TMOC', value: 'TMOC', branch: 'RT' },
      { label: 'LET', value: 'LET', branch: 'GI' },
      { label: 'LIP', value: 'LIP', branch: 'GI' },
      { label: 'RAMS', value: 'RAMS', branch: 'GI' },
      { label: 'TIM', value: 'TIM', branch: 'GM' },
      { label: 'MDPI', value: 'MDPI', branch: 'GM' },
      { label: 'CEISME', value: 'CEISME', branch: 'GM' },
      { label: 'SNM', value: 'SNM', branch: 'GM' },
      { label: 'TEI', value: 'TEI', branch: 'A2I' },
      { label: 'SPI', value: 'SPI', branch: 'A2I' },
      { label: 'IPL', value: 'IPL', branch: 'ISI' },
      { label: 'MPL', value: 'MPL', branch: 'ISI' },
      { label: 'MSI', value: 'MSI', branch: 'ISI' },
      { label: 'MRI', value: 'MRI', branch: 'ISI' },
      { label: 'ATN', value: 'ATN', branch: 'ISI' },
      { label: 'VDC', value: 'VDC', branch: 'ISI' },
      { label: 'EME', value: 'EME', branch: 'MTE' },
      { label: 'TCMC', value: 'TCMC', branch: 'MTE' },
      { label: 'TQM', value: 'TQM', branch: 'MTE' },
      { label: 'IMSGA', value: 'IMSGA', branch: 'RE' },
      { label: 'IMEDD', value: 'IMEDD', branch: 'RE' },
      { label: 'OSS', value: 'OSS', branch: 'ISC' },
      { label: 'SSI', value: 'SSI', branch: 'ISC' },
      { label: 'ONT', value: 'ONT', branch: 'PAIP' },
      { label: 'MMPA', value: 'MMPA', branch: 'PAIP' }
    ]
    const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const {
      email,
      name,
      studentId,
      phone,
      formation,
      branch,
      speciality
      //ue
    } = this.state
    branches = branches.filter(
      b => formation === '' || b.formation === formation || b.value === branch
    )
    specialities = specialities.filter(
      f => branch === '' || f.branch === branch || f.value === speciality
    )

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Rechercher un utilisateur</Text>
        </View>
        <InputItem
          clear
          value={name}
          onChange={name => {
            this.setState({
              name
            })
          }}
          placeholder='Nom, prénom ou surnom'
        >
          <Icon name='user' size={26} />
        </InputItem>
        <InputItem
          clear
          type='email-address'
          value={email}
          onChange={email => {
            this.setState({
              email
            })
          }}
          placeholder='Email'
        >
          <Icon name='envelope' size={26} />
        </InputItem>
        <InputItem
          clear
          value={studentId}
          onChange={studentId => {
            this.setState({
              studentId
            })
          }}
          placeholder='Numéro étudiant'
        >
          <Icon name='barcode' size={26} />
        </InputItem>
        <InputItem
          clear
          value={phone}
          onChange={phone => {
            this.setState({
              phone
            })
          }}
          placeholder='Numéro de téléphone'
        >
          <Icon name='phone' size={26} />
        </InputItem>
        <RNPickerSelect
          onValueChange={formation => this.setState({ formation })}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: 'Choisissez un diplôme', value: null }}
          Icon={() => <Icon name='graduation-cap' size={26} />}
          items={formations}
          doneText='Ok'
        />
        <RNPickerSelect
          onValueChange={branch => this.setState({ branch })}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: 'Choisissez une branche', value: null }}
          Icon={() => <Icon name='graduation-cap' size={26} />}
          items={branches}
          doneText='Ok'
        />
        <RNPickerSelect
          onValueChange={level => this.setState({ level })}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: 'Choisissez un niveau', value: null }}
          Icon={() => <Icon name='graduation-cap' size={26} />}
          items={levels.map(level => ({ label: `${level}`, value: level }))}
          doneText='Ok'
        />
        <RNPickerSelect
          onValueChange={speciality => this.setState({ speciality })}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: 'Choisissez une filière', value: null }}
          Icon={() => <Icon name='graduation-cap' size={26} />}
          items={specialities}
          doneText='Ok'
        />
        {/* TODO <InputItem
          clear
          value={ue}
          onChange={ue => {
            this.setState({
              ue
            })
          }}
          placeholder='UEs (séparées par des virgules)'
        >
          <Icon name='book' size={26} />
        </InputItem>*/}
        <Button onPress={this.search} title='Rechercher' />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 20
  },
  title: {
    fontSize: 25,
    marginBottom: 20
  },
  titleContainer: {
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  input: {
    flex: 1
  }
})
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#eee',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    alignSelf: 'stretch',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#eee',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10,
    left: 15
  }
})
export default Trombi
