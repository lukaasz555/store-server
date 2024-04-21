import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  hashedPassword: string;

  @IsString()
  name?: string;

  @IsString()
  lastname?: string;
}
