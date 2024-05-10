import { Image, Modal, StyleSheet, View } from "react-native"
import { Container } from "../Container/Style"
import { useEffect, useRef, useState } from "react"
import { BoxCamera, BtnCapture, BtnFlash, BtnFlip, ConfigBtnCapture, LastPhoto, Options } from "./Style"
import {CameraView, useCameraPermissions } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library'
import { Ionicons } from '@expo/vector-icons';
import { Btn, BtnReturn, BtnReturnPhoto, IconReturn } from "../Button/Button";
import { ButtonTitle } from "../Title/Style";
import { LinkCancel } from "../Link/Style";
import { EvilIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'


export const CameraPhoto = ({ navigation, route }) => {
    const cameraRef = useRef(null)
    const [photo, setPhoto] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [latestPhoto, setLatestPhoto] = useState(null);
    const [facing , setFacing] = useState('back');
    const [permission , requestPermission] = useCameraPermissions();
    async function CapturePhoto() {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync()
            setPhoto(photo.uri)
            setOpenModal(true)

        }
    }

    async function GetLastPhoto(){
        const {assets} = await MediaLibrary.getAssetsAsync({sortBy: [[MediaLibrary.SortBy.creationTime, false]], first : 1})
        if(assets.length > 0){
            setLatestPhoto(assets[0].uri)
        }
    }


    useEffect(() => {
   
        if ( route.params.getMediaLibrary) {
            GetLastPhoto();
        }
    }, [route.params])
    async function onPressToSend() {
        await setOpenModal(false)

        if (route.params.imageProfile) {
            navigation.navigate("Main", { photoUri: photo })
        } else {

            navigation.navigate("SeePrescription", { photoUri: photo })
        }
    }
    async function SelectImageGallery()
    {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });

        if(!result.canceled)
        {
            setPhoto(result.assets[0].uri);
            setOpenModal(true)
           
        }
    }


    return (
        <Container>
            <CameraView
                ref={cameraRef}
                facing={facing}
                style={styles.camera}

            >
                <BtnReturnPhoto onPress={() => navigation.replace("Main")}>
                    <EvilIcons name="close-o" size={70} color="white" />
                </BtnReturnPhoto>
                <BoxCamera>

                    {/* <BtnFlash onPress={() => setFlashOn(flashOn == FlashMode.on ? FlashMode.off : FlashMode.on)}>
                        <Ionicons name={flashOn === FlashMode.on ? "flash" : "flash-off"} size={42} color={flashOn === FlashMode.on ? "yellow" : "white"} />
                    </BtnFlash> */}
               
                    <Options onPress={() => SelectImageGallery()}>
{
    latestPhoto != null ?  (
        <LastPhoto
        source={{uri: latestPhoto}}
        />
    )
    :
    <LastPhoto />
}
                    </Options>

                    <BtnCapture onPress={() => CapturePhoto()}>
                        <ConfigBtnCapture></ConfigBtnCapture>
                    </BtnCapture>

                    <BtnFlip onPress={() => setFacing(facing === 'back' ?  "front" : "back")}>
                        <FontAwesome6 name="camera-rotate" size={45} color="white" />
                    </BtnFlip>

                </BoxCamera>
            </CameraView>


            <Modal
                animationType='slide'
                transparent={false}
                visible={openModal}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 }}>
                    <Image
                        style={{ width: '100%', height: 500, borderRadius: 10 }}
                        source={{ uri: photo }}
                    />
                    <Btn onPress={() => onPressToSend()}>
                        <ButtonTitle >ENVIAR</ButtonTitle>
                    </Btn>

                    <LinkCancel onPress={() => setOpenModal(false)}>Refazer</LinkCancel>
                </View>

            </Modal>
        </Container>
    )
}


const styles = StyleSheet.create({
    camera: {
        flex: 1,
        height: '80%',
        width: '100%',
    }
})