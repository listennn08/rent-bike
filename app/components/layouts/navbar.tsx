import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { BaseNav, BaseSwitch, BaseSelect } from "../base";
import { HomeContext } from "~/routes/home";
import Logo from "~/assets/icons/logo.svg";
import { IcRoundArrowBackIos } from "~/assets/icons";
import { Bike } from "~/assets/icons/bike";
import { Parking } from "~/assets/icons/parking";
import { ScenicSpot } from "~/assets/icons/scenic-spot";
import { Food } from "~/assets/icons/food";
import { city } from "~/constants/city";
import { useQuery } from "~/hooks/useQuery";

const NavbarContent = () => {
  const { pathname } = useLocation();
  const query = useQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { city: string };
  const { mode, currentCity, setCurrentCity } = useContext(HomeContext);
  const [showBikeRoute, setShowBikeRoute] = useState(false);
  const handleSelectChange = (v: City) => {
    navigate(`?c=${v.City}`, { replace: true });
    setCurrentCity(v);
  };

  useEffect(() => {
    if (state?.city) {
      const c = city.find(({ City }) => City === state.city);
      if (c) setCurrentCity(c);
    }
  }, [state, setCurrentCity]);

  if (pathname.match(/bike\/map/i))
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

  if (pathname.match(/\/search$/i))
    return (
      <BaseSelect<City>
        placeholder="請選擇縣市"
        value={currentCity}
        options={city}
        text="CityName"
        change={handleSelectChange}
      />
    );

  if (pathname.match(/\/search\/map/i)) return <>{query.get("q")}</>;

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
      <div className="w-[200px] flex justify-end">
        <BaseSelect<City>
          placeholder="請選擇縣市"
          value={currentCity}
          options={city}
          text="CityName"
          change={handleSelectChange}
        />
      </div>
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
