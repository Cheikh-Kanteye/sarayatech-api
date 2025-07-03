import { Injectable } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { MailerService } from './mailer/mailer.service';
import { QuoteDto } from './dto/quote.dto';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  sendContactMessage(contactDto: ContactDto) {
    return this.mailerService.sendContactMessage(contactDto);
  }

  sendQuoteRequest(quoteDto: QuoteDto) {
    return this.mailerService.sendQuoteRequest(quoteDto);
  }
}
