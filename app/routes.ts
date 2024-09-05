export const routerPaths = {
  "/": "/",
  "/leaderboard": "/leaderboard",
  "/profiles": "/profiles",
  "/profiles/:uuid"(params: { uuid: string | number }) {
    return buildPath("/profiles/:uuid", params);
  },
  "/servers": "/servers",
  "/servers/:name"(params: { name: string | number }) {
    return buildPath("/servers/:name", params);
  },
  "/404": "/404",
} as const;

export const unsafeRouterPaths = {
  "/"(params: Record<string, unknown>) {
    return unsafeBuildPath("/", params);
  },
  "/leaderboard"(params: Record<string, unknown>) {
    return unsafeBuildPath("/leaderboard", params);
  },
  "/profiles"(params: Record<string, unknown>) {
    return unsafeBuildPath("/profiles", params);
  },
  "/profiles/:uuid"(params: Record<string, unknown>) {
    return unsafeBuildPath("/profiles/:uuid", params);
  },
  "/servers"(params: Record<string, unknown>) {
    return unsafeBuildPath("/servers", params);
  },
  "/servers/:name"(params: Record<string, unknown>) {
    return unsafeBuildPath("/servers/:name", params);
  },
  "/404"(params: Record<string, unknown>) {
    return unsafeBuildPath("/404", params);
  },
} as const;

export type RouterPath = keyof typeof routerPaths;

export type RouterParams = {
  "/": {};
  "/leaderboard": {};
  "/profiles": {};
  "/profiles/:uuid": { uuid: string };
  "/servers": {};
  "/servers/:name": { name: string };
  "/404": {};
};

type InputParams = {
  "/": {};
  "/leaderboard": {};
  "/profiles": {};
  "/profiles/:uuid": { uuid: string | number };
  "/servers": {};
  "/servers/:name": { name: string | number };
  "/404": {};
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function buildPath<TRouterPath extends RouterPath>(
  route: TRouterPath,
  params: InputParams[TRouterPath],
) {
  return route
    .replace(/'/g, "")
    .split("/")
    .map((part) =>
      part.startsWith(":")
        ? params[
            part
              .replace(":", "")
              .replace("?", "") as keyof InputParams[TRouterPath]
          ]
        : part,
    )
    .filter((part) => part !== undefined)
    .join("/");
}

function unsafeBuildPath<TRouterPath extends RouterPath>(
  route: TRouterPath,
  params: Record<string, unknown>,
) {
  return route
    .replace(/'/g, "")
    .split("/")
    .map((part) =>
      part.startsWith(":")
        ? params[part.replace(":", "").replace("?", "")]
        : part,
    )
    .filter((part) => part !== undefined)
    .join("/");
}
