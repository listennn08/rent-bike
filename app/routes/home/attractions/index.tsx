import { memo, useContext } from "react";
import { useNavigate } from "@remix-run/react";
import Lottie from "lottie-react";
import YouBikeAnimation from "~/assets/icons/youbike.json";
import { distance } from "~/utils";

import { AttractionsContext } from "../attractions";
import { HomeContext } from "~/routes/home";
import { IonIosTelephone } from "~/assets/icons";
import { typeMapping } from "~/constants";

const Near = () => {
  const navigate = useNavigate();
  const { mode, currentCity, userPosition } = useContext(HomeContext);
  const { isLoading, attractions, type, offset, setOffet } =
    useContext(AttractionsContext);

  if (!currentCity.City)
    return (
      <div className="container mx-auto pt-8 md:pt-[42px] px-4 md:px-0 min-h-main">
        <span className="text-secondary">尚未選擇任何縣市</span>
      </div>
    );

  if (isLoading && !offset)
    return (
      <div className="flex justify-center">
        <div className="w-[120px]">
          <div className="slide animated">
            <Lottie
              animationData={YouBikeAnimation}
              loop
              style={{
                width: "119px",
                height: "75px",
              }}
            />
          </div>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto py-8 md:pt-[42px] px-4 md:px-0 min-h-main">
      {attractions[type].length ? (
        <>
          <div className="-mx-2 flex flex-col md:flex-row flex-wrap">
            {attractions[type].map((el, i) => {
              const id = el[`${typeMapping[type]}ID`] as string;
              const name = el[`${typeMapping[type]}Name`] as string;
              return (
                <div
                  className="rounded-md shadow mx-2 mb-2 p-3 bg-white md:w-card-1/3 flex cursor-pointer"
                  key={id}
                  onClick={() =>
                    navigate(`detail?q=${encodeURI(id)}`, {
                      state: {
                        type,
                        city: currentCity.City,
                        offset: i,
                      },
                    })
                  }
                >
                  <div
                    className="w-[120px] h-[120px] mr-2.5 bg-center bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url('${el.Picture?.PictureUrl1}')`,
                    }}
                  />
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-end text-primary text-sm mb-1.5">
                      {userPosition &&
                        distance(userPosition, [
                          el.Position?.PositionLat!,
                          el.Position?.PositionLon!,
                        ]).toFixed(1)}{" "}
                      km
                    </div>
                    <h3 className="mb-auto">{name}</h3>
                    <div className="flex items-center text-secondary text-sm">
                      <IonIosTelephone className="text-primary mr-2" />
                      {el.Phone}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-black text-white p-2 rounded"
              onClick={() => setOffet((p) => ++p)}
            >
              {isLoading ? "Loading..." : "載入更多"}
            </button>
          </div>
        </>
      ) : (
        <span className="text-secondary">
          附近無任何{mode ? "景點" : "美食"}
        </span>
      )}
    </div>
  );
};

export default memo(Near);
