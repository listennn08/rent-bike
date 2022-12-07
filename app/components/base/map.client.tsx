import { memo, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { AttractionsIcon } from "./icon";

import type { ReactElement } from "react";
import type { LatLngTuple, Popup as PurePopup } from "leaflet";

interface IProps {
  position?: LatLngTuple;
  children?: ReactElement;
}

export const BaseMap = memo(function BaseMap({ position, children }: IProps) {
  return (
    <MapContainer
      center={position || [24, 121]}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        minHeight: "calc(100vh - 72px)",
        minWidth: "100vw",
      }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // url={`https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${import.meta.env.VITE_MAP_TOKEN}`}
      />
      {children}
    </MapContainer>
  );
});

/**
 * use to control map embed component
 *
 * @param {object} props props
 * @returns
 */
export const InnerMap = memo(function InnerMap({
  bounds,
}: {
  bounds?: LatLngTuple[];
}) {
  const map = useMap();

  useEffect(() => {
    if (bounds) map.flyToBounds(bounds);
  }, [map, bounds]);
  return <></>;
});

/**
 * 控制 map 用的內嵌 component
 *
 * @param {object} props 傳入參數
 * @returns
 */
export const AttractionsInnerMap = memo(function InnerMap({
  bounds,
  addr,
}: {
  bounds: LatLngTuple;
  addr: string;
}) {
  const map = useMap();
  let popupRef = useRef<PurePopup>(null);

  useEffect(() => {
    if (bounds) map.flyTo(bounds, 18);
  }, [bounds, map]);

  return (
    <Marker position={bounds!} icon={AttractionsIcon(addr)}>
      <Popup ref={popupRef}>
        <div className="font-robot leading-6 text-base">{addr || ""}</div>
      </Popup>
    </Marker>
  );
});
