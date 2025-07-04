/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { ContactDto } from 'src/dto/contact.dto';
import { QuoteDto } from 'src/dto/quote.dto';
import { generateCommonHtml } from 'src/utils/generateCommonHtml';
import { EmailTemplate, templates } from 'src/utils/template';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private user: string;
  private pass: string;
  private url: string;
  private sarayaEmail: string;
  private sarayaEmailUS: string;

  constructor(configService: ConfigService) {
    this.user = configService.get<string>('GMAIL_USER') || '';
    this.pass = configService.get<string>('GMAIL_APP_PASSWORD') || '';
    this.url = configService.get<string>('APP_URL') || '';
    this.sarayaEmail =
      configService.get<string>('SARAYA_EMAIL') || 'info@saraya.tech';
    this.sarayaEmailUS =
      configService.get<string>('SARAYA_EMAIL_US') || 'info.us@saraya.tech';
  }

  private transporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
  }

  private async sendMail<T>(
    to: string,
    template: EmailTemplate<T>,
    data: T,
    isForSarayaTechUS: boolean,
    retries = 2,
  ): Promise<void> {
    const lang = isForSarayaTechUS ? 'en' : 'fr';
    const fromEmail = isForSarayaTechUS ? this.sarayaEmailUS : this.sarayaEmail;
    for (let attempt = 1; attempt <= retries + 1; attempt++) {
      try {
        await this.transporter().sendMail({
          from: fromEmail,
          to,
          subject: template.subject(data),
          html: generateCommonHtml(
            lang,
            template.content(data),
            this.sarayaEmail,
          ),
        });
        this.logger.log(`Email sent to ${to} (Attempt ${attempt})`);
        return;
      } catch (error: any) {
        this.logger.error(
          `Failed to send email to ${to} (Attempt ${attempt}): ${error.message}`,
          error.stack,
        );
        if (attempt === retries + 1) {
          throw new Error(
            `Failed to send email to ${to} after ${retries} retries: ${error.message}`,
          );
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  async sendContactMessage(
    contactDto: ContactDto,
    isForSarayaTechUS: boolean = false,
  ): Promise<void> {
    try {
      const lang = isForSarayaTechUS ? 'en' : 'fr';
      await Promise.all([
        this.sendMail(
          contactDto.email,
          templates.contactConfirmation[lang],
          contactDto,
          isForSarayaTechUS,
        ),
        this.sendMail(
          isForSarayaTechUS ? this.sarayaEmailUS : this.sarayaEmail,
          templates.contactNotification[lang],
          contactDto,
          isForSarayaTechUS,
        ),
      ]);
      this.logger.log('Contact emails sent successfully');
    } catch (error) {
      this.logger.error('Error sending contact emails:', error);
      throw error;
    }
  }

  async sendQuoteRequest(
    quoteDto: QuoteDto,
    isForSarayaTechUS: boolean = false,
  ): Promise<void> {
    try {
      const lang = isForSarayaTechUS ? 'en' : 'fr';
      await Promise.all([
        this.sendMail(
          quoteDto.email,
          templates.quoteConfirmation[lang],
          quoteDto,
          isForSarayaTechUS,
        ),
        this.sendMail(
          isForSarayaTechUS ? this.sarayaEmailUS : this.sarayaEmail,
          templates.quoteRequest[lang],
          quoteDto,
          isForSarayaTechUS,
        ),
      ]);
      this.logger.log('Quote emails sent successfully');
    } catch (error) {
      this.logger.error('Error sending quote emails:', error);
      throw error;
    }
  }
}
