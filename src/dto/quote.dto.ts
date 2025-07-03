import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';

export enum Services {
  WEB_DEVELOPMENT = 'Web Development',
  MOBILE_DEVELOPMENT = 'Mobile Development',
  DIGITAL_MARKETING = 'Digital Marketing',
  DIGITAL_TRANSFORMATION = 'Digital Transformation',
}

export class QuoteDto {
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly company: string;

  @IsNotEmpty()
  @IsString()
  readonly projectType: string;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(Services, { each: true })
  readonly services: string[];

  @IsNotEmpty()
  @IsString()
  readonly budget: string;

  @IsNotEmpty()
  @IsString()
  readonly timeframe: string;

  @IsNotEmpty()
  @IsString()
  readonly projectDescription: string;

  @IsOptional()
  @IsString()
  readonly additionalInfo: string;
}
