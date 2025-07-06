import { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    track,
    time,
    previous,
    next,
    seekSong,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    volume,
    changeVolume,
  } = useContext(PlayerContext);

  return (
    <div
      className="h-[10%] bg-black flex justify-between items-center
    text-white px-4"
    >
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="song_Data" />
        <div>
          <p>{track.name}</p>
          <p className="">{track.desc.slice(0, 43)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            onClick={() => setShuffle(!shuffle)}
            className={`w-4 cursor-pointer ${shuffle ? "text-green-500" : ""}`}
            src={assets.shuffle_icon}
            alt="shuffle"
            title="Shuffle"
          />
          <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="previous" />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt="pause"
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt="play"
            />
          )}

          <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="next" />
          <img
            onClick={() => setRepeat(!repeat)}
            className={`w-4 cursor-pointer ${repeat ? "text-green-500" : ""}`}
            src={assets.loop_icon}
            alt="repeat"
            title="Repeat"
          />
        </div>
        <div className="flex items-center gap-5">
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon} alt="" />
        <img className="w-4" src={assets.mic_icon} alt="" />
        <img className="w-4" src={assets.queue_icon} alt="" />
        <img className="w-4" src={assets.speaker_icon} alt="" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => changeVolume(parseFloat(e.target.value))}
          className="w-20"
          title="Volume"
        />
        <img className="w-4" src={assets.mini_player_icon} alt="" />
        <img className="w-4" src={assets.zoom_icon} alt="" />
      </div>
    </div>
  );
};

export default Player;
