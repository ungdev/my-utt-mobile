import React from 'react'
import { Linking, ScrollView, StyleSheet, Text } from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'

class About extends React.Component {
  static navigationOptions = () => DefaultTopbar('À propos')

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bienvenue sur l'application My UTT !</Text>
        <Text style={styles.h}>Historique</Text>
        <Text style={styles.p}>
          Cette application a été créée par l'UTT Net Group (UNG), l'association
          d'informatique de l'UTT. Elle a été développée initialement par Arnaud
          Dufour.
        </Text>
        <Text style={styles.p}>
          L'UNG a développé et maintient un site étudiant depuis 2002, dont de
          multiples versions se sont succédées. La version actuelle du site
          étudiant a été créée par Titouan Galopin, en 2013. Depuis, quelques
          personnes se sont succédées pour maintenir et améliorer le site.
        </Text>
        <Text style={styles.p}>
          Quelques années après sa création, l'émergence des smartphones dans
          notre quotidien a fait naître une idée : créer une application mobile
          pour ce site étudiant.
        </Text>
        <Text style={styles.p}>
          Parallèlement, l'UNG a été approchée en 2018 par Thibault Vigier
          représentant la fondation UTT pour créer une application pour l'UTT.
          Nous avons alors décidé de réaliser cette application, orientée plus
          pour les étudiants pour l'instant, mais nous aimerions sur le long
          terme offrir des fonctionnalités au personnel de l'UTT !
        </Text>
        <Text style={styles.h}>Un problème ?</Text>
        <Text style={styles.p}>
          Si un problème est survenu sur l'application, n'hésitez surtout pas à
          nous en faire part ! Vous pouvez publier un bug directement sur le
          site étudiant (
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://etu.utt.fr/bugs')}
          >
            https://etu.utt.fr/bugs
          </Text>
          ), ou en nous envoyant un mail à{' '}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('mailto:ung@utt.fr')}
          >
            ung@utt.fr
          </Text>
          . Nous essayerons d'ajouter dans un futur proche le module de bugs du
          site étudiant dans cette application.
        </Text>
        <Text style={styles.h}>Contribuer</Text>
        <Text style={styles.p}>
          Tu souhaites aider au développement ? C'est possible !
        </Text>
        <Text style={styles.p}>
          - Tu souhaites développer l'application et tu sais déjà un peu coder ?
          Parfait ! Contacte nous et on t'intégrera à l'équipe ;) Le code source
          de cette application est public, tu peux nous proposer tes
          modifications ;) (Avec une petite pull request sur github par exemple)
        </Text>
        <Text style={styles.p}>
          - Tu souhaites développer l'application et tu ne sais pas coder ? Ce
          n'est pas grave ! Il faut bien commencer quelque part ;) Essaye de te
          former seul à React Native, et si tu as des questions pose les nous !
          Pas besoin d'être un pro pour commencer à contribuer, dés que tu seras
          un peu plus à l'aise avec React Native, tu pourras déjà commencer à
          travailler sur My UTT ^^.
        </Text>
        <Text style={styles.p}>
          - Tu ne souhaites pas développer ? Ce n'est pas un problème ! Tu peux
          nous rapporter des bugs, nous proposer des améliorations ou même si tu
          en es capable nous faire des désigns.
        </Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5
  },
  p: {
    alignSelf: 'stretch',
    padding: 5,
    fontSize: 15,
    textAlign: 'justify'
  },
  h: {
    marginTop: 20,
    padding: 5,
    color: '#00b5ec',
    fontSize: 30
  },
  title: {
    fontSize: 20
  },
  link: {
    color: '#00b5ec'
  }
})

export default About
