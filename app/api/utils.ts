import type { LatLngTuple } from "leaflet";

export function generateGeoStringToLatLngArray(data: CustomBikeShape[]) {
  return data?.map((el) => {
    const geometry = el.Geometry?.match(/(\d+.\d+) (\d+.\d+)/g);
    if (geometry) {
      el.geo = geometry.map(
        (g) =>
          g
            .split(" ")
            .map((d) => parseFloat(d))
            .reverse() as LatLngTuple,
      );
    }
    return el;
  });
}

const defaultSelector =
  "ID,Name,Picture,MapUrl,Description,OpenTime,Phone,Address,Position";
const defaultFilter =
  "Picture/PictureUrl1 ne null and Name ne null and Address ne null and MapUrl ne null and Phone ne null" +
  " and OpenTime ne null and Description ne null";

export function formatRequestUrl(
  url: string,
  param: APIParam = {},
  type = "other",
) {
  const { ...keys } = param;
  if (url.match(/tourism/i)) {
    keys.select = defaultSelector;
    if (keys.filter) {
      keys.filter += ` and ${defaultFilter}`;
    } else {
      keys.filter = defaultFilter;
    }
  }

  return (
    url +
    "?$format=JSON" +
    Object.keys(keys).reduce((resp, key) => `${resp}$${key}=${keys[key]}`, "")
  );
}
