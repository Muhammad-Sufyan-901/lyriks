import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetRelatedSongsQuery, useGetSongDetailsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
  const { data, isFetching: isFetchingRelatedSongs, error } = useGetRelatedSongsQuery({ songid });
  const dispatch = useDispatch();

  const handlePauseOnClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayOnClick = (song, index) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching Song Details" />;

  if (error) return <Error />;

  if (songData?.sections !== undefined) {
    return (
      <div className="flex flex-col">
        <DetailsHeader artistsId="" songData={songData} />
        <div className="mb-10">
          <h2 className="text-white text-3xl font-bold">Lyrics :</h2>

          <div className="mt-5">
            {songData?.sections[1].type === "LYRICS" ? (
              songData?.sections[1]?.text.map((lyrics, index) => (
                <p key={index} className="text-gray-400 text-base my-1">
                  {lyrics}
                </p>
              ))
            ) : (
              <p className="text-gray-400 text-base my-1">Sorry, No Lyrics Found!</p>
            )}
          </div>
        </div>

        <RelatedSongs data={data} isPlaying={isPlaying} activeSong={activeSong} handlePlay={handlePlayOnClick} handlePause={handlePauseOnClick} />
      </div>
    );
  } else {
    return <Error />;
  }
};

export default SongDetails;
