import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { ContactDto } from 'src/dto/contact.dto';
import { QuoteDto } from 'src/dto/quote.dto';

interface EmailTemplate<T = any> {
  subject: (data: T) => string;
  generateHtml: (data: T) => string;
}

@Injectable()
export class MailerService {
  private user: string;
  private pass: string;
  private url: string;
  private sarayaEmail: string;

  constructor(configService: ConfigService) {
    this.user = configService.get<string>('GMAIL_USER') || '';
    this.pass = configService.get<string>('GMAIL_APP_PASSWORD') || '';
    this.url = configService.get<string>('APP_URL') || '';
    this.sarayaEmail =
      configService.get<string>('SARAYA_EMAIL') || 'info@saraya.tech';
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

  private templates = {
    contactConfirmation: {
      subject: () => `Confirmation de réception - SarayaTech 🚀`,
      generateHtml: (data: ContactDto) => `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation - ${data.subject} - SarayaTech</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
                .container { background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 20px; }
                .logo { color: #007bff; font-size: 24px; font-weight: bold; }
                h1 { color: #007bff; margin-bottom: 20px; }
                .message-content { background-color: #f8f9fa; padding: 20px; border-left: 4px solid #28a745; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
                .success-icon { color: #28a745; font-size: 48px; text-align: center; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header"><img src="https://sarayatech.netlify.app/logo-v1.png" alt="SarayaTech" class="logo"/></div>
                <h1>Bonjour ${data.fullName},</h1>
                <p>Merci pour votre message ! Nous avons bien reçu votre demande concernant : <strong>${data.subject}</strong></p>
                <div class="message-content">
                    <h3>Récapitulatif de votre message :</h3>
                    <p><strong>Sujet :</strong> ${data.subject}</p>
                    <p><strong>Message :</strong></p>
                    <p style="font-style: italic;">${data.message}</p>
                </div>
                <p>Notre équipe va examiner votre demande et vous répondra dans les plus brefs délais (généralement sous 24-48h).</p>
                <p>Si vous avez des questions urgentes, n'hésitez pas à nous recontacter.</p>
                <p>Cordialement,<br>L'équipe SarayaTech</p>
                <div class="footer">
                    <p>© 2025 SarayaTech. Tous droits réservés.</p>
                    <p>Email : ${this.sarayaEmail}</p>
                </div>
            </div>
        </body>
        </html>`,
    } as EmailTemplate<ContactDto>,

    contactNotification: {
      subject: (data: ContactDto) =>
        `Nouveau contact: ${data.subject} - ${data.fullName}`,
      generateHtml: (data: ContactDto) => `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouveau message de contact - SarayaTech Solution</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
                .container { background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .header { text-align: center; border-bottom: 2px solid #dc3545; padding-bottom: 20px; margin-bottom: 20px; }
                .logo { color: #dc3545; font-size: 24px; font-weight: bold; }
                h1 { color: #dc3545; margin-bottom: 20px; }
                .client-info { background-color: #fff3cd; padding: 20px; border-left: 4px solid #ffc107; margin: 20px 0; }
                .message-content { background-color: #f8f9fa; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0; }
                .info-row { margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #eee; }
                .label { font-weight: bold; color: #555; }
                .urgent { background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin: 10px 0; text-align: center; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
						<div class="header"><img src="https://sarayatech.netlify.app/logo-v1.png" alt="SarayaTech" class="logo"/></div>
                <div class="header"><div class="logo">🔔 SarayaTech Admin</div></div>
                <h1>Nouveau message de contact</h1>
                <div class="urgent">📩 Nouveau message reçu - Action requise</div>
                <div class="client-info">
                    <h3>📋 Informations du client :</h3>
                    <div class="info-row"><span class="label">Nom complet :</span> ${data.fullName}</div>
                    <div class="info-row"><span class="label">Email :</span> <a href="mailto:${data.email}">${data.email}</a></div>
                    <div class="info-row"><span class="label">Sujet :</span> ${data.subject}</div>
                    <div class="info-row"><span class="label">Date :</span> ${new Date().toLocaleDateString(
                      'fr-FR',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      },
                    )}</div>
                </div>
                <div class="message-content">
                    <h3>💬 Message du client :</h3>
                    <p style="white-space: pre-wrap;">${data.message}</p>
                </div>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="mailto:${data.email}?subject=Re: ${data.subject}" 
                      style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                      📧 Répondre directement
                    </a>
                </div>
                <p style="text-align: center; color: #666; font-size: 12px;">
                    Un email de confirmation a été automatiquement envoyé au client.
                </p>
            </div>
        </body>
        </html>`,
    } as EmailTemplate<ContactDto>,

    quoteRequest: {
      subject: (data: QuoteDto) =>
        `Nouvelle demande de devis: ${data.projectType} - ${data.fullName}`,
      generateHtml: (data: QuoteDto) => `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouvelle demande de devis - SarayaTech</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
                .container { background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .header { text-align: center; border-bottom: 2px solid #dc3545; padding-bottom: 20px; margin-bottom: 20px; }
                .logo { color: #dc3545; font-size: 24px; font-weight: bold; }
                h1 { color: #dc3545; margin-bottom: 20px; }
                .client-info { background-color: #fff3cd; padding: 20px; border-left: 4px solid #ffc107; margin: 20px 0; }
                .message-content { background-color: #f8f9fa; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0; }
                .info-row { margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #eee; }
                .label { font-weight: bold; color: #555; }
                .urgent { background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin: 10px 0; text-align: center; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header"><div class="logo">🔔 SarayaTechSolution Admin</div></div>
								<div class="header"><img src="https://sarayatech.netlify.app/logo-v1.png" alt="SarayaTech" class="logo"/></div>
                <h1>Nouvelle demande de devis</h1>
                <div class="urgent">📋 Nouvelle demande de devis reçue - Action requise</div>
                <div class="client-info">
                    <h3>📋 Informations du client :</h3>
                    <div class="info-row"><span class="label">Nom complet :</span> ${data.fullName}</div>
                    <div class="info-row"><span class="label">Email :</span> <a href="mailto:${data.email}">${data.email}</a></div>
                    ${data.company ? `<div class="info-row"><span class="label">Entreprise :</span> ${data.company}</div>` : ''}
                    ${data.phone ? `<div class="info-row"><span class="label">Téléphone :</span> ${data.phone}</div>` : ''}
                    <div class="info-row"><span class="label">Type de projet :</span> ${data.projectType}</div>
                    <div class="info-row"><span class="label">Budget :</span> ${data.budget}</div>
                    <div class="info-row"><span class="label">Délai :</span> ${data.timeframe}</div>
                    <div class="info-row"><span class="label">Date :</span> ${new Date().toLocaleDateString(
                      'fr-FR',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      },
                    )}</div>
                </div>
                <div class="message-content">
                    <h3>💬 Détails du projet :</h3>
                    <p><strong>Description :</strong> ${data.projectDescription}</p>
                    <p><strong>Services :</strong> ${data.services.join(', ')}</p>
                    ${data.additionalInfo ? `<p><strong>Informations supplémentaires :</strong> ${data.additionalInfo}</p>` : ''}
                </div>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="mailto:${data.email}?subject=Re: Demande de devis - ${data.projectType}" 
                      style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                      📧 Répondre directement
                    </a>
                </div>
                <p style="text-align: center; color: #666; font-size: 12px;">
                    Un email de confirmation a été automatiquement envoyé au client.
                </p>
            </div>
        </body>
        </html>`,
    } as EmailTemplate<QuoteDto>,

    quoteConfirmation: {
      subject: () => `Confirmation de votre demande de devis - SarayaTech 🚀`,
      generateHtml: (data: QuoteDto) => `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmation de demande de devis - SarayaTech</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
                .container { background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                .header { text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 20px; margin-bottom: 20px; }
                .logo { color: #007bff; font-size: 24px; font-weight: bold; }
                h1 { color: #007bff; margin-bottom: 20px; }
                .message-content { background-color: #f8f9fa; padding: 20px; border-left: 4px solid #28a745; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
                .success-icon { color: #28a745; font-size: 48px; text-align: center; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header"><div class="logo">SarayaTech</div></div>
								<div class="header"><img src="https://sarayatech.netlify.app/logo-v1.png" alt="SarayaTech" class="logo"/></div>
                <h1>Bonjour ${data.fullName},</h1>
                <p>Merci pour votre demande de devis ! Nous avons bien reçu votre demande pour le projet : <strong>${data.projectType}</strong></p>
                <div class="message-content">
                    <h3>Récapitulatif de votre demande :</h3>
                    <p><strong>Type de projet :</strong> ${data.projectType}</p>
                    <p><strong>Budget :</strong> ${data.budget}</p>
                    <p><strong>Délai :</strong> ${data.timeframe}</p>
                    <p><strong>Description :</strong> ${data.projectDescription}</p>
                    <p><strong>Services :</strong> ${data.services.join(', ')}</p>
                    ${data.company ? `<p><strong>Entreprise :</strong> ${data.company}</p>` : ''}
                    ${data.phone ? `<p><strong>Téléphone :</strong> ${data.phone}</p>` : ''}
                    ${data.additionalInfo ? `<p><strong>Informations supplémentaires :</strong> ${data.additionalInfo}</p>` : ''}
                </div>
                <p>Notre équipe va examiner votre demande et vous répondra dans les plus brefs délais (généralement sous 24-48h).</p>
                <p>Si vous avez des questions urgentes, n'hésitez pas à nous recontacter.</p>
                <p>Cordialement,<br>L'équipe SarayaTech</p>
                <div class="footer">
                    <p>© 2025 SarayaTech. Tous droits réservés.</p>
                    <p>Email : ${this.sarayaEmail}</p>
                </div>
            </div>
        </body>
        </html>`,
    } as EmailTemplate<QuoteDto>,
  } as const;

  private async sendMail<T>(
    to: string,
    template: EmailTemplate<T>,
    data: T,
  ): Promise<void> {
    await this.transporter().sendMail({
      from: this.sarayaEmail,
      to,
      subject: template.subject(data),
      html: template.generateHtml(data),
    });
  }

  async sendContactMessage(contactDto: ContactDto): Promise<void> {
    try {
      await Promise.all([
        this.sendMail(
          contactDto.email,
          this.templates.contactConfirmation,
          contactDto,
        ),
        this.sendMail(
          this.sarayaEmail,
          this.templates.contactNotification,
          contactDto,
        ),
      ]);
      console.log('Emails envoyés avec succès');
    } catch (error) {
      console.error("Erreur lors de l'envoi des emails:", error);
      throw error;
    }
  }

  async sendQuoteRequest(quoteDto: QuoteDto): Promise<void> {
    try {
      await Promise.all([
        this.sendMail(
          quoteDto.email,
          this.templates.quoteConfirmation,
          quoteDto,
        ),
        this.sendMail(this.sarayaEmail, this.templates.quoteRequest, quoteDto),
      ]);
      console.log('Emails de devis envoyés avec succès');
    } catch (error) {
      console.error("Erreur lors de l'envoi des emails de devis:", error);
      throw error;
    }
  }
}
