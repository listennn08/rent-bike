// import IconLocation from '~icons/si-glyph/pin-location'
import { useNavigate } from "@remix-run/react";
import { memo, useContext } from "react";
import { MdiClockTimeFour, IcSharpPhone } from "~/assets/icons";
import { useQuery } from "~/hooks/useQuery";
import { AttractionsContext } from "../attractions";

const Detail = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const { attractions, type } = useContext(AttractionsContext);

  const tourismInfo = attractions[type];
  const currentItem = tourismInfo.find(
    ({ ID }) => ID === query.get("q"),
  ) as TourismInfo;

  const openMap = () =>
    navigate(
      `/home/attractions/map?addr=${currentItem.Address}` +
        `&p=${currentItem.Position?.PositionLat},${currentItem.Position?.PositionLon}`,
    );

  return (
    <div className="container mx-auto pt-8 md:pt-10.5 px-4 md:px-0 min-h-main">
      <div className="mx-auto max-w-2/5">
        <div className="rounded shadow bg-white p-4 h-92.5 mb-3">
          <div
            className="bg-center bg-cover bg-no-repeat rounded h-full"
            style={{
              backgroundImage: `url('${currentItem.Picture?.PictureUrl1}')`,
            }}
          />
        </div>
        <div className="pl-4">
          <div className="flex items-center mb-5">
            <MdiClockTimeFour className="text-primary mr-3" />
            <span>{currentItem.OpenTime}</span>
          </div>
          <div className="flex items-center mb-5">
            <IcSharpPhone className="text-primary mr-3" />
            <span>{currentItem.Phone}</span>
          </div>
          <div className="flex items-center mb-5">
            {/* <IconLocation className="text-primary mr-3" /> */}
            <span className="mr-2">{currentItem.Address}</span>
            <button
              className="px-3 py-0.5 bg-primary rounded-full"
              onClick={() => openMap()}
            >
              地圖
            </button>
          </div>
          <p className="text-secondary">{currentItem.Description}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Detail);
