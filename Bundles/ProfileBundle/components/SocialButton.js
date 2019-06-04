import React from 'react'
import { SocialIcon, Avatar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { WebBrowser } from 'expo'

const openModal = async link => await WebBrowser.openBrowserAsync(link)

const SocialButton = props => {
  if (!props.link) return null
  if (props.type === 'website')
    return (
      <TouchableOpacity
        onPress={() => openModal(props.link)}
        style={{ margin: 5 }}
      >
        <Avatar
          rounded
          size='medium'
          icon={{ name: 'paperclip', type: 'font-awesome' }}
          overlayContainerStyle={{ backgroundColor: '#2E8B57' }}
        />
      </TouchableOpacity>
    )
  return (
    <SocialIcon
      type={props.type}
      onPress={() => openModal(props.link)}
      onLongPress={() => openModal(props.link)}
      style={props.type === 'viadeo' ? { backgroundColor: 'black' } : null}
    />
  )
}

export default SocialButton
