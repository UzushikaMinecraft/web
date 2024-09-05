import { Link, useHref, useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/server-runtime";
import { fetchApiObject, fetchApiText } from "~/utils/fetchApi.server";
import { NamedProfile, Profile } from "~/model/profile";
import { useEffect, useState } from "react";
import { millisToRoundedTime } from "~/utils/utils";
import { Experience } from "~/utils/experience";

interface LoaderData {
    profiles: NamedProfile[] | null;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    // get order_by from query string
    const orderBy = new URL(request.url).searchParams.get('orderBy');
    if (orderBy !== 'experience' && orderBy !== 'total_play_time') {
        return redirect('/leaderboard?orderBy=experience');
    }
    const profiles = await fetchApiObject<Profile[] | null>(`profiles?order_by=${orderBy}&sort=desc`);
    if (!profiles) return redirect('/404');
    const namedProfiles = await Promise.all(profiles.map(async profile => {
        const name = await fetchApiText(`external/mojang/${profile.uuid}/name`);
        return { ...profile, name: name == null ? "Bedrock Player" : name };
    }));
    return { profiles: namedProfiles }
}

export type OrderBy = 'experience' | 'total_play_time';

export default function LeaderboardPage() {
    const { profiles } = useLoaderData<LoaderData>();
    const navigate = useNavigate();
    const [orderBy, setOrderBy] = useState<OrderBy>('experience');
    useEffect(() => {
        navigate({pathname: '/leaderboard', search: `?orderBy=${orderBy}`});
    }, [orderBy]);
    return profiles && (
        <>
            <h2>リーダーボード</h2>
            <label>
                ソート:
                <select onChange={(e) => {
                    // check if the value is OrderBy
                    if (e.target.value === 'experience' || e.target.value === 'total_play_time') {
                        setOrderBy(e.target.value as OrderBy);
                    }
                }}>
                    <option value="experience" >経験値</option>
                    <option value="total_play_time">総プレイ時間</option>
                </select>
            </label>
            <table style={{marginTop: '.5rem'}}>
                <thead>
                    <tr>
                        <th>順位</th>
                        <th></th>
                        <th>名前</th>
                        <th>レベル</th>
                        <th>経験値</th>
                        <th>総プレイ時間</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map((profile, key) => (
                        <tr key={key}>
                            <td>
                                {key + 1}位
                            </td>
                            <td>
                                <img src={`https://crafatar.com/avatars/${profile.uuid}?size=25&default=MHF_Steve&overlay`} alt={""} width={25} />
                            </td>
                            <td>
                                <Link to={`/players/${profile.uuid}`}>{profile.name}</Link>
                            </td>
                            <td>
                                Lv.{new Experience(profile.experience).getCurrentLevel()}
                            </td>
                            <td>
                                {profile.experience}
                            </td>
                            <td>
                                {millisToRoundedTime(profile.total_play_time)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}