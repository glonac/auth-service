export interface user {
  id: string;
  password: string;
}

export type singUpRequest = Pick<user, 'password'>;

export interface singUpResponse {
  id: string;
  token?: string;
}

export interface userData {
  id: string;
}

export type fetchResponse = userData;

export type tokenPayload = userData;

export type tokenResponse = {
  token: string;
};
