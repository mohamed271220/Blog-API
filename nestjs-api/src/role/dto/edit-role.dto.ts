import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditRoleDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
}
