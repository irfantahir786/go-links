export type LinkType = {
  id: string;
  code: string;
  longUrl: string;
  clicks: number;
  lastClickedAt: string | null;
  createdAt: string;
  userId: string;
  isActive?: boolean;
  updatedAt?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string; // Should not be stored in a real app, but ok for mock
};


export type Stats = {
  title: string;
  value: string;
}
