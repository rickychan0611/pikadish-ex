import React, { useEffect, useState, useRef } from 'react'
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
import headerPic from '../../assets/headerPic.jpg'
import SelectionToggle from '../components/SelectionToggle';
import UserInfoCard from '../components/UserInfoCard';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../../firebaseApp';
import Gallery from '../components/Gallery';
import PagerView from 'react-native-pager-view';

const UserProfile = () => {
  const pageViewRef = useRef()
  const [dishesAte, setDishesAte] = useState([])
  const [dishesWillTry, setDishesWillTry] = useState([])
  const [selection, setSelection] = useState(0)

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

  return (
    <ScrollView style={styles.container}>
      <Image
        source={headerPic}
        style={styles.headerPic}
        resizeMode="cover"
      />

      <UserInfoCard />

      <View style={styles.toggleContainer}>
        <SelectionToggle text="Dish Ate" count={dishesAte.length} selection={selection} pageViewRef={pageViewRef} id={0}/>
        <SelectionToggle text="Wanna Trys" count={dishesWillTry.length} selection={selection} pageViewRef={pageViewRef} id={1}/>
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
  }
});

export default UserProfile