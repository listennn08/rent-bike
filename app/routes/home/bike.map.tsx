import { memo, useCallback, useContext, useEffect, useState } from "react";
import { Bike } from "~/assets/icons/bike";
import { Parking } from "~/assets/icons/parking";
import { MajesticonsSearchLine } from "~/assets/icons";
import { BaseMap } from "~/components/base/map.client";
import Map from "~/components/maps/rent-map.client";
import BaseAutoComplete from "~/components/base/auto-complete";
import { ClientOnly } from "~/components/client-only";
import { HomeContext } from "../home";
import { getNearStation, getNearStationAvailability } from "~/api";
import { getCurrentPosition } from "~/utils";
import leafletStyle from "leaflet/dist/leaflet.css";

import type { MouseEvent } from "react";
import type { LatLngTuple } from "leaflet";

import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: leafletStyle,
  },
];

const Bikemap = () => {
  const { mode, setMode, position, setPosition, setZoom } =
    useContext(HomeContext);
  const [result, setResult] = useState<IBikeStation>();
  const [station, setStation] = useState<IBikeStation[]>([]);
  const [stationIdx, setStationIdx] = useState(-1);
  const [openLocate, setOpenLocate] = useState(false);

  const handlerClick = (e: MouseEvent, value: boolean) => {
    e.preventDefault();
    setMode(value);
  };

  const onChange = (v: IBikeStation) => setResult(v);

  const search = useCallback(() => {
    if (result) {
      setPosition([
        result?.StationPosition?.PositionLat!,
        result?.StationPosition?.PositionLon!,
      ]);

      const idx = station.findIndex(
        (el) => el.StationUID === result?.StationUID,
      );
      setStationIdx(idx);
    }
  }, [result, station, setPosition]);

  /**
   * 取得附近站點
   *
   * @param lat 緯度
   * @param lng 經度
   * @param range 範圍（公尺）
   */
  const fetchNearStationData = useCallback(
    async (lat: number, lng: number, range: number = 1000) => {
      const stationResp: IBikeStation[] = (
        await getNearStation({
          spatialFilter: `nearby(${lat}, ${lng}, ${range})`,
        })
      ).data;
      const availabilityResp: IBikeAvailability[] = (
        await getNearStationAvailability({
          spatialFilter: `nearby(${lat}, ${lng}, ${range})`,
        })
      ).data;

      for (let i = 0; i < stationResp.length; i += 1) {
        const stationStatus = availabilityResp.find(
          (el) => el.StationUID === stationResp[i].StationUID,
        );
        if (stationStatus) {
          stationResp[i] = {
            ...stationResp[i],
            ...stationStatus,
          };
        }
      }

      setStation(stationResp);
    },
    [setStation],
  );

  /**
   * 回呼函數
   *
   * @param z 縮放大小
   * @returns N/A
   */
  const callback = useCallback(
    (z?: number) =>
      ({ coords }: GeolocationPosition) => {
        const p: LatLngTuple = [coords.latitude, coords.longitude];
        setPosition(p);
        setOpenLocate(true);

        if (typeof z === "number") setZoom(z);
        fetchNearStationData(...p);
      },
    [fetchNearStationData, setPosition, setZoom],
  );

  // 取得現在位置
  const currentPosition = useCallback(
    (z?: number) => {
      getCurrentPosition(callback(z), (blocked) => {
        console.log(blocked);
      });
    },
    [callback],
  );

  useEffect(() => {
    currentPosition();
  }, [currentPosition]);

  useEffect(() => {
    if (position) fetchNearStationData(position[0], position[1]);
  }, [position, fetchNearStationData]);

  return (
    <div className="relative">
      <ClientOnly>
        {() => (
          <BaseMap position={position}>
            <Map
              position={position}
              station={station}
              stationIdx={stationIdx}
              openLocate={openLocate}
            />
          </BaseMap>
        )}
      </ClientOnly>
      <div className="absolute z-999 top-[22px] left-1/2 transform -translate-x-1/2 flex">
        <BaseAutoComplete
          value={result}
          onChange={onChange}
          options={station}
        />
        <button
          type="button"
          className="text-white bg-black p-2.5 rounded-lg flex items-center justify-center focus:outline-none"
          onClick={search}
        >
          <MajesticonsSearchLine className="text-lg" />
        </button>
      </div>
      <div className="fixed bottom-0 inset-x-0 md:hidden bg-primary z-999 flex">
        <button
          className={`
            w-1/2
            flex items-center justify-center
            px-5 py-3
            tracking-10px
            ${mode ? "text-black" : "text-white"}
          `}
          onClick={($e) => handlerClick($e, true)}
        >
          <Bike
            className="w-6 h-6 mr-2.5"
            style={{
              color: mode ? "#000" : "#fff",
            }}
          />
          租車
        </button>
        <button
          className={`
            w-1/2
            flex items-center justify-center
            px-5 py-3
            tracking-10px
            ${mode ? "text-white" : "text-black"}
          `}
          onClick={($e) => handlerClick($e, false)}
        >
          <Parking
            className="w-6 mr-2.5"
            style={{
              fill: "#FED801",
              color: mode ? "#fff" : "#000",
            }}
          />
          還車
        </button>
      </div>
    </div>
  );
};

export default memo(Bikemap);
