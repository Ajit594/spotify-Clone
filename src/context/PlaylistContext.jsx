import { createContext, useState } from "react";

export const PlaylistContext = createContext();

const PlaylistContextProvider = (props) => {
  const [playlists, setPlaylists] = useState([
    {
      id: 0,
      name: "My Favorites",
      songs: [],
    },
  ]);

  const addPlaylist = (name) => {
    const newPlaylist = {
      id: playlists.length,
      name,
      songs: [],
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const removePlaylist = (id) => {
    setPlaylists(playlists.filter((playlist) => playlist.id !== id));
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists(
      playlists.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, songs: [...playlist.songs, song] }
          : playlist
      )
    );
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists(
      playlists.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              songs: playlist.songs.filter((song) => song.id !== songId),
            }
          : playlist
      )
    );
  };

  const contextValue = {
    playlists,
    addPlaylist,
    removePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
  };

  return (
    <PlaylistContext.Provider value={contextValue}>
      {props.children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistContextProvider;
