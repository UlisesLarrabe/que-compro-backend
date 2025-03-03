import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type UsersDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lists' }],
    default: [],
  })
  lists: object[];
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SharedLists' }],
    default: [],
  })
  sharedLists: object[];
  @Prop({ default: false })
  isPremium: boolean;
  @Prop({ default: null })
  premiumExpiration: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
