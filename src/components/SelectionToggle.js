import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const SelectionToggle = ({ text, count, selection, pageViewRef, id }) => {
  return (
    <TouchableOpacity onPress={() => {
      pageViewRef.current.setPage(id)
    }}>
      <View style={styles.textWrapper}>
        {id === selection && <View style={styles.underline} />}
        <Text style={styles.text}>
          {text}
        </Text>
        <Text style={styles.badge}>
          {count}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 12
  },
  text: {
    fontSize: 18,
    fontFamily: "semiBold"
  },
  badge: {
    fontSize: 10,
    color: "gray",
    top: -5,
    left: -5
  },
  underline: {
    backgroundColor: "#ffd919",
    height: 6,
    width: "75%",
    position: "absolute",
    bottom: 2,
    left: -5,
    borderRadius: 10
  }
});

export default SelectionToggle