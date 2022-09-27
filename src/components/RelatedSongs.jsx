import SongBar from "./SongBar";

const RelatedSongs = ({ data, isPlaying, activeSong, handlePlay, handlePause, artistId }) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs :</h1>

      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, index) => (
          <SongBar key={`${song.key}-${artistId}`} song={song} i={index} artistId={artistId} isPlaying={isPlaying} activeSong={activeSong} handlePlayClick={handlePlay} handlePauseClick={handlePause} />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
