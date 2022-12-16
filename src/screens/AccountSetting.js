import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'

// assets
import headerPic from '../../assets/headerPic.jpg'
import userPic from '../../assets/userPic.jpg'

// icon
import { FontAwesome } from '@expo/vector-icons';

// firebase
import { updateDoc, doc } from "firebase/firestore";
import { db } from '../../firebaseApp';

// libraries
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const AccountSetting = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState({})
  const [loading, setLoading] = useState(false)
  const userid = "wT85MiMYkVtcrfPPtdWo" //a fixed user

  const handleChange = (value, name) => {
    setInput(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const userRef = doc(db, "user", userid)
      await updateDoc(userRef, input)
      Alert.alert("Saved")
      await AsyncStorage.setItem("user", JSON.stringify(input))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user")
      setInput(JSON.parse(user))
    })()
  }, [])

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Image
        source={headerPic}
        style={styles.headerPic}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={{ ...styles.backButton, top: insets.top + 12 }}
        onPress={() => {
          navigation.goBack()
        }}>
        <FontAwesome name="arrow-circle-left" size={35} color="white" />
      </TouchableOpacity>

      <View style={styles.formWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            source={userPic}
            style={styles.userPic}
            resizeMode="cover"
          />
        </View>

        <View style={styles.textRow}>
          <Text style={styles.title}>Handle Name</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter here'
            value={input.name}
            onChangeText={(value) => handleChange(value, "name")}
          />
        </View>

        <View style={styles.textRow}>
          <Text style={styles.title}>Bio</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter here'
            value={input.bio}
            onChangeText={(value) => handleChange(value, "bio")}
          />
        </View>

        <View style={styles.textRow}>
          <Text style={styles.title}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter here'
            value={input.location}
            onChangeText={(value) => handleChange(value, "location")}
          />
        </View>

        <View style={styles.textRow}>
          <Text style={styles.title}>Gender (hidden)</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter here'
            value={input.gender}
            onChangeText={(value) => handleChange(value, "gender")}
          />
        </View>

        <View style={styles.textRow}>
          <Text style={styles.title}>Birthdate (hidden)</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter here'
            value={input.birthdate}
            onChangeText={(value) => handleChange(value, "birthdate")}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button}
            onPress={() => !loading && handleSave()}>
            <Text style={styles.buttonText}>{loading ? "Saving" : "Save"}</Text>
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 19,
    left: 20
  },
  headerPic: {
    height: 250,
    width: "100%"
  },
  formWrapper: {
    top: -85,
    paddingHorizontal: 30,
  },
  imageWrapper: {
    height: 110,
    width: 110,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: .4,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 10
  },
  userPic: {
    height: 110,
    width: 110,
    borderRadius: 10,
  },
  textRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    paddingTop: 25,
    paddingBottom: 10,
    paddingLeft: 5,
    width: "100%",
    alignItems: "center"
  },
  title: {
    fontFamily: "semiBold",
    fontSize: 13,
    color: "gray",
  },
  input: {
    fontFamily: "bold",
    fontSize: 15,
    flex: 1,
    marginLeft: 10,
    textAlign: "right"
  },
  buttonWrapper: {
    width: "100%",
    alignItems: "center"
  },
  button: {
    width: "70%",
    backgroundColor: "#f0b1bd",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 50,
  },
  buttonText: {
    fontFamily: "bold",
    fontSize: 14,
    textAlign: "center",
    color: "white"
  }
});


export default AccountSetting