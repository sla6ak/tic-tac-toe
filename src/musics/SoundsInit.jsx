import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { moveMusicStatus } from "../redux/audioManager";
import { Audio, InterruptionModeAndroid } from "expo-av";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import drawM from "../musics/draw.mp3";
import winM from "../musics/pobeda.mp3";
import looseM from "../musics/poragenie.mp3";
import homeM from "../musics/Tic_Tac_Toe.mp3";
import moveM from "../musics/hod.mp3";

const SoundsInit = ({ children }) => {
  const setPlayer = {
    staysActiveInBackground: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
    playThroughEarpieceAndroid: true,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [arrSongs, setArrSongs] = useState({
    drawM,
    winM,
    looseM,
    homeM,
    moveM,
  });
  const [arrLoadedSongs, setArrLoadedSongs] = useState({});
  const { drawMusic, looseMusic, winMusic, homeMusic, moveMusic } = useSelector(
    (state) => state.audioManager
  );
  const dispatch = useDispatch();
  useEffect(() => {
    Audio.setAudioModeAsync(setPlayer);
    return;
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const loadingSongs = async () => {
      for (key in arrSongs) {
        const { sound } = await Audio.Sound.createAsync(arrSongs[key]);
        setArrLoadedSongs((prevSt) => {
          return { ...prevSt, [key]: sound };
        });
      }
    };
    try {
      loadingSongs();
    } catch (error) {
      console.log("loading error");
    }
  }, []);

  useEffect(() => {
    if (Object.keys(arrSongs).length === Object.keys(arrLoadedSongs).length)
      setIsLoading(true);
  }, [arrLoadedSongs]);

  useEffect(() => {
    if (!isLoading) return;
    try {
      (async () => {
        if (homeMusic) {
          const status = await arrLoadedSongs.homeM.getStatusAsync();
          if (status.isPlaying) {
            return;
          }
          await arrLoadedSongs.homeM.setVolumeAsync(1);
          await arrLoadedSongs.homeM.setIsLoopingAsync(true);
          await arrLoadedSongs.homeM.playAsync();
          return;
        }
        if (!homeMusic) {
          await arrLoadedSongs.homeM.stopAsync();
          return;
        }
      })();
    } catch (error) {
      console.log("error homeMusic");
    }
  }, [homeMusic]);

  useEffect(() => {
    if (!isLoading) return;
    try {
      (async () => {
        if (moveMusic) {
          await arrLoadedSongs.moveM.playAsync();
          dispatch(moveMusicStatus(false));
        } else {
          await arrLoadedSongs.moveM.stopAsync();
        }
      })();
    } catch (error) {
      console.log("error moveMusic");
    }
  }, [moveMusic]);

  useEffect(() => {
    if (!isLoading) return;
    try {
      (async () => {
        if (winMusic) {
          await arrLoadedSongs.winM.playAsync();
        } else {
          await arrLoadedSongs.winM.stopAsync();
        }
      })();
    } catch (error) {
      console.log("error winMusic");
    }
  }, [winMusic]);

  useEffect(() => {
    if (!isLoading) return;
    try {
      (async () => {
        if (looseMusic) {
          await arrLoadedSongs.looseM.playAsync();
        } else {
          await arrLoadedSongs.looseM.stopAsync();
        }
      })();
    } catch (error) {
      console.log("error looseMusic");
    }
  }, [looseMusic]);

  useEffect(() => {
    if (!isLoading) return;
    try {
      (async () => {
        if (drawMusic) {
          await arrLoadedSongs.drawM.playAsync();
        } else {
          await arrLoadedSongs.drawM.stopAsync();
        }
      })();
    } catch (error) {
      console.log("error drawMusic");
    }
  }, [drawMusic]);

  return isLoading ? (
    <>{children}</>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator
        style={[styles.spinner, {}]}
        size="large"
        color="#00ff00"
      />
    </View>
  );
};

export default SoundsInit;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  spinner: {
    width: 60,
    height: 60,
    borderRadius: 70,
    borderColor: "indigo",
    borderTopWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 4,
    borderLeftWidth: 2,
  },
});
