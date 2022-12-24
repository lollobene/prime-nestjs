import { PartialType } from '@nestjs/swagger';
import { UsersDTO } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from '../enums/category.enum';
import { Role } from '../enums/role.enum';

export class UpdateUserAdminDto {
  @IsOptional()
  @IsString()
  categories?: Category[];

  @IsOptional()
  @IsString()
  role?: Role;
}
