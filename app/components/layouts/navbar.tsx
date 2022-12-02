import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { BaseNav, BaseSwitch, BaseSelect } from "../base";
import { HomeContext } from "~/routes/home";
import Logo from "~/assets/icons/logo.svg";
import { IcRoundArrowBackIos } from "~/assets/icons";
import { Bike } from "~/assets/icons/bike";
import { Parking } from "~/assets/icons/parking";
import { city } from "~/constants/city";
import { useQuery } from "~/hooks/useQuery";

import type { MouseEvent } from "react";
import { ScenicSpot } from "~/assets/icons/scenic-spot";
import { Food } from "~/assets/icons/food";

const NavbarContent = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const { mode, currentCity, setCurrentCity } = useContext(HomeContext);
  const [showBikeRoute, setShowBikeRoute] = useState(false);
  const handleSelectChange = (v: City) => {
    navigate(`?c=${v.City}`);
    setCurrentCity(v);
  };

  useEffect(() => {
    if (query.get("c")) {
      const c = city.find(({ City }) => City === query.get("c"));
      if (c) setCurrentCity(c);
    }
  }, [query, setCurrentCity]);

  if (pathname.match(/bikemap/i))
    return (
      <>
        <BaseNav>
          <>
            <Bike
              className="w-6 h-6 mr-2.5"
              style={{
                color: mode ? "#FED801" : "#000",
              }}
            />
            租車
          </>
          <>
            <Parking
              className="w-6 mr-2.5"
              style={{
                fill: mode ? "#fff" : "#000",
                color: mode ? "#000" : "#FED801",
              }}
            />
            還車
          </>
        </BaseNav>
        <BaseSwitch
          toggle={showBikeRoute}
          setToggle={(v) => setShowBikeRoute(v)}
          // setToggle={(v) => dispatch(setShowBikeRoute(v))}
        />
      </>
    );

  if (pathname.match(/route\/search$/i))
    return (
      <BaseSelect<City>
        placeholder="請選擇縣市"
        value={currentCity}
        options={city}
        text="CityName"
        change={handleSelectChange}
      />
    );

  if (pathname.match(/route\/search\/map/i)) return <>{query.get("q")}</>;

  return (
    <>
      <BaseNav>
        <>
          <ScenicSpot
            className="w-6 mr-2.5"
            style={{
              color: mode ? "#FED801" : "#000",
            }}
          />
          景點
        </>
        <>
          <Food
            className="w-6 mr-2.5"
            style={{
              color: mode ? "#000" : "#FED801",
            }}
          />
          美食
        </>
      </BaseNav>
      <div className="w-[200px]"></div>
    </>
  );
};

const Navbar = () => {
  return (
    <div className="py-3 h-[72px] bg-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-0">
        <Link to="/" className="px-1.5">
          <img src={Logo} alt="Where's youbike" className="hidden lg:block" />
          <IcRoundArrowBackIos className="block lg:hidden" />
        </Link>
        <NavbarContent />
      </div>
    </div>
  );
};

export default Navbar;
