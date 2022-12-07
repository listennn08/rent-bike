import { Link } from "@remix-run/react";
import Lottie from "lottie-react";
import YouBikeAnimation from "~/assets/icons/youbike.json";
import Logo from "~/assets/icons/logo.svg";

export default function Index() {
  const routes = [
    {
      path: "bike/map",
      text: "尋找  Youbike",
    },
    {
      path: "search",
      text: "查詢自行車道",
    },
    {
      path: "attractions",
      text: "查詢景點、美食",
    },
  ];

  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen relative bg-primary">
      <div className="mb-[106px] md:mb-[272px] lg:mb-[116px]">
        <Lottie
          animationData={YouBikeAnimation}
          loop
          style={{
            width: "119px",
            height: "75px",
          }}
        />
        <img
          src={Logo}
          alt=""
          style={{ width: "245px", height: "47px" }}
          className="transform -translate-y-2"
        />
        <p className="tracking-[10px] text-center">微笑單車．暢遊城市</p>
      </div>
      {routes.map(({ path, text }) => (
        <Link
          to={`/home/${path}`}
          key={path}
          className="
            font-normal
            rounded-[10px]
            py-[12px] mb-[18px]
            w-[244px]
            flex items-center justify-center
            border-2 border-black
            bg-primary hover:bg-black
            text-black hover:text-primary
            transition-all
            hover:shadow-lg
          "
        >
          {text}
        </Link>
      ))}
      <p className="absolute lg:right-10 bottom-4 md:bottom-5 text-xs">
        Where’s YouBike © Code:{" "}
        <a href="https://github.com/listennn08" className="underline">
          Matt
        </a>{" "}
        / Design:{" "}
        <a href="https://www.behance.net/KT_Designer" className="underline">
          KT
        </a>
      </p>
    </div>
  );
}
