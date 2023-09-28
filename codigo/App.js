import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Camera} from 'react-native-pytorch-core';

import classifyImage from './ImageClassifier';

export default function App() {
  const [topClass, setTopClass] = React.useState(
    "Pressione o botão para classificar",
  );

  const [showCamera, setShowCamera] = useState(false)

  async function handleImage(image) {
    const result = await classifyImage(image);
    console.log(result);
    setTopClass(result);
    image.release();
  }
  return (
      <View style={[StyleSheet.absoluteFill, {backgroundColor: '#FFF'}]}>
        { showCamera ?
          <>
            <Camera
              style={StyleSheet.absoluteFill}
              onCapture={handleImage}
            />
            <View style={styles.labelContainer}>
              <Text style={styles.cameraText}>{topClass}</Text>
            </View>
          </> 
          :
          <View style={[styles.view, StyleSheet.absoluteFill]}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>Bem Vindo!</Text>
              <Text style={styles.desc}>Prepare-se para uma jornada de aprendizado interativa, onde cada objeto é uma oportunidade de aprimorar suas habilidades em inglês. O mundo ao seu redor se torna seu livro didático, e cada clique da câmera é uma lição.</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setShowCamera(!showCamera)}>
              <Text style={styles.textButton}>Abrir Camera</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
  )
}

const styles = StyleSheet.create({
  labelContainer: {
    alignItems: 'center',
    padding: 20,
    margin: 20,
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  cameraText: {
    fontSize: 18,
    color: '#000'
  },
  view : {
    alignItems: 'center',
    marginHorizontal: 15,
    justifyContent: 'space-between'
  },
  text: {
    color: '#000',
    fontSize: 46,
    lineHeight: 92,

  },
  button: {
    backgroundColor: '#5CC6BA',
    marginVertical: 35,
    padding: 15,
    width: '90%',
    borderRadius: 30,
    alignItems: 'center'
  },
  textButton: {
    fontSize: 20,
    color: '#FFF'
  },
  desc: {
    color: '#000',
    textAlign: 'justify',
    fontSize: 18,
  },
});