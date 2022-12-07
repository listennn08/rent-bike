import { divIcon } from "leaflet";

import type { DivIconOptions } from "leaflet";

interface IProps {
  count?: number;
  type?: string;
  text?: string;
  mode?: boolean;
  openLocate?: boolean;
}

const BaseIcon = ({
  count,
  mode,
  text,
  type = "location",
  openLocate,
}: IProps) => {
  const bgColor = mode ? "text-primary" : "text-black";
  const textColor = mode ? "text-black" : "text-primary";
  const defaultIconConfig: DivIconOptions = {
    className: "border-none bg-transparent",
    iconSize: [40, 40],
    iconAnchor: [12, 24],
    popupAnchor: [7, -16],
  };

  const locationTemplate: DivIconOptions = {
    html: `
      <div class="relative ${count ? bgColor : "text-secondary"}">
        <svg width="36" height="50" viewBox="0 0 36 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 18.0726C0 8.09194 8.05911 0 17.9993 0C27.9409 0 36 8.09194 36 18.0726C36 26.8625 29.7496 34.1853 21.4692 35.8091L19.1796 42.1448C18.7795 43.2515 17.2205 43.2515 16.8204 42.1448L14.5308 35.8091C6.25038 34.1853 0 26.8625 0 18.0726ZM25.3249 47.8777C25.3249 49.0498 22.0451 50 17.9992 50C13.9534 50 10.6735 49.0498 10.6735 47.8777C10.6735 46.7055 13.9534 45.7553 17.9992 45.7553C22.0451 45.7553 25.3249 46.7055 25.3249 47.8777Z" fill="currentColor"/>
        </svg>
        <div class="absolute top-1.5 -left-1 right-0 font-black text-base font-robot text-center italic z-201 ${
          count ? textColor : "text-black"
        }">
          ${count}
        </div>
      </div>
    `,
    ...defaultIconConfig,
  };
  const bikeTemplate: DivIconOptions = {
    html: `
      <div class="relative text-black">
        <svg width="36" height="50" viewBox="0 0 36 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 18.0726C0 8.09194 8.05911 0 17.9993 0C27.9409 0 36 8.09194 36 18.0726C36 26.8625 29.7496 34.1853 21.4692 35.8091L19.1796 42.1448C18.7795 43.2515 17.2205 43.2515 16.8204 42.1448L14.5308 35.8091C6.25038 34.1853 0 26.8625 0 18.0726ZM25.3249 47.8777C25.3249 49.0498 22.0451 50 17.9992 50C13.9534 50 10.6735 49.0498 10.6735 47.8777C10.6735 46.7055 13.9534 45.7553 17.9992 45.7553C22.0451 45.7553 25.3249 46.7055 25.3249 47.8777Z" fill="currentColor"/>
        </svg>
        <div class="absolute top-1.5 -left-1 right-0 font-black text-base font-robot text-center italic z-201 text-primary">
          ${text}
        </div>
      </div>
    `,
    ...defaultIconConfig,
  };
  const userTemplate: DivIconOptions = {
    html: `
      <div class="relative rounded-full flex items-center justify-center">
        <div class="absolute inset-0 ${
          openLocate ? "animate-ping" : ""
        } bg-primary bg-opacity-80 rounded-full -z-1"></div>
        <div class="rounded-full bg-primary bg-opacity-80 p-2">
          <div class="flex items-center justify-center w-4 h-4 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144zm0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64z" fill="currentColor"></path></svg>
          </div>
        </div>
      </div>
    `,
    ...defaultIconConfig,
    iconSize: [28, 32],
  };

  let template;
  if (type === "location") {
    template = locationTemplate;
  } else if (type === "bike") {
    template = bikeTemplate;
  } else {
    template = userTemplate;
  }

  return divIcon(template);
};

export const AttractionsIcon = (text: string) => {
  const html = `
    <div class="relative rounded-full flex items-center justify-center">
      <div class="flex items-center justify-center w-full h-full">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--openmoji" width="48" height="48" preserveAspectRatio="xMidYMid meet" viewBox="0 0 72 72"><path fill="#d22f27" d="M52.573 29.11c0-9.315-7.133-16.892-15.903-16.892s-15.904 7.577-15.904 16.896c.003.465.224 11.609 12.962 31.245a3.463 3.463 0 0 0 2.817 1.934c1.84 0 3.094-2.026 3.216-2.232C52.58 40.413 52.58 29.553 52.573 29.11zM36.67 35.913a7.083 7.083 0 1 1 7.083-7.082a7.09 7.09 0 0 1-7.083 7.082z"></path><path fill="#ea5a47" d="M52.573 29.11c0-9.315-7.133-16.892-15.903-16.892a14.96 14.96 0 0 0-3.865.525c8.395.45 15.1 7.823 15.1 16.85c.006.443.006 11.303-12.813 30.95a5.854 5.854 0 0 1-.586.797a2.855 2.855 0 0 0 2.04.954c1.839 0 3.093-2.027 3.215-2.233C52.58 40.413 52.58 29.553 52.573 29.11z"></path><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M36.545 62.294a3.463 3.463 0 0 1-2.817-1.935C20.99 40.723 20.769 29.58 20.766 29.114c0-9.32 7.134-16.896 15.904-16.896s15.903 7.577 15.903 16.892c.007.444.007 11.304-12.812 30.95c-.122.207-1.377 2.233-3.216 2.233z"></path><path d="M36.67 35.913a7.083 7.083 0 1 1 7.083-7.082a7.09 7.09 0 0 1-7.083 7.082z"></path></g></svg>
      </div>
      <div class="absolute text-red-500 left-10 w-[120px] font-extrabold text-lg text-outline ">
        ${text}
      </div>
    </div>
  `;

  return divIcon({
    html,
    className: "border-none bg-transparent",
    iconSize: [48, 48],
    iconAnchor: [12, 24],
    popupAnchor: [7, -16],
  });
};

export default BaseIcon;
