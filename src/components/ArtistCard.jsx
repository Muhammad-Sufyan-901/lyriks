import { useNavigate } from "react-router-dom";

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)} className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <img src={track?.images?.coverart || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkjktNk_waKZ6A064JikKQRYLxoKPNIUR_g&usqp=CAU"} alt="Artist Banner" className="w-full h-56 rounded-lg" />
      <p className="mt-4 font-bold text-lg text-white truncate">{track?.subtitle}</p>
    </div>
  );
};

export default ArtistCard;
