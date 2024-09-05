import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/server-runtime";
import { fetchApiObject, fetchApiText } from "~/utils/fetchApi.server";
import { NamedProfile, Profile } from "~/model/profile";

interface LoaderData {
    profiles: NamedProfile[] | null;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const profiles = await fetchApiObject<Profile[] | null>(`profiles?order_by=id&sort=asc`);
    if (!profiles) return redirect('/404');
    const namedProfiles = await Promise.all(profiles.map(async profile => {
        const name = await fetchApiText(`external/mojang/${profile.uuid}/name`);
        return { ...profile, name: name == null ? "Bedrock Player" : name };
    }));
    return { profiles: namedProfiles }
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
                                <img src={`https://crafatar.com/avatars/${profile.uuid}?size=25&default=MHF_Steve&overlay`} alt={""} width={25} />
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