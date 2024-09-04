export default function IndexPage() {
    return (
        <>
            <section>
                <h1>
                    <img src="./assets/server-icon.jpg" alt="server-icon" />
                    <p style={{ fontSize: "1.8rem" }}>ウズシカ鯖</p>
                </h1>
                <ul style={{ marginBottom: "1rem" }}>
                    <li>
                        Java版/統合版でサバイバルなどが楽しめる24時間稼働の生活サーバーです！
                    </li>
                    <li>Minecraft Java版 バージョン 1.21.1</li>
                    <li>
                        詳しい参加方法/ルールは{" "}
                        <a href="https://discord.gg/N6gADVxcyp">Discordサーバー</a> を参照✨️
                    </li>
                    <li>
                        X (Twitter): <a href="https://x.com/uzsk_minecraft">@uzsk_minecraft</a>
                    </li>
                    <li>
                        Discord:{" "}
                        <a href="https://discord.gg/N6gADVxcyp">サーバー招待を受ける</a>
                    </li>
                </ul>
                <iframe
                    style={{
                        width: 528,
                        height: 90,
                        maxWidth: "100%",
                        border: "none",
                        display: "block",
                        margin: "auto"
                    }}
                    src="https://ja.namemc.com/server/uzsk.iamtakagi.net/embed"
                    width={528}
                    height={90}
                />
            </section>
            <footer>
                <a
                    href="https://twitter.com/share"
                    className="twitter-share-button"
                    data-text="NowBrowsing:"
                    data-show-count="false"
                >
                    Tweet
                </a>
                <a
                    href="https://b.hatena.ne.jp/entry/"
                    className="hatena-bookmark-button"
                    data-hatena-bookmark-layout="vertical-normal"
                    data-hatena-bookmark-lang="ja"
                    title="このエントリーをはてなブックマークに追加"
                >
                    <img
                        src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
                        alt="このエントリーをはてなブックマークに追加"
                        width={20}
                        height={20}
                        style={{ border: "none" }}
                    />
                </a>
                <img src="./assets/banner_1.png" alt="banner_1" />
            </footer>
        </>
    )
}