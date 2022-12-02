import { Outlet, useLoaderData } from "@remix-run/react";
import { createContext, useState } from "react";
import Navbar from "~/components/layouts/navbar";

import type { Dispatch, SetStateAction } from "react";
import type { LoaderFunction } from "@remix-run/node";

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

  return (
    <HomeContext.Provider
      value={{
        mode,
        setMode,
        currentCity,
        setCurrentCity,
        bikeRoutes,
        setBikeRoutes,
      }}
    >
      <Navbar />
      <Outlet />
    </HomeContext.Provider>
  );
}

export default Home;
