export interface Profile {
    id: number;
    name: string;
    uuid: string;
    initial_login_date: string;
    last_login_date: string;
    total_play_time: number;
    experience: number;
    currency: number;
    total_build_blocks: number;
    total_destroy_blocks: number;
    total_mob_kills: number;
    is_bedrock: boolean;
    xuid: string;
}