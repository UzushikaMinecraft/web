import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/server-runtime";
import { fetchApiObject } from "~/utils/fetchApi.server";
import { Server } from "~/model/server";

interface LoaderData {
    server: Server | null;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const { name } = params
    if (!name || typeof name !== "string") return redirect('/')
    const server = await fetchApiObject<Server | null>(`servers/${name}`);
    if (!server) return redirect('/404');
    return { server };
}

export default function ProfilePage() {
    const { server } = useLoaderData<LoaderData>();
    return server && (
        <>
          <h2>サーバー: {server.name}</h2>
          <p>{server.description}</p>
          <p>{server.is_online ? "🟢オンライン" : "🔴オフライン"}</p>
          <p>{server.is_online ? `${server.online_players}/${server.max_players}` : ""}</p>
        </>
      );
}