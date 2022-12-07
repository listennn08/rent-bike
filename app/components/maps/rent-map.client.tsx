import { memo, useContext, useEffect, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { Location } from "~/assets/icons/location";
import BaseIcon from "../base/icon";
import { HomeContext } from "~/routes/home";

import type { LatLngTuple, Popup as PurePopup } from "leaflet";

interface IProps {
  position?: LatLngTuple;
  station: IBikeStation[];
  stationIdx: number;
  openLocate: boolean;
}
const Map = ({ station = [], stationIdx, openLocate }: IProps) => {
  const { mode, userPosition, position, currentPosition, zoom } =
    useContext(HomeContext);
  const map = useMap();
  const popupRefs = useRef<PurePopup[]>([]);

  useEffect(() => {
    if (position) {
      map.flyTo(position, zoom);
    }
  }, [map, position, zoom]);

  useEffect(() => {
    popupRefs.current[stationIdx]?.openOn(map);
  }, [map, stationIdx]);

  const stationMarkers = station.map((el, i) => (
    <Marker
      key={el.StationUID}
      position={[
        el.StationPosition?.PositionLat!,
        el.StationPosition?.PositionLon!,
      ]}
      icon={BaseIcon({
        count: mode ? el.AvailableRentBikes! : el.AvailableReturnBikes!,
        mode,
      })}
    >
      <Popup ref={(r) => (popupRefs.current[i] = r!)}>
        <div className="font-robot leading-6 text-base">
          {el.StationAddress?.Zh_tw}
          <br />
          可借車輛{" "}
          <span className="font-bold italic">{el.AvailableRentBikes}</span>
          <br />
          可停車位{" "}
          <span className="font-bold italic">{el.AvailableReturnBikes}</span>
        </div>
      </Popup>
    </Marker>
  ));

  return (
    <>
      {stationMarkers}
      {userPosition && (
        <Marker
          position={userPosition!}
          icon={BaseIcon({ type: "user", openLocate })}
        />
      )}
      <button
        type="button"
        className="
          text-white bg-black
          px-4 py-2
          rounded-full
          absolute right-4 bottom-14 md:bottom-5.5
          z-999
          flex flex-col items-center justify-center
        "
        onClick={() => currentPosition(18)}
      >
        <Location className="mb-1" />
        <span className="text-xs">附近</span>
      </button>
    </>
  );
};

export default memo(Map);
