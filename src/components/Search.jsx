import { useState, useContext } from "react";
import { songsData, albumsData } from "../assets/assets";
import { PlaylistContext } from "../context/PlaylistContext";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(null);
  const { playlists, addSongToPlaylist } = useContext(PlaylistContext);
  const { playWithId } = useContext(PlayerContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setQuery(q);

    if (q === "") {
      setResults([]);
      return;
    }

    const songResults = songsData.filter(
      (song) =>
        song.name.toLowerCase().includes(q) ||
        song.desc.toLowerCase().includes(q)
    );

    const albumResults = albumsData.filter(
      (album) =>
        album.name.toLowerCase().includes(q) ||
        album.desc.toLowerCase().includes(q)
    );

    const playlistResults = playlists.filter((playlist) =>
      playlist.name.toLowerCase().includes(q)
    );

    setResults([
      ...songResults.map((item) => ({ type: "song", data: item })),
      ...albumResults.map((item) => ({ type: "album", data: item })),
      ...playlistResults.map((item) => ({ type: "playlist", data: item })),
    ]);
  };

  const handleClick = (item) => {
    if (item.type === "song") {
      playWithId(item.data.id);
    } else if (item.type === "album") {
      navigate(`/album/${item.data.id}`);
    } else if (item.type === "playlist") {
      navigate(`/playlist/${item.data.id}`);
    }
  };

  const handleAddToPlaylist = (song, playlistId) => {
    addSongToPlaylist(playlistId, song);
    setShowPlaylistMenu(null);
  };

  return (
    <div className="p-4 text-white">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search songs, albums, playlists..."
        className="w-full p-2 rounded bg-gray-800 text-white"
      />
      {results.length > 0 && (
        <div className="mt-4 space-y-2">
          {results.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-800 rounded hover:bg-gray-700"
            >
              <div
                onClick={() => handleClick(item)}
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <img
                  className="w-12 h-12 rounded"
                  src={item.data.image || "/default-image.jpg"}
                  alt={item.data.name}
                />
                <div>
                  <p className="font-semibold">{item.data.name}</p>
                  <p className="text-sm text-gray-400">
                    {item.type.toUpperCase()} • {item.data.desc || ""}
                  </p>
                </div>
              </div>
              {item.type === "song" && (
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPlaylistMenu(showPlaylistMenu === index ? null : index);
                    }}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Add to Playlist
                  </button>
                  {showPlaylistMenu === index && (
                    <div className="absolute right-0 mt-1 bg-gray-800 border border-gray-600 rounded shadow-lg z-10">
                      {playlists.map((playlist) => (
                        <button
                          key={playlist.id}
                          onClick={() => handleAddToPlaylist(item.data, playlist.id)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                        >
                          {playlist.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
