import { memo, useEffect, useState } from "react";
import { ClientOnly } from "~/components/client-only";
import AttractionsMapClient from "~/components/maps/attractions-map.client";
import { useQuery } from "~/hooks/useQuery";

import type { LatLngTuple } from "leaflet";
import leafletStyle from "leaflet/dist/leaflet.css";

import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: leafletStyle,
  },
];

const Map = () => {
  const query = useQuery();
  const addr = query.get("addr")!;
  const latlng = query.get("p");
  const [bound, setBound] = useState<LatLngTuple>();

  useEffect(() => {
    if (latlng)
      setBound(latlng.split(",").map((el) => parseFloat(el)) as LatLngTuple);
  }, [query, latlng]);
  return (
    <ClientOnly>
      {() => <AttractionsMapClient addr={addr} bound={bound} />}
    </ClientOnly>
  );
};

export default memo(Map);
