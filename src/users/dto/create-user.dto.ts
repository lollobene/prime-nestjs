import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UsersDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  secretKey: string;
}
