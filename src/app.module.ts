import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { MailerService } from './mailer/mailer.service';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule,
    QuoteModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailerService],
})
export class AppModule {}
