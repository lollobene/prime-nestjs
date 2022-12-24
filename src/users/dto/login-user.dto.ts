import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UsersLoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name?: string;
}
