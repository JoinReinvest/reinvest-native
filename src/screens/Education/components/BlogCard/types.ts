export interface BlogPost {
  data: string;
  slug: string;
  title: string;
  image?: {
    alt: string;
    height: number;
    src: string;
    width: number;
    name?: string;
  };
}
