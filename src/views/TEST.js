import React from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

function MusicPlayer() {
    const audioList1 = [
        {
            name: 'Background Music',
            cover: 'http://127.0.0.1:5000/Melody',
            musicSrc: 'http://127.0.0.1:5000/Music/2',
        }
    ];


    const options = {
        audioLists: audioList1,
        defaultPlayIndex: 0,
        theme: 'dark',
        bounds: 'body',
        clearPriorAudioLists: false,
        autoPlayInitLoadPlayList: false,
        preload: false,
        glassBg: false,
        remember: false,
        remove: true,
        defaultPosition: {
            top: 300,
            left: 120,
        },
        defaultPlayMode: 'singleLoop',
        mode: 'mini',
        once: false,
        autoPlay: true,
        toggleMode: true,
        showMiniModeCover: true,
        showMiniProcessBar: false,
        drag: true,
        seeked: true,
        showProgressLoadBar: true,
        showPlay: true,
        showReload: false,
        showDownload: false,
        showPlayMode: false,
        showDestroy: true,
        extendsContent: [],
        defaultVolume: 0.2,
        playModeShowTime: 600,
        loadAudioErrorPlayNext: true,
        autoHiddenCover: false,
        spaceBar: true,

    };

    return (
        <ReactJkMusicPlayer {...options}/>
    );
}

export default MusicPlayer;