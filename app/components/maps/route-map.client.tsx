import { memo, useContext, useEffect, useState } from "react";
import { Marker, Polyline, Popup } from "react-leaflet";
import { useQuery } from "~/hooks/useQuery";
import BaseIcon from "~/components/base/icon";
import { BaseMap, InnerMap } from "~/components/base/map.client";
import { RouteContext } from "~/routes/home/search";

import type { LatLngTuple } from "leaflet";

interface IProps {
  position: LatLngTuple;
  bikeRoutes: CustomBikeShape[];
}

const RouteMap = ({ position, bikeRoutes }: IProps) => {
  const query = useQuery();
  const [currentRoute, setCurrentRoute] = useState<CustomBikeShape>();
  const { setPosition } = useContext(RouteContext);

  useEffect(() => {
    const findRoute = bikeRoutes.find((el) => el.RouteName === query.get("q"));
    if (findRoute) setCurrentRoute(findRoute);
  }, [query, bikeRoutes]);

  useEffect(() => {
    if (currentRoute?.geo) {
      setPosition(currentRoute?.geo[0]);
    }
  }, [currentRoute, setPosition]);

  return (
    <BaseMap position={position}>
      <>
        <InnerMap bounds={currentRoute?.geo} />
        {!currentRoute ? (
          <></>
        ) : (
          <>
            <Marker
              position={currentRoute?.geo![0]}
              icon={BaseIcon({ text: "始", type: "bike" })}
            >
              <Popup>
                <div className="font-robot leading-6 text-base">
                  路線名稱{" "}
                  <span className="ml-2 font-bold italic">
                    {currentRoute.RouteName}
                  </span>
                  <br />
                  開始{" "}
                  <span className="ml-2 font-bold italic">
                    {currentRoute.RoadSectionStart}
                  </span>
                  <br />
                  {currentRoute.Direction}
                </div>
              </Popup>
            </Marker>
            <Marker
              position={currentRoute.geo![currentRoute.geo!.length - 1]}
              icon={BaseIcon({ text: "終", type: "bike" })}
            >
              <Popup>
                <div className="font-robot leading-6 text-base">
                  路線名稱{" "}
                  <span className="ml-2 font-bold italic">
                    {currentRoute.RouteName}
                  </span>
                  <br />
                  結束{" "}
                  <span className="ml-2 font-bold italic">
                    {currentRoute.RoadSectionEnd}
                  </span>
                  <br />
                  {currentRoute.Direction}
                </div>
              </Popup>
            </Marker>
            <Polyline
              color="black"
              dashArray="20, 10"
              positions={currentRoute.geo!}
            />
          </>
        )}
      </>
    </BaseMap>
  );
};

export default memo(RouteMap);
