import { IcSharpLocationOn } from "~/assets/icons";
import { useLocation, useNavigate } from "@remix-run/react";
import { memo, useContext, useEffect, useState } from "react";
import { MdiClockTimeFour, IcSharpPhone } from "~/assets/icons";
import { typeMapping } from "~/constants";
import { useQuery } from "~/hooks/useQuery";
import { AttractionsContext } from "../attractions";
import { getTourism } from "~/api";

const Detail = () => {
  const location = useLocation();
  const state = location.state as {
    type: string;
    city: string;
    offset: number;
  };
  const query = useQuery();
  const navigate = useNavigate();
  const { attractions, type } = useContext(AttractionsContext);

  const tourismInfo = attractions[type];
  const [currentItem, setCurrentItem] = useState(
    tourismInfo.find((el) => el[`${typeMapping[type]}ID`] === query.get("q")),
  );

  useEffect(() => {
    const fetchCurrentItem = async () => {
      if (!currentItem) {
        setCurrentItem(
          (
            await getTourism<TourismInfo[]>({
              type: state.type,
              city: state.city,
              params: {
                skip: state.offset,
                top: 1,
              },
            })
          ).data[0],
        );
      }
    };
    fetchCurrentItem();
  }, [currentItem, state]);

  if (!currentItem) return <></>;

  const openMap = () =>
    navigate(
      `/home/attractions/map?addr=${currentItem.Address || ""}` +
        `&p=${currentItem.Position?.PositionLat},${currentItem.Position?.PositionLon}`,
    );

  return (
    <div className="container mx-auto pt-8 md:pt-[42px] px-4 md:px-0 min-h-main">
      <div className="mx-auto max-w-[40%]">
        <div className="rounded shadow bg-white p-4 h-[370px] mb-3">
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
            <IcSharpLocationOn className="text-primary mr-3" />
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
