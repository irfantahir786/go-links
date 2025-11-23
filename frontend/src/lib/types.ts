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
    is_active: boolean;
}

export interface Stats {


    total_links: number;
    total_clicks: number;
    today_clicks: number;
    active_links: number;
}

export interface LinkItem {
    code: string;
    url: string;
    clicks: number;
    last_clicked: string | null;
    created_at: string;
    updated_at: string;
    is_active: boolean | null;
}

export interface StatItem {
    title: string;
    value: string;
}

export interface LinksData {
    links: LinkItem[];
    stats: StatItem[];
}

export interface ApiResponse {
    status: string
    data: LinksData | null;
}


