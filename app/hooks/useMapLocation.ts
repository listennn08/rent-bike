import { useCallback, useEffect, useState } from "react";

import type { LatLngTuple } from "leaflet";
import { getCurrentPosition } from "~/utils";

export default function useMapLocation() {
  const [isFirst, setIsFirst] = useState(true);
  const [userPosition, setUserPosition] = useState<LatLngTuple>();
  const [position, setPosition] = useState<LatLngTuple>();
  const [zoom, setZoom] = useState(16);

  const callback = useCallback(
    (z?: number) =>
      ({ coords }: GeolocationPosition) => {
        const p: LatLngTuple = [coords.latitude, coords.longitude];
        if (
          userPosition &&
          p[0] === userPosition[0] &&
          p[1] === userPosition[1]
        )
          return;
        setUserPosition(p);
        if (typeof z === "number") setZoom(z);
      },
    [userPosition],
  );

  const currentPosition = useCallback(() => {
    getCurrentPosition(callback(18), (e) => console.log(e));
  }, [callback]);

  useEffect(() => {
    currentPosition();
  }, [currentPosition]);

  useEffect(() => {
    if (isFirst) {
      if (userPosition) {
        setPosition(userPosition);
        setIsFirst(false);
      }
    }
  }, [userPosition, isFirst]);

  return {
    position,
    zoom,
    userPosition,
    setPosition,
    setZoom,
    currentPosition,
  };
}
