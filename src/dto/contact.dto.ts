import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class ContactDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly subject: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 500)
  readonly message: string;
}
