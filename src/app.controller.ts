import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ContactDto } from './dto/contact.dto';
import { QuoteDto } from './dto/quote.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send-message')
  sendMessage(@Body() contactDto: ContactDto) {
    return this.appService.sendContactMessage(contactDto);
  }

  @Post('send-quote')
  sendQuote(@Body() quoteDto: QuoteDto) {
    return this.appService.sendQuoteRequest(quoteDto);
  }
}
