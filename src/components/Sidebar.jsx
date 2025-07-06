import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { PlaylistContext } from "../context/PlaylistContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { playlists, addPlaylist } = useContext(PlaylistContext);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() !== "") {
      addPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
      setShowInput(false);
    }
  };

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div onClick={() => navigate("/")} className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.home_icon} alt="" />
          <p className="font-bold">Home</p>
        </div>
        <div onClick={() => navigate("/search")} className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.search_icon} alt="" />
          <p className="font-bold">Search</p>
        </div>
      </div>
      <div className="bg-[#121212] h-[85%] rounded overflow-auto">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="stack_icon" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img
              onClick={() => setShowInput(!showInput)}
              className="w-5 cursor-pointer"
              src={assets.plus_icon}
              alt="plus_icon"
              title="Create Playlist"
            />
            <img className="w-5" src={assets.arrow_icon} alt="arrow_icon" />
          </div>
        </div>
        {showInput && (
          <div className="p-4 m-2 rounded bg-[#242424] flex flex-col gap-2">
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="New playlist name"
              className="p-2 rounded text-black"
            />
            <button
              onClick={handleCreatePlaylist}
              className="px-4 py-1.5 bg-white text-black rounded-full"
            >
              Create
            </button>
          </div>
        )}
        <div className="flex flex-col gap-2 p-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              className="cursor-pointer hover:text-green-500"
            >
              {playlist.name}
            </div>
          ))}
        </div>
        {/* Removed old static playlist and podcast sections */}
        {/* <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <h1>Create Your first playlist</h1>
          <p className="font-light">it's easy we will help you</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Create Playlist</button>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">We'll keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">Browse podcasts</button>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
