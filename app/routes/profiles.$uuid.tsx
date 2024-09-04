import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/server-runtime";
import { fetchApiObject, fetchApiText } from "~/utils/fetchApi.server";
import { NamedProfile, Profile } from "~/model/profile";
import { millisToRoundedTime } from "~/utils/utils";

interface LoaderData {
    profile: NamedProfile | null;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const { uuid } = params
    if (!uuid || typeof uuid !== "string") return redirect('/')
    const profile = await fetchApiObject<Profile | null>(`profiles/${uuid}`);
    if (!profile) return redirect('/404');
    const name = await fetchApiText(`external/mojang/${uuid}/name`);
    return { profile: { ...profile, name: name == null ? "Bedrock Player" : name } };
}

export default function ProfilePage() {
    const { profile } = useLoaderData<LoaderData>();
    return profile && (
        <>
            <h2>プロフィール</h2>
            <img src={`https://crafatar.com/renders/head/${profile.uuid}`} alt={""} />
            <table>
                <tbody>
                    <tr>
                        <td>ID:</td>
                        <td>{profile.id}</td>
                    </tr>
                    <tr>
                        <td>UUID:</td>
                        <td>{profile.uuid}</td>
                    </tr>
                    <tr>
                        <td>名前:</td>
                        <td>{profile.name}</td>
                    </tr>
                    <tr>
                        <td>初回ログイン日時:</td>
                        <td>{profile.initial_login_date}</td>
                    </tr>
                    <tr>
                        <td>最終ログイン日時:</td>
                        <td>{profile.last_login_date}</td>
                    </tr>
                    <tr>
                        <td>総プレイ時間:</td>
                        <td>{millisToRoundedTime(profile.total_play_time)}</td>
                    </tr>
                    <tr>
                        <td>経験値:</td>
                        <td>{profile.experience}</td>
                    </tr>
                    <tr>
                        <td>通貨:</td>
                        <td>{profile.currency}</td>
                    </tr>
                    <tr>
                        <td>建築ブロック数:</td>
                        <td>{profile.total_build_blocks}</td>
                    </tr>
                    <tr>
                        <td>破壊ブロック数:</td>
                        <td>{profile.total_destroy_blocks}</td>
                    </tr>
                    <tr>
                        <td>倒したモブ数:</td>
                        <td>{profile.total_mob_kills}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}