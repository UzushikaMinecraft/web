export interface Server {
    name: string;
    description?: string;
    is_online: boolean;
    online_players?: number;
    max_players?: number;
    players_sample?: ReadonlyArray<string>;
}