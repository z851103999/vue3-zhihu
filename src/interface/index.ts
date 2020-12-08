
// id currentPage pageSize
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IPageProps {
  id?: string;
  currentPage: number;
  pageSize: number;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IRuleProps{
  type: 'required'|'email'|'custom';
  message: string;
  validator?: () => boolean;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IFormProps {
  email: string;
  password: string;
  emailRules: IRuleProps[];
  passwordRules: IRuleProps[];
}



