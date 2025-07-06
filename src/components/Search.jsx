import { useState, useContext } from "react";
import { songsData, albumsData } from "../assets/assets";
import { PlaylistContext } from "../context/PlaylistContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { playlists } = useContext(PlaylistContext);
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
      navigate(`/album/0`); // Navigate to album 0 or implement song play logic
    } else if (item.type === "album") {
      navigate(`/album/${item.data.id}`);
    } else if (item.type === "playlist") {
      navigate(`/playlist/${item.data.id}`);
    }
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
        <div className="mt-2 max-h-60 overflow-auto bg-gray-900 rounded p-2">
          {results.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item)}
              className="cursor-pointer p-1 hover:bg-gray-700 rounded"
            >
              <b>{item.type.toUpperCase()}:</b> {item.data.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
