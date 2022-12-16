import React from 'react'
import { Image, View, StyleSheet } from 'react-native'

const Gallery = ({ dishes }) => {

  return (
    <View style={styles.container}>
      {dishes.map((item, i) => {
        return (
          <View style={styles.imageHolder} key={i}>
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" resizeMethod="scale" progressiveRenderingEnabled ={true}/>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  imageHolder: {
    height: 100,
    width: "32%",
    marginBottom: 8
  },
  image: {
    height: "100%",
    width: "100%",
  }
})
export default Gallery