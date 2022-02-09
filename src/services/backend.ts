interface AdsResponse {
  data: Ad[];
  synced: boolean;
  total: number;
}

export type Ad = {
  name: string;
  image_url?: string;
  clarity_score?: number;
  impressions: number;
  amount_spent: number;
  clicks: number;
  cpc: number;
  ctr: number;
  reach: number;
  inline_link_clicks: number;
  outbound_clicks: number;
  created_at: string;
  objective: string;
};

export class Backend {
  public static getAdsList = async (
    accessToken: string
  ): Promise<AdsResponse> => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/ads`, {
      headers: {
        Authorization: accessToken,
        Accept: "application/json",
      },
    });
    return response.json();
  };
}
