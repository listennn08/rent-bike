import { memo, useContext } from "react";
import { useNavigate } from "@remix-run/react";
import { IcSharpLocationOn } from "~/assets/icons";
import { HomeContext } from "~/routes/home";

const Search = () => {
  const navigate = useNavigate();
  const { currentCity, bikeRoutes } = useContext(HomeContext);

  /**
   * convert route length unit
   *
   * @param {string} len route length（m）
   * @returns {number} route length（km）
   */
  const convertRouteLength = (len: string): number => parseFloat(len) / 1000;

  return (
    <div className="container mx-auto pt-8 md:pt-[42px] px-4 md:px-0 min-h-main">
      {!currentCity.City ? (
        <span className="text-secondary">尚未選擇任何縣市</span>
      ) : (
        <div className="-mx-2 flex flex-col md:flex-row flex-wrap">
          {bikeRoutes
            .filter((el) => el.City === currentCity.CityName)
            .map((el) => (
              <div
                key={el.RouteName}
                className="rounded-md shadow mx-2 mb-2 p-3 bg-white md:w-card-1/3 cursor-pointer"
                onClick={() =>
                  navigate(
                    `map?c=${currentCity.City}&q=${encodeURI(el.RouteName)}`,
                  )
                }
              >
                <h3 className="mb-3">{el.RouteName}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-secondary text-sm">
                    {el.Direction} {convertRouteLength(el.CyclingLength!)} 公里
                  </div>
                  <div className="flex items-center text-secondary text-sm">
                    <IcSharpLocationOn className="text-primary mr-[6.5px]" />
                    <span>
                      {el.City} {el.Town}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default memo(Search);
