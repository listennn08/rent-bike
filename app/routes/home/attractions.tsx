import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Outlet } from "@remix-run/react";

import { HomeContext } from "../home";
import { getRestaurant, getScenicSpot } from "~/api";

import type { Dispatch, SetStateAction } from "react";

const LIMIT_NUMBER = 51;
export const AttractionsContext = createContext<{
  attractions: {
    [k: string]: TourismInfo[];
  };
  setAttractions: Dispatch<
    SetStateAction<{
      [k: string]: TourismInfo[];
    }>
  >;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  offset: number;
  setOffet: Dispatch<SetStateAction<number>>;
}>({
  attractions: {
    restaurants: [],
    scenicSpots: [],
  },
  setAttractions: () => {},
  type: "scenicSpots",
  setType: () => {},
  isLoading: false,
  offset: 0,
  setOffet: () => {},
});

const Attractions = () => {
  const { mode, currentCity } = useContext(HomeContext);
  const [offset, setOffet] = useState(0);
  const [attractions, setAttractions] = useState<{
    [k: string]: TourismInfo[];
  }>({
    restaurants: [],
    scenicSpots: [],
  });
  const [type, setType] = useState("scenicSpots");
  const [isLoading, setIsLoading] = useState(false);

  const fetchNearAttractions = useCallback(async () => {
    if (!currentCity.City) return;
    setIsLoading(true);

    if (type === "restaurants") {
      const restaurantResp = (
        await getRestaurant(currentCity.City, {
          skip: offset * LIMIT_NUMBER,
          top: LIMIT_NUMBER,
        })
      ).data;
      setAttractions((p) => ({
        ...p,
        restaurants: p.restaurants.concat(restaurantResp),
      }));
    } else if (type === "scenicSpots") {
      const scenicSpotResp = (
        await getScenicSpot(currentCity.City, {
          skip: offset * LIMIT_NUMBER,
          top: LIMIT_NUMBER,
        })
      ).data;
      setAttractions((p) => ({
        ...p,
        scenicSpots: p.scenicSpots.concat(scenicSpotResp),
      }));
    }

    setIsLoading(false);
  }, [currentCity, type, offset]);

  useEffect(() => {
    setType(mode ? "scenicSpots" : "restaurants");
  }, [mode]);

  useEffect(() => {
    fetchNearAttractions();
  }, [fetchNearAttractions]);

  return (
    <AttractionsContext.Provider
      value={{
        attractions,
        setAttractions,
        type,
        setType,
        isLoading,
        offset,
        setOffet,
      }}
    >
      <Outlet />
    </AttractionsContext.Provider>
  );
};

export default memo(Attractions);
