import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, Auth } from './auth.schema';
import {
  fetchResponse,
  singUpResponse,
  tokenPayload,
  tokenResponse,
  user,
} from '../types';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { REST_ERROR } from '../const/error';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<AuthDocument>,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(user: user): Promise<Auth | null> {
    const { id, password } = user;
    const auth = await this.authModel.findOne({ id });
    if (auth && auth.password === password) {
      return auth;
    }
    return null;
  }

  async singIn(user: user): Promise<tokenResponse> {
    const auth = await this.validateUser(user);

    if (auth) {
      return await this.createToken({ id: auth._id });
    }

    throw new Error(REST_ERROR.PASSWORD_ERROR);
  }

  private async createToken(payload: tokenPayload): Promise<tokenResponse> {
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async singUp(password: string): Promise<singUpResponse> {
    if (password) {
      const auth = await this.authModel.create({ password: password });
      const token = await this.createToken({ id: auth._id });
      return {
        id: auth._id,
        ...token,
      };
    }

    throw new Error(REST_ERROR.PASSWORD_ERROR);
  }

  async fetchUser(payload: string): Promise<fetchResponse> {
    const token: string = payload.split(' ')[1];

    const { id } = this.jwtService.decode(token) as any;

    if (!id) {
      throw new Error(REST_ERROR.BAD_TOKEN);
    }

    const auth = await this.authModel.findById(id);

    if (!auth) {
      throw new Error(REST_ERROR.BAD_TOKEN);
    }

    return { id: auth.id };
  }
}
