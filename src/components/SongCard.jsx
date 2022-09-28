import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";

const SongCard = ({ song, index, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();

  const handlePauseOnClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayOnClick = () => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? "flex bg-black bg-opacity-70" : "hidden"}`}>
          <PlayPause song={song} handlePause={handlePauseOnClick} handlePlay={handlePlayOnClick} isPlaying={isPlaying} activeSong={activeSong} />
        </div>
        <img src={song.images?.coverart || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkjktNk_waKZ6A064JikKQRYLxoKPNIUR_g&usqp=CAU"} alt="Song Cover" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : `/top-artists`}>{song.subtitle}</Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
