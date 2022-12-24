import { IsNotEmpty } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  dateTime: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  creatorId: string;
}
