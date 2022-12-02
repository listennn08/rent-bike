import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const tokenPref = createCookie("token", {
  maxAge: 86_400, // one week
});
