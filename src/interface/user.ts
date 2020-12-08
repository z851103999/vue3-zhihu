
// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IUserProps {
  // 登录状态
  isLogin: boolean;
  // 昵称
  nickName: string;
  _id: string;
  column: string;
  avatar?: {
    _id: string;
    url: string;
  };
  description?: string;
}
