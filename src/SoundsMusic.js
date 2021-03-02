import React from 'react';
import birds from './birds.mp3';
import sound from './sound.mp3';
import './SoundsMusic.css';
import { useState, useEffect } from "react";

export default function SoundsMusic(props) {
  const audioMusic = document.getElementById('audio-music');
  const audioSound = document.getElementById('audio-sound');
  let [volumeSound, setVolume] = useState('0');
  let [valueMusic, setValueMusic] = useState('0');
  let [valueSound, setValueSound] = useState('0');
  let [musicOff, setMusicOff] = useState('x');
  let [soundOff, setSoundOff] = useState('x');

  function handleMusicClick(e) {
    if (e.target.value !== e.target.min) {
      setMusicOff('');
    }
    if (e.target.value === e.target.min) {
      setMusicOff('x');
      audioMusic.pause();
    } else {
      audioMusic.play();
      audioMusic.volume = e.target.value / 10;
    }
  }

  function handleSoundClick(e) {
    if (e.target.value !== e.target.min) {
      setSoundOff('');
    }
    if (e.target.value === e.target.min) {
      setSoundOff('x');
      setVolume(e.target.value / 10);
      audioSound.pause();
    } else if (e.target.value === e.target.max) {
      audioSound.play();
      setVolume(e.target.value / 10);
    }
    setVolume(e.target.value / 10);
    audioSound.play();
    audioSound.volume = e.target.value / 10;
  }

  // setting data to and getting from sessionStorage
  useEffect(() => {
    const dataMusicSoundSaved = JSON.parse(sessionStorage.getItem('dataMusicSound'));
    if (dataMusicSoundSaved) {
      setVolume(dataMusicSoundSaved.volumeSound);
      setValueMusic(dataMusicSoundSaved.value);
      setValueSound(dataMusicSoundSaved.valueSound);
      setMusicOff(dataMusicSoundSaved.musicOff);
      setSoundOff(dataMusicSoundSaved.soundOff);
    }
  }, []);

  useEffect(() => {
    const valuesToSave = { volumeSound, value: valueMusic, valueSound, musicOff, soundOff };
    sessionStorage.setItem('dataMusicSound', JSON.stringify(valuesToSave));
  })

  return (
    <div className="sounds-statistic">
      <div className="sound-control">
        <audio volume="" loop id="audio-music" src={birds}></audio>
        <p className='sound-control__music'>Music<span className="sound-control__Off">{musicOff}</span></p>
        <input id="range" min="0" max="10" type="range" value={valueMusic} name="range" step="1" onLoad={handleMusicClick} onClick={handleMusicClick} onChange={(e) => setValueMusic(valueMusic = e.target.value)}></input>


        <audio id="audio-sound" volume={volumeSound} src={sound}></audio>
        <p className='sound-control__sound'>Sound<span className="sound-control__Off">{soundOff}</span></p>
        <input id="range" min="0" max="10" type="range" value={valueSound} name="range" step="1" onInput={(e) => setValueSound(valueSound = e.target.valueSound)} onClick={handleSoundClick} onChange={(e) => setValueSound(valueSound = e.target.valueSound)}></input>
      </div>
    </div>
  );
}


  //class component
//   import React from 'react';
// import mozart from './mozart.mp3';

// export default class SoundsMusic extends React.Component {
//   constructor (props) {
//     super(props);
//     this.music = this.music.bind(this);
//   }

// music (e) {
//     const audio = document.getElementById('audio');
//     // const range = e.target;
//     // audio.volume = audio.volume + 1;
//     console.log(audio);
//       if (e.target.value === e.target.min){
//         audio.pause();
//       } else if(e.target.value === e.target.max){
//         audio.play();
//       }
//     }


//   render (){
//       return (
//         <div className="sound-control">
//           <audio autoPlay loop id="audio" controls src={ mozart }></audio>
//           <input id="range" min="0" max="10" type="range" name="range" step="1" onChange={this.music}></input>
//         </div>
//       );
//       }
  // }

