import {
  memo,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import { Outlet } from "@remix-run/react";
import { getBikeRoute } from "~/api";
import { HomeContext } from "~/routes/home";

import type { Dispatch, SetStateAction } from "react";
import type { LatLngTuple } from "leaflet";

export const RouteContext = createContext<{
  position: LatLngTuple;
  setPosition: Dispatch<SetStateAction<LatLngTuple>>;
}>({
  position: [24, 121],
  setPosition: () => {},
});

const Search = () => {
  const { currentCity, setBikeRoutes } = useContext(HomeContext);
  const [position, setPosition] = useState<LatLngTuple>([24, 121]);

  const fetchBikeRoute = useCallback(async () => {
    if (currentCity.City) {
      const resp = await getBikeRoute(currentCity.City);
      setBikeRoutes(resp);
    }
  }, [currentCity, setBikeRoutes]);

  useEffect(() => {
    fetchBikeRoute();
  }, [fetchBikeRoute]);

  return (
    <RouteContext.Provider value={{ position, setPosition }}>
      <Outlet />
    </RouteContext.Provider>
  );
};

export default memo(Search);
