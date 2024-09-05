import { Link, Outlet } from "@remix-run/react";

export default function Layout() {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <header>
                <nav>
                    <ul style={{ display: "flex", justifyContent: "space-between", alignItems: "center", listStyle: "none" }}>
                        <li>
                            <Link to="/">ウズシカ鯖</Link>
                        </li>
                        <li>
                            <Link to="/players">プレイヤーリスト👱</Link>
                        </li>
                        <li>
                            <Link to="/leaderboard">リーダーボード🏆️</Link>
                        </li>
                        <li>
                            <Link to="/servers">サーバーステータス🌍️</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}