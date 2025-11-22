export type LoginRequestBody = {
    email: string;
    password: string;
};



export type APIResponse = {
    code: number;
    message: string;
};

export type NodeResponse = {
    status: string;
    data: any;
};

export interface ShortLink {
    code: string;
    url: string;
    last_clicked: string;
    clicks: number;
    created_at: string;
    updated_at: string;
}

export interface Stats {


    total_clicks: number;
    today_clicks: number;
    active_links: number;


}

