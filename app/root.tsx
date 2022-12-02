import { json, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useCallback, useEffect } from "react";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import axios from "axios";
import Logo from "./assets/icons/logo.svg";
import styles from "~/styles/tailwind.css";

import type { MetaFunction, LoaderFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  {
    rel: "icon",
    type: "image/svg+xml",
    href: Logo,
  },
  {
    rel: "stylesheet",
    href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css",
  },
  { rel: "stylesheet", href: styles },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap",
  },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Where's YouBike",
  description: "查詢 YouBike 車輛",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = () =>
  json({
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  });

export default function App() {
  const { CLIENT_ID, CLIENT_SECRET } = useLoaderData();
  const getToken = useCallback(async () => {
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", CLIENT_ID);
    data.append("client_secret", CLIENT_SECRET);

    const resp = (
      await axios.post<TokenInfo>(
        "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token",
        data,
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        },
      )
    ).data;
    localStorage.setItem(
      "token",
      JSON.stringify({
        ...resp,
        expired_date: dayjs().add(resp.expires_in, "second"),
      }),
    );
    window.location.reload();
  }, [CLIENT_ID, CLIENT_SECRET]);
  // const data = useLoaderData();

  useEffect(() => {
    const token = JSON.parse(
      localStorage.getItem("token") || "{}",
    ) as TokenInfo & {
      expired_date: Date;
    };
    if (isEmpty(token) || dayjs().isAfter(token.expired_date)) getToken();
  }, [getToken]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
