export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  body: string;
  excerpt?: string;
  tags?: string[];
}
