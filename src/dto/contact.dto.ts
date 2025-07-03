import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class ContactDto {
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 15)
  readonly subject: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 500)
  readonly message: string;
}
