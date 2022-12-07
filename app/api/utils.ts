import type { LatLngTuple } from "leaflet";
import { typeMapping } from "~/constants";

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
  "_type_ID,_type_Name,Picture,MapUrl,Description,OpenTime,Phone,Address,Position";
const defaultFilter =
  "Picture/PictureUrl1 ne null and _type_Name ne null and OpenTime ne null";
// and Address ne null and MapUrl ne null and Phone ne null and OpenTime ne null
// and Description ne null

export function formatRequestUrl(
  url: string,
  param: APIParam = {},
  type = "other",
) {
  const filter = defaultFilter.replace(/_type_/g, typeMapping[type]);
  if (url.match(/tourism/i)) {
    param.select = defaultSelector.replace(/_type_/g, typeMapping[type]);
    if (param.filter) {
      param.filter += ` and ${filter}`;
    } else {
      param.filter = filter;
    }
  }

  return (
    url +
    "?$format=JSON&" +
    Object.keys(param)
      .map((key) => `$${key}=${param[key]}`)
      .join("&")
  );
}
