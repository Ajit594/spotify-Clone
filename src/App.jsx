import { useContext } from "react"
import Display from "./components/Display"
import Player from "./components/Player"
import Sidebar from "./components/Sidebar"
import { PlayerContext } from "./context/PlayerContext"
import PlaylistContextProvider from "./context/PlaylistContext"

const App = () => {
  const {audioRef,track} = useContext(PlayerContext)
  return (
    <PlaylistContextProvider>
      <div className="h-screen bg-black">
        <div className="h-[90%] flex">
          <Sidebar/>
          <Display/>
        </div>
        <Player/>
        <audio ref={audioRef} src={track.file} preload="auto">

        </audio>
      </div>
    </PlaylistContextProvider>
  )
}

export default App
