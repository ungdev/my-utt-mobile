import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import { normalize } from '../../services/font'
import Popover from 'react-native-popover-view'

class GridButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rect: null
    }
  }
  componentDidMount() {
    if (!this.props.tutorialTitle) return
    // set Timeout 0 prevent all values to be 0
    setTimeout(
      () =>
        this.touchable.measure((fx, fy, width, height, x, y) => {
          this.setState({
            rect: {
              x,
              y,
              width,
              height
            }
          })
        }),
      0
    )
  }
  render() {
    return (
      <React.Fragment>
        <TouchableOpacity
          ref={ref => (this.touchable = ref)}
          style={styles.container}
          onPress={this.props.onPress}
        >
          {this.props.image && this.props.image}
          <Text style={styles.title}>{this.props.title}</Text>
        </TouchableOpacity>

        {this.props.tutorialTitle !== null && (
          <Popover
            isVisible={this.props.tutorialVisible}
            fromRect={this.state.rect}
            onRequestClose={() => this.props.closeTutorial()}
          >
            <Text style={styles.popupTitle}>{this.props.tutorialTitle}</Text>
            <Text style={styles.popup}>{this.props.tutorialContent}</Text>
          </Popover>
        )}
      </React.Fragment>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 3 - 6,
    height: Dimensions.get('window').width / 3 - 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
    marginVertical: 1,
    backgroundColor: '#FFFFFF'
  },
  title: {
    position: 'absolute',
    bottom: 5,
    fontSize: normalize(10),
    textAlign: 'center'
  },
  popupTitle: {
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  popup: {
    textAlign: 'justify',
    padding: 10
  }
})

export default GridButton
