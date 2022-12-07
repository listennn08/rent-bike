import { memo, useContext } from "react";
import leafletStyle from "leaflet/dist/leaflet.css";

import { ClientOnly } from "~/components/client-only";
import RouteMapClient from "~/components/maps/route-map.client";
import { HomeContext } from "~/routes/home";
import { RouteContext } from "../search";

import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: leafletStyle,
  },
];

const Map = () => {
  const { bikeRoutes, userPosition } = useContext(HomeContext);
  const { position } = useContext(RouteContext);

  return (
    <ClientOnly>
      {() => (
        <RouteMapClient
          position={position || userPosition!}
          bikeRoutes={bikeRoutes}
        />
      )}
    </ClientOnly>
  );
};

export default memo(Map);
