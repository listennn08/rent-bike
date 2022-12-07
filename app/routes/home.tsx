import { Outlet, useLoaderData } from "@remix-run/react";
import { createContext, useState } from "react";
import Navbar from "~/components/layouts/navbar";

import type { Dispatch, SetStateAction } from "react";
import type { LoaderFunction } from "@remix-run/node";
import type { LatLngTuple } from "leaflet";
import useMapLocation from "~/hooks/useMapLocation";

interface ILoaderData {
  mode: boolean;
}

export const loader: LoaderFunction = () => {
  return {
    mode: true,
  };
};

export const HomeContext = createContext<{
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
  currentCity: City;
  setCurrentCity: Dispatch<SetStateAction<City>>;
  bikeRoutes: CustomBikeShape[];
  setBikeRoutes: Dispatch<SetStateAction<CustomBikeShape[]>>;
  userPosition?: LatLngTuple;
  currentPosition: () => void;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
  position?: LatLngTuple;
  setPosition: Dispatch<SetStateAction<LatLngTuple | undefined>>;
}>({
  mode: true,
  setMode: () => {},
  currentCity: {
    CityID: "",
    CityName: "",
    CityCode: "",
    City: "",
    CountyID: "",
  },
  setCurrentCity: () => {},
  bikeRoutes: [],
  setBikeRoutes: () => {},
  currentPosition: () => {},
  zoom: 16,
  setZoom: () => {},
  setPosition: () => {},
});

function Home() {
  const { mode: defaultMode } = useLoaderData<ILoaderData>();
  const [mode, setMode] = useState(defaultMode);
  const [bikeRoutes, setBikeRoutes] = useState<CustomBikeShape[]>([]);
  const [currentCity, setCurrentCity] = useState<City>({
    CityID: "",
    CityName: "",
    CityCode: "",
    City: "",
    CountyID: "",
  });
  const {
    position,
    userPosition,
    currentPosition,
    zoom,
    setZoom,
    setPosition,
  } = useMapLocation();

  return (
    <HomeContext.Provider
      value={{
        mode,
        setMode,
        currentCity,
        setCurrentCity,
        bikeRoutes,
        setBikeRoutes,
        userPosition,
        currentPosition,
        zoom,
        setZoom,
        position,
        setPosition,
      }}
    >
      <Navbar />
      <Outlet />
    </HomeContext.Provider>
  );
}

export default Home;
