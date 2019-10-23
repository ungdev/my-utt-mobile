import React from 'react'
import {
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { fetchUECommentaires } from '../../../services/api'
import { Card } from '@ant-design/react-native'
import HTML from 'react-native-render-html'
import moment from 'moment'

class UECommentaries extends React.Component {
  constructor(props) {
    super(props)
    this.getCommentaires(props.navigation.getParam('slug'))
    this.state = {
      comments: null
    }
  }
  static navigationOptions = ({ navigation }) => {
    let title = `${navigation.getParam('code', '...')} - Commentaires`
    return {
      title,
      headerStyle: {
        backgroundColor: '#4098ff'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft: Platform.OS === 'ios' && (
        <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
          <Text style={{ marginLeft: 8, color: 'white', fontSize: 20 }}>
            Retour
          </Text>
        </TouchableOpacity>
      )
    }
  }

  getCommentaires = async slug => {
    try {
      const comments = await fetchUECommentaires(slug)
      this.setState({ comments })
    } catch (e) {
      console.log(e)
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    const { comments } = this.state
    if (!comments)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    // TODO redirect to user profil on click on name
    return (
      <View style={styles.container}>
        <ScrollView>
          {comments.map((comment, index) => {
            const date = moment(comment.createdAt.date).format('DD/MM/YYYY')
            return (
              <Card key={index} style={styles.card}>
                <Card.Header
                  title={`De : ${comment.fullName}`}
                  extra={`Le ${date}`}
                />
                <Card.Body style={styles.body}>
                  <HTML html={comment.body} />
                </Card.Body>
              </Card>
            )
          })}
          {comments.length === 0 && (
            <View style={styles.empty}>
              <Text>Aucun commentaire pour cette UE</Text>
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
  card: {
    marginBottom: 10,
    marginTop: 10
  },
  body: {
    padding: 10
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

export default UECommentaries
