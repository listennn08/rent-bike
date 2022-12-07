import { memo } from "react";
import { BaseMap } from "~/components/base/map.client";
import { AttractionsInnerMap } from "~/components/base/map.client";

import type { LatLngTuple } from "leaflet";

const AttractionMap = ({
  addr,
  bound,
}: {
  addr: string;
  bound?: LatLngTuple;
}) => {
  return bound ? (
    <BaseMap>
      <AttractionsInnerMap bounds={bound} addr={addr} />
    </BaseMap>
  ) : (
    <></>
  );
};

export default memo(AttractionMap);
