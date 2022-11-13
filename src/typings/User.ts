export interface Response {
  msg: string;
  status: number
}

export interface LoginResp extends Response {
  token?: string
}

export interface RegisterResp extends Response {
  username?: string
}