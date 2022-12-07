import { from, mergeMap, map, concatMap, filter } from "rxjs";
import { city } from "~/constants/city";
import { createInstance } from "./core";
import { generateGeoStringToLatLngArray, formatRequestUrl } from "./utils";

import type { Observable } from "rxjs";
import type { AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { typeMapping } from "~/constants";

const BaseAPIV2 = createInstance("/basic/v2");
const AdvancedAPIV2 = createInstance("/advanced/v2");

/**
 * Get near station
 *
 * @param params - filter params
 * @returns
 */
export const getNearStation = (params: APIParam) =>
  AdvancedAPIV2.GET(formatRequestUrl("/Bike/Station/NearBy", params));

/**
 * Fetch near available station
 *
 * @param params - filter params
 * @returns
 */
export const getNearStationAvailability = (params: APIParam) =>
  AdvancedAPIV2.GET(formatRequestUrl("/Bike/Availability/NearBy", params));

/**
 * Fetch city bicycle data
 *
 * @param city - city English name
 * @returns city bicycle routes data
 */
export async function getBikeRoute(city: string): Promise<CustomBikeShape[]>;
export async function getBikeRoute(
  city: string,
  token: string,
): Promise<CustomBikeShape[]>;
export async function getBikeRoute(
  city: string,
  token?: string,
): Promise<CustomBikeShape[]> {
  try {
    const headers: RawAxiosRequestHeaders = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const resp = (
      await BaseAPIV2.GET(
        formatRequestUrl(`/Cycling/Shape/City/${city}`),
        headers,
      )
    ).data;
    return generateGeoStringToLatLngArray(resp);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * Get all cities bicycle routes
 *
 * @returns {Observable} can observable object
 */
export const getAllBikeRoute = async (): Promise<
  Observable<CustomBikeShape>
> => {
  return from(city).pipe(
    filter((x) => x.CityID !== "O"),
    map((x) => x.City),
    mergeMap(getBikeRoute),
    map(generateGeoStringToLatLngArray),
    concatMap((x) => x),
  );
};

/**
 * Fetch restaurants
 *
 * @param params
 * @returns
 */
export const getRestaurant = async (city: string, params: APIParam) =>
  BaseAPIV2.GET(
    formatRequestUrl(`/Tourism/Restaurant/${city}`, params, "restaurants"),
  );

/**
 * Fetch scenic spot
 *
 * @param params
 * @returns
 */
export const getScenicSpot = async (city: string, params: APIParam) =>
  BaseAPIV2.GET(
    formatRequestUrl(`/Tourism/ScenicSpot/${city}`, params, "scenicSpots"),
  );

export const getTourism = async <T>({
  type,
  city,
  params,
}: {
  type: string;
  city: string;
  params: APIParam;
}): Promise<AxiosResponse<T>> =>
  BaseAPIV2.GET(
    formatRequestUrl(`/Tourism/${typeMapping[type]}/${city}`, params, type),
  );
