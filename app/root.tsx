import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import {
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import React from "react";
import Layout from "./layout";

export const links: LinksFunction = () => {
  return [
    // ref: https://remix.run/docs/en/main/guides/styling#css-modules
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ];
};

export default function App() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="referrer" content="origin" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="stylesheet" type="text/css" href="index.css" />
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        <title>ウズシカ鯖</title>
        <Meta />
        <Links />
      </head>
      <body style={{
        margin: '0 auto',
        maxWidth: '42rem',
        padding: '2rem',
      }}>
        <Layout />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}