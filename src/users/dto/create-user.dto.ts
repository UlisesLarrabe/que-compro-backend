import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsObject()
  lists: object[];
  @IsObject()
  sharedLists: object[];
  @IsBoolean()
  isPremium: boolean;
  @IsDate()
  premiumExpiration: Date;
}
