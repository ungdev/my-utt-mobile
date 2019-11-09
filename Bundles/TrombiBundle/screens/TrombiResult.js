import React from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { ListItem } from 'react-native-elements'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { fetchUsers } from '../../../services/api'
import Icon from 'react-native-vector-icons/FontAwesome'

class TrombiResult extends React.Component {
  static navigationOptions = () => {
    return DefaultTopbar('Résultats de la recherche')
  }
  constructor(props) {
    super(props)
    this.getUsers(props.navigation.getParam('search'), 1)
    this.state = {
      users: null,
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      perPage: 30
    }
  }
  getUserSubtitle = user => {
    let subtitle = ''
    if (user.branch) {
      subtitle += user.branch
      if (user.level) subtitle += user.level
      if (user.speciality) subtitle += ' ' + user.speciality
      if (user.formation) subtitle += ' (' + user.formation + ')'
    }
    return subtitle
  }
  getUsers = async (query, page) => {
    try {
      const result = await fetchUsers(query, page)
      const { totalPages, currentPage, perPage, totalItems } = result.pagination
      this.setState({
        users: result.data,
        currentPage,
        totalPages,
        perPage,
        totalItems
      })
    } catch (e) {
      console.log(e)
      this.props.navigation.pop()
    }
  }
  nextPage = () => {
    this.setState({ user: null })
    this.getUsers(
      this.props.navigation.getParam('search'),
      this.state.currentPage + 1
    )
  }
  previousPage = () => {
    this.setState({ user: null })
    this.getUsers(
      this.props.navigation.getParam('search'),
      this.state.currentPage - 1
    )
  }
  render() {
    const { users, totalPages, currentPage, perPage, totalItems } = this.state
    if (!users)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          {totalItems > 0 ? (
            <Text style={styles.title}>
              {totalItems} résultats,{' '}
              {currentPage === totalPages
                ? totalItems - perPage * (totalPages - 1)
                : perPage}{' '}
              sur cette page
            </Text>
          ) : (
            <Text style={styles.title}>Aucun résultat</Text>
          )}
        </View>
        <ScrollView contentContainerStyle={styles.scroll}>
          {users.map(user => (
            <ListItem
              key={user.login}
              leftAvatar={{
                source: { uri: 'https://etu.utt.fr' + user._links[2].uri }
              }}
              title={`${user.fullName}${
                user.surname ? ' (' + user.surname + ')' : ''
              }`}
              subtitle={this.getUserSubtitle(user)}
              bottomDivider
              style={styles.listitem}
              containerStyle={{ backgroundColor: '#eee' }}
              chevron
              onPress={() =>
                this.props.navigation.push('Profile', {
                  user
                })
              }
            />
          ))}
        </ScrollView>
        <View style={styles.bottom}>
          {currentPage === 1 || currentPage === 0 ? (
            <Icon name='chevron-left' size={30} color='#aaa' />
          ) : (
            <TouchableOpacity onPress={this.previousPage}>
              <Icon name='chevron-left' size={30} color='#4098ff' />
            </TouchableOpacity>
          )}
          <Text style={styles.pages}>
            Page {currentPage}/{totalPages}
          </Text>
          {currentPage === totalPages ? (
            <Icon name='chevron-right' size={30} color='#aaa' />
          ) : (
            <TouchableOpacity onPress={this.nextPage}>
              <Icon name='chevron-right' size={30} color='#4098ff' />
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  scroll: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  title: {
    fontSize: 20
  },
  input: {
    flex: 1
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listitem: {
    alignSelf: 'stretch'
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  top: {
    padding: 10,
    alignItems: 'center'
  },
  pages: {
    fontSize: 20
  }
})
export default TrombiResult
