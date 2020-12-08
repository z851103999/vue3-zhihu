 interface ImageProps{
  _id?: string;
  url?: string;
}

export interface IColumnDetailProps{
  _id: string;
  title: string;
  excerpt: string;
  image?: ImageProps;
  createAt: string;
  column: string;
}

export interface IColumnProps{
  _id: string;
  title: string;
  description: string;
  avatar?: ImageProps;
}
