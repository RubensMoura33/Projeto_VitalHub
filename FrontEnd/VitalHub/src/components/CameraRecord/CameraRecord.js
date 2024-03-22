import { Camera, CameraType, FlashMode } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { Btn } from "../Button/Button";
import { ButtonTitle } from "../Title/Style";
import { LinkCancel } from "../Link/Style";

export default function CameraRecord({
  navigation,
  visible,
  setShowModalSchedule,
  ...rest
}) {
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.front);
  const [flashOn, setFlashOn] = useState(Camera.Constants.FlashMode.off);

  async function CapturePhoto() {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
      setOpenModal(true)
    }
  }

  function ClearPhoto() {
    setPhoto(null);

    setOpenModal(false);
  }

  function OnPressToSend() {
    
    navigation.navigate("SeePrescription", { photoUri: photo });
    setOpenModal(false)
  }

  function OnPressRemake() {  
    setOpenModal(false)
  }

  async function SavePhoto() {
    if (photo) {
      await MediaLibrary.createAssetAsync(photo)
        .then(() => {
          alert("Sucesso", "Foto salva na galeria");
        })
        .catch((error) => {
          alert("Erro ao processar foto");
        });
    }
  }

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();

      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        type={tipoCamera}
        style={styles.camera}
        flashMode={flashOn}
      >
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.btnFlash}
            onPress={() =>
              setFlashOn(flashOn == FlashMode.on ? FlashMode.off : FlashMode.on)
            }
          >
            <Ionicons
              name={flashOn === FlashMode.on ? "flash" : "flash-off"}
              size={42}
              color={flashOn === FlashMode.on ? "yellow" : "white"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnCaptura}
            onPress={() => CapturePhoto()}
          >
            <View style={styles.viewCamera}></View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnFlip}
            onPress={() =>
              setTipoCamera(
                tipoCamera == CameraType.front
                  ? CameraType.back
                  : CameraType.front
              )
            }
          >
            <FontAwesome6 name="camera-rotate" size={45} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>

      <Modal
        {...rest}
        visible={openModal}
        transparent={true}
        animationType="fade"
        animationsOutTiming={0}
      >
        <View style={styles.container}>
          <Image
            style={{ width: "80%", height: 300, borderRadius: 10 }}
            source={{ uri: photo}}
          />
          <Btn  onPress={() => OnPressToSend()}>
            <ButtonTitle>ENVIAR</ButtonTitle>
          </Btn>
          <LinkCancel onPress={() => setOpenModal(false)}>Refazer</LinkCancel>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    height: "80%",
    width: "100%",
  },
  viewFlip: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  btnFlip: {
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  txtFlip: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  btnCaptura: {
    width: 75,
    height: 75,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  btnFlash: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    flexDirection: "row",
    gap: 55,
    paddingLeft: 15,
    height: 108,
    backgroundColor: "transparent",
    marginTop: 720,
  },
  btnCancel: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: "transparent",

    alignItems: "center",
    justifyContent: "center",
  },

  btnUpload: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: "transparent",

    alignItems: "center",
    justifyContent: "center",
  },
  viewCamera: {
    width: "100%",
    height: "100%",
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 40,
    backgroundColor: "#FFF",
  },
});
