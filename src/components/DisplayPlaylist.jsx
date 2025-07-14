import { useParams } from "react-router-dom";
import { useContext } from "react";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";
import Navbar from "./Navbar";

const DisplayPlaylist = () => {
  const { id } = useParams();
  const { playlists, removeSongFromPlaylist } = useContext(PlaylistContext);
  const { playWithId } = useContext(PlayerContext);
  
  const playlist = playlists.find(p => p.id === parseInt(id));
  
  if (!playlist) {
    return (
      <div>
        <Navbar />
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold">Playlist not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <div className="w-48 h-48 bg-gradient-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center">
          <img className="w-16" src={assets.stack_icon} alt="playlist" />
        </div>
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{playlist.name}</h2>
          <h4>Your custom playlist</h4>
          <p className="mt-1">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
            <b> Spotify </b>
            • <b>{playlist.songs.length} songs</b>
          </p>
        </div>
      </div>
      
      {playlist.songs.length > 0 ? (
        <>
          <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
            <p><b className="mr-4">#</b>Title</p>
            <p>Artist</p>
            <p className="hidden sm:block">Date Added</p>
            <img className="m-auto w-4" src={assets.clock_icon} alt="" />
          </div>
          <hr />
          {playlist.songs.map((song, index) => (
            <div key={`${song.id}-${index}`} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer group">
              <div onClick={() => playWithId(song.id)} className="text-white text-sm md:text-[15px]">
                <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                <img className="inline w-10 mb-5 mr-5" src={song.image} alt={song.name} />
                <div className="inline-block">
                  <div>{song.name.slice(0, 20)}</div>
                  <div className="text-[#a7a7a7]">{song.desc.slice(0, 20)}</div>
                </div>
              </div>
              <p className="text-[15px]">{song.desc}</p>
              <p className="text-[15px] hidden sm:block">Recently added</p>
              <div className="flex items-center justify-between">
                <p className="text-[15px]">{song.duration}</p>
                <button
                  onClick={() => removeSongFromPlaylist(playlist.id, song.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 ml-2"
                  title="Remove from playlist"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="mt-10 text-center text-[#a7a7a7]">
          <h3 className="text-xl mb-4">Your playlist is empty</h3>
          <p>Search for songs and add them to this playlist</p>
        </div>
      )}
    </div>
  );
};

export default DisplayPlaylist;