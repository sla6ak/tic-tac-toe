import { Audio } from "expo-av";
import homeMusic from "../musics/Tic_Tac_Toe.mp3";
import moveMusic from "../musics/hod.mp3";
import winMusic from "../musics/pobeda.mp3";
import looseMusic from "../musics/poragenie.mp3";
import drawMusic from "../musics/draw.mp3";

class AudioManager {
  sounds = {
    homeMusic,
    moveMusic,
    winMusic,
    looseMusic,
    drawMusic,
  };
  sound = {};

  playAsync = async (name, isLooping, volume = 1) => {
    try {
      const { sound } = await Audio.Sound.createAsync(this.sounds[name]);
      this.sound[name] = sound;
      await this.sound[name].setIsLoopingAsync(isLooping);
      await this.sound[name].setVolumeAsync(volume);
      await this.sound[name].playAsync();
    } catch (error) {
      // An error occurred!
      console.log("ошибка класса", error);
    }
  };

  stopAsync = async (name) => {
    if (this.sound[name]) {
      try {
        await this.sound[name].stopAsync();
      } catch (error) {
        console.log("ошибка класса", error);
      }
    }
    return;
  };
}

export default new AudioManager();
