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
import { getResturant, getScenicSpot } from "~/api";
import { getCurrentPosition } from "~/utils";

import type { Dispatch, SetStateAction } from "react";
import type { LatLngTuple } from "leaflet";

export const AttractionsContext = createContext<{
  attractions: {
    [k: string]: TourismInfo[];
  };
  setAttractions: Dispatch<
    SetStateAction<{
      [k: string]: TourismInfo[];
    }>
  >;
  position: LatLngTuple;
  setPosition: Dispatch<SetStateAction<LatLngTuple>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}>({
  attractions: {
    resturants: [],
    scenicSpots: [],
  },
  setAttractions: () => {},
  position: [0, 0],
  setPosition: () => {},
  type: "resturants",
  setType: () => {},
  isLoading: false,
});

const Attractions = () => {
  const { mode } = useContext(HomeContext);
  const [attractions, setAttractions] = useState<{
    [k: string]: TourismInfo[];
  }>({
    resturants: [],
    scenicSpots: [],
  });
  const [position, setPosition] = useState<LatLngTuple>([24, 121]);
  const [type, setType] = useState("resturants");
  const [firstLoading, setFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNearAttractions = useCallback(async () => {
    setIsLoading(true);
    const resturantResp = (
      await getResturant({
        spatialFilter: `nearby(${position[0]}, ${position[1]}, 1000)`,
      })
    ).data;

    const scenicSpotResp = (
      await getScenicSpot({
        spatialFilter: `nearby(${position[0]}, ${position[1]}, 1000)`,
      })
    ).data;

    setAttractions({
      resturants: resturantResp,
      scenicSpots: scenicSpotResp,
    });
    setIsLoading(false);
  }, [position]);

  const callback = useCallback(
    (z?: number) =>
      ({ coords }: GeolocationPosition) => {
        const p: LatLngTuple = [coords.latitude, coords.longitude];
        console.log(p);
        if (p[0] === position[0] && p[1] === position[1]) return;
        setPosition(p);
        //   dispatch(setUserPosition(p))
        //   dispatch(setOpenLocate(true))
        //   if (typeof z === 'number') dispatch(setZoom(z))
      },
    [position],
  );

  const currentPosition = useCallback(() => {
    getCurrentPosition(callback(18), (e) => console.log(e));
  }, [callback]);

  useEffect(() => {
    setType(mode ? "resturants" : "scenicSpots");
  }, [mode]);

  // useEffect(() => {
  //   if (!firstLoading) fetchNearAttractions();
  //   setFirstLoading(false);
  // }, [firstLoading, fetchNearAttractions, setFirstLoading]);

  useEffect(() => {
    currentPosition();
  }, [currentPosition]);

  return (
    <AttractionsContext.Provider
      value={{
        attractions,
        setAttractions,
        position,
        setPosition,
        type,
        setType,
        isLoading,
      }}
    >
      <Outlet />
    </AttractionsContext.Provider>
  );
};

export default memo(Attractions);
