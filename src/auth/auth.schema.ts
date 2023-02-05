import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  _id: string;

  @Prop({ type: String })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
