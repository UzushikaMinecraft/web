import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/server-runtime";
import { fetchApiObject, fetchApiText } from "~/utils/fetchApi.server";
import { Profile } from "~/model/profile";

interface LoaderData {
    profiles: Profile[] | null;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const profiles = await fetchApiObject<Profile[] | null>(`profiles?order_by=id&sort=asc`);
    if (!profiles) return redirect('/404');
    return { profiles }
}

export default function ProfilePage() {
    const { profiles } = useLoaderData<LoaderData>();
    return profiles && (
        <>
            <h2>プレイヤーリスト</h2>
            <table>
                <tbody>
                    {profiles.map((profile, key) => (
                        <tr key={key}>
                            <td>
                                {profile.id}
                            </td>
                            <td>
                                <img src={profile.avatar.face} width={25} alt="" />
                            </td>
                            <td>
                                <Link to={`/players/${profile.uuid}`}>{profile.name}</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}