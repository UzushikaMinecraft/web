import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/server-runtime";
import { fetchApiObject } from "~/utils/fetchApi.server";
import { Server } from "~/model/server";

interface LoaderData {
    servers: ReadonlyArray<Server> | null;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const servers = await fetchApiObject<ReadonlyArray<Server> | null>(`servers`);
    if (!servers) return redirect('/404');
    return { servers };
}

export default function ProfilePage() {
    const { servers } = useLoaderData<LoaderData>();
    return servers && (
        <>
            <h2>サーバーリスト</h2>
            <ul>
                {servers.map((server, key) => (
                    <li key={key}>
                        <Link to={`/servers/${server.name}`}>{server.name}: {server.description} {server.is_online ? `${server.online_players}/${server.max_players}` : ""} {server.is_online ? "🟢オンライン" : "🔴オフライン"}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
}