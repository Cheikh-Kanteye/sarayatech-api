import {
  Body,
  Controller,
  Post,
  Req,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { ContactDto } from './dto/contact.dto';
import { QuoteDto } from './dto/quote.dto';
import { MailerService } from './mailer/mailer.service';

@Controller()
export class AppController {
  private isForSarayaTechUS = false; // Indique si c'est pour SarayaTech US
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(MailerService.name);

  // URLs autorisées
  private readonly allowedOrigins = [
    'https://sarayatechus.netlify.app', // Version anglaise
    'https://sarayatech-sn.netlify.app', // Version française
    'http://localhost:8080', // Pour le développement local
  ];

  private validateOrigin(origin: string | undefined): void {
    if (!origin || !this.allowedOrigins.includes(origin)) {
      throw new BadRequestException(`Origine ${origin} non autorisée`);
    }
  }

  @Post('send-message')
  sendMessage(@Body() contactDto: ContactDto, @Req() req: Request) {
    const origin = req.headers.origin;
    this.validateOrigin(origin);
    this.logger.log(`Received request from origin: ${origin}`);

    if (origin && origin.includes('sarayatechus.netlify.app')) {
      this.isForSarayaTechUS = true; // Si l'origine est pour SarayaTech US
    }

    return this.appService.sendContactMessage(
      contactDto,
      this.isForSarayaTechUS,
    );
  }

  @Post('send-quote')
  sendQuote(@Body() quoteDto: QuoteDto, @Req() req: Request) {
    const origin = req.headers.origin;
    this.validateOrigin(origin);

    if (origin && origin.includes('sarayatechus.netlify.app')) {
      this.isForSarayaTechUS = true; // Si l'origine est pour SarayaTech US
    }

    return this.appService.sendQuoteRequest(quoteDto, this.isForSarayaTechUS);
  }
}
