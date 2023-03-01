import * as React from "react";
import { Text, View, StyleSheet, Button, Image, Container } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/Hello.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  //funcio detener sonido
  async function stopSound() {
    await sound.stopAsync();
  }

  return (
    //reproducir el sonido y colocar imagen
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("./assets/maxresdefault.jpg")}
      />
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        Audio con React Native
      </Text>

      <Button title='Reproducir sonido' onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  //centrar imagen
  tinyLogo: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  //espacio entre botones
});
