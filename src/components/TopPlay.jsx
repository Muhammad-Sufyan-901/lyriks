import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({ song, index, isPlaying, activeSong, handlePauseOnClick, handlePlayOnClick }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img src={song?.images?.coverart} alt={song?.title} className="w-20 h-20 rounded-lg" />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause isPlaying={isPlaying} song={song} activeSong={activeSong} handlePause={handlePauseOnClick} handlePlay={() => handlePlayOnClick(song, index)} />
  </div>
);

const TopPlay = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const dispatch = useDispatch();
  const ref = useRef(null);

  const topPlays = data?.slice(0, 5);

  const handlePauseOnClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayOnClick = (song, index) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    });
  });

  return (
    <div ref={ref} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, index) => (
            <TopChartCard key={song.key} song={song} index={index} isPlaying={isPlaying} activeSong={activeSong} handlePlayOnClick={handlePlayOnClick} handlePauseOnClick={handlePauseOnClick} />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        <Swiper modules={[FreeMode]} spaceBetween={15} slidesPerView="auto" className="mt-4" freeMode centeredSlides centeredSlidesBounds>
          {topPlays?.map((song) => (
            <SwiperSlide key={song?.key} style={{ width: "25%", height: "auto" }} className="shadow-lg rounded-full animate-slideright">
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img src={song?.images.background} alt="Top Artists Banner" className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
