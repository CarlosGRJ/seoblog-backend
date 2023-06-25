export interface ISignupRequestBody {
  name: string;
  email: string;
  password: string;
}

export type ISigninRequestBody = Omit<ISignupRequestBody, 'name'>;
