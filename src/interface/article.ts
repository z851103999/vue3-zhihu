import { IUserProps } from './user'

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IUploadProps {
  _id: string;
  url: string;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IArticleProps {
  _id: string;
  title: string;
  image?: {
    _id: string;
    url: string;
  };
  isHTML: boolean;
  author: IUserProps;
  content: string;
  createdAt: string;
}
