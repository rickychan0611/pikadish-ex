import React, { useEffect, useState, useRef } from 'react'
import { Image, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'

// assets
import headerPic from '../../assets/headerPic.jpg'

// firebase
import { db } from '../../firebaseApp';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// libraries
import PagerView from 'react-native-pager-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

// icons
import { EvilIcons } from '@expo/vector-icons';

// components
import SelectionToggle from '../components/SelectionToggle';
import UserInfoCard from '../components/UserInfoCard';
import Gallery from '../components/Gallery';

const UserProfile = ({ navigation }) => {
  const pageViewRef = useRef()
  const insets = useSafeAreaInsets();
  const [dishesAte, setDishesAte] = useState([])
  const isFocused = useIsFocused();
  const [dishesWillTry, setDishesWillTry] = useState([])
  const [selection, setSelection] = useState(0)
  const [user, setUser] = useState({})
  const userid = "wT85MiMYkVtcrfPPtdWo" //a fixed user

  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "dishes"));
        let wannaTry = []
        let ate = []
        querySnapshot.forEach((doc) => {
          if (doc.data().wannaTry) {
            wannaTry.push(doc.data().strMealThumb)
          }
          else {
            ate.push(doc.data().strMealThumb)
          }
        });
        setDishesAte(ate)
        setDishesWillTry(wannaTry)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const userRef = doc(db, "user", userid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        await AsyncStorage.setItem("user", JSON.stringify(userSnap.data()))
        setUser(userSnap.data())
      } else {
        console.log("No such user!");
      }
    })()
  }, [isFocused])

  return (
    <ScrollView style={styles.container}>
      <Image
        source={headerPic}
        style={styles.headerPic}
        resizeMode="cover"
      />
      <EvilIcons name="gear" size={35} color="lightgray"
        style={{
          ...styles.settingIcon,
          top: insets.top + 10
        }}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("AccountSetting")}>
        <UserInfoCard user={user}/>
      </TouchableOpacity>

      <View style={styles.toggleContainer}>
        <SelectionToggle text="Dish Ate" count={dishesAte.length} selection={selection} pageViewRef={pageViewRef} id={0} />
        <SelectionToggle text="Wanna Trys" count={dishesWillTry.length} selection={selection} pageViewRef={pageViewRef} id={1} />
      </View>

      <PagerView
        style={{ flex: 1, height: 900 }}
        initialPage={0}
        ref={pageViewRef}
        onPageSelected={(e) => {
          setSelection(e.nativeEvent.position)
        }}
      >
        <Gallery dishes={dishesAte} />
        <Gallery dishes={dishesWillTry} />
      </PagerView>

    </ScrollView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerPic: {
    height: 250,
    width: "100%"
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  settingIcon: {
    position: "absolute",
    top: 30,
    right: 15
  }
});


export default UserProfile