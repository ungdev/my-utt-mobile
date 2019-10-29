const Topbar = (title, button = null) => {
  return {
    title,
    headerStyle: {
      backgroundColor: '#4098ff'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white'
    },
    headerRight: button
  }
}
export default Topbar
