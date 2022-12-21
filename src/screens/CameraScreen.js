import { useState, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function CameraScreen({ navigation }) {
  const cameraRef = useRef();
  const [type, setType] = useState("front");
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false)

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleSave = async () => {
    setLoading(true)
    const storage = getStorage();
    const uri = capturedImage.uri
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const storageRef = ref(storage, 'profile.jpg');

    uploadBytes(storageRef, blob).then(() => {
      navigation.goBack()
      setLoading(false)
    });
  }

  const takePicture = async () => {
    if (!cameraRef) return;
    let photo = await cameraRef.current.takePictureAsync();
    // await cameraRef.current.pausePreview();
    setCapturedImage(photo);
  };

  const handleCancel = async () => {
    if (!cameraRef) return;
    // cameraRef.current.resumePreview()
    setCapturedImage();
  };

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Entypo name="chevron-thin-left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
          <MaterialCommunityIcons name="camera-flip-outline" size={35} color="white" />
        </TouchableOpacity>
        {capturedImage ? <Image
          style={styles.camera}
          source={capturedImage}
        />
          :
          <Camera
            type={type}
            ratio="1:1"
            style={styles.camera}
            ref={cameraRef}
          />}
      </View>
      <View style={styles.buttonContainer}>
        {!capturedImage ?
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity style={styles.shutter} onPress={() => takePicture()}>
              <Ionicons name="radio-button-on" size={70} color="white" />
            </TouchableOpacity>
          </View>
          :
          <View style={styles.saveButtonContainer}>
            {!loading && <TouchableOpacity onPress={() => handleCancel()}>
              <Text style={styles.buttonText}>{"Cancel"}</Text>
            </TouchableOpacity>}
            <TouchableOpacity onPress={() => handleSave()}>
              <Text style={styles.buttonText}>{loading ? "Saving..." : "Save"}</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: "center",
    backgroundColor: "black"
  },
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width
  },
  backButton: {
    position: "absolute",
    top: 25,
    left: 15
  },
  flipButton: {
    position: "absolute",
    top: 15,
    right: 15
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: "center",
    bottom: 80
  },
  shutter: {
  },
  saveButtonContainer: {
    justifyContent: 'center',
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
  },
  buttonText: {
    fontFamily: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "white",
    paddingHorizontal: 40
  }
});
