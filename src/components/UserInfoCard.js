import React from 'react'
import { Image, StyleSheet, Text, View, Platform, ImageBackground } from 'react-native'
import userPic from '../../assets/placeholder.png'
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';

const UserProfile = ({ user }) => {

  const IosBox = ({ children }) => (
    <>
      <BlurView intensity={40} tint="light" style={styles.iosBlurView} />
      <View style={styles.iosShadowView} />
      {children}
    </>
  )

  const AndroidBox = ({ children }) => (
    <>
      <ImageBackground style={styles.androidCardBackground} />
      <View style={styles.androidView}>
        {children}
      </View>
    </>
  )

  const Content = () => (
    <View style={styles.userContent}>
      <Image
        source={! user.avatar ? userPic : { uri: user.avatar }}
        style={styles.userPic}
        resizeMode="cover"
      />
      <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
      <View style={styles.findMeWrapper}>
        <Text style={styles.findMe}>{user.bio}</Text>
        <MaterialIcons name="edit" size={14} color="lightgrey" />
      </View>
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>11 Follower</Text>
        <Text style={{ ...styles.statusText, marginHorizontal: 5 }}>|</Text>
        <Text style={styles.statusText}>25 Following</Text>
        <Text style={{ ...styles.statusText, marginHorizontal: 5 }}>|</Text>
        <Text style={styles.statusText}>9 Friends</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.wrapper}>
      {/* Since Android doesn't support blur view and shadows on transparent view is problematic,
          ImageBackground is used for nice shadow and transparent effect. */}
      {Platform.OS === "ios" ?
        <IosBox>
          <Content />
        </IosBox>
        :
        <AndroidBox>
          <Content />
        </AndroidBox>
      }
    </View >
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 160,
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
    top: -30
  },
  iosBlurView: {
    overflow: 'hidden',
    borderRadius: 25,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  iosShadowView: {
    backgroundColor: "white",
    opacity: .1,
    borderRadius: 25, position: "absolute", width: "100%", height: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: .5,
    shadowRadius: 5,
  },
  androidCardBackground: {
    backgroundColor: "white",
    borderRadius: 25,
    width: "100%",
    height: "100%",
    elevation: 3,
    opacity: .7
  },
  androidView: {
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  container: {
    flex: 1,
  },
  headerPic: {
    height: 200,
    width: "100%"
  },
  userInfoContainer: {
    width: "100%",
    paddingHorizontal: 25,
    height: 140
  },
  cardBackground: {
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 25,
    backgroundColor: Platform.OS === "ios" ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, .7)",
    top: -30,
    paddingVertical: 5,
    elevation: 10,
    overflow: 'hidden'
  },
  blurView: {
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    width: "100%",
  },
  userContent: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  userPic: {
    height: 84,
    width: 84,
    borderRadius: 40,
  },
  name: {
    fontSize: 24,
    fontFamily: "bold",
    marginTop: 8,
  },
  findMeWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  findMe: {
    fontSize: 12,
    fontFamily: "bold",
    color: "lightgrey",
    marginTop: 2,
  },
  statusRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginTop: 14
  },
  statusText: {
    fontSize: 10,
    fontFamily: "semiBold"
  }
});

export default UserProfile