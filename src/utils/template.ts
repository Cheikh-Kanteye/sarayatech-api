import { ContactDto } from 'src/dto/contact.dto';
import { QuoteDto } from 'src/dto/quote.dto';

export interface EmailTemplate<T = any> {
  subject: (data: T) => string;
  content: (data: T) => string;
}

export const templates = {
  contactConfirmation: {
    fr: {
      subject: () => `Confirmation de réception - SarayaTech Sénégal 🚀`,
      content: (data: ContactDto) => `
        <h1>Bonjour ${data.name},</h1>
        <p>Merci pour votre message ! Nous avons bien reçu votre demande concernant : <strong>${data.subject}</strong></p>
        <div class="message-content">
            <h3>Récapitulatif de votre message :</h3>
            <p><strong>Sujet :</strong> ${data.subject}</p>
            <p><strong>Message :</strong></p>
            <p style="font-style: italic;">${data.message}</p>
        </div>
        <p>Notre équipe va examiner votre demande et vous répondra dans les plus brefs délais (généralement sous 24-48h).</p>
        <p>Si vous avez des questions urgentes, n'hésitez pas à nous recontacter.</p>
        <p>Cordialement,<br>L'équipe SarayaTech Sénégal</p>`,
    } as EmailTemplate<ContactDto>,
    en: {
      subject: () => `Receipt Confirmation - SarayaTech Solutions🚀`,
      content: (data: ContactDto) => `
        <h1>Hello ${data.name},</h1>
        <p>Thank you for your message! We have successfully received your request regarding: <strong>${data.subject}</strong></p>
        <div class="message-content">
            <h3>Summary of Your Message:</h3>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="font-style: italic;">${data.message}</p>
        </div>
        <p>Our team will review your request and respond as soon as possible (typically within 24-48 hours).</p>
        <p>If you have any urgent questions, please feel free to contact us again.</p>
        <p>Best regards,<br>The SarayaTech Solution Team</p>`,
    } as EmailTemplate<ContactDto>,
  },
  contactNotification: {
    fr: {
      subject: (data: ContactDto) =>
        `Nouveau contact: ${data.subject} - ${data.name}`,
      content: (data: ContactDto) => `
        <div class="header"><div class="logo">🔔 SarayaTech Sénégal Admin</div></div>
        <h1>Nouveau message de contact</h1>
        <div class="urgent">📩 Nouveau message reçu - Action requise</div>
        <div class="client-info">
            <h3>📋 Informations du client :</h3>
            <div class="info-row"><span class="label">Nom complet :</span> ${data.name}</div>
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
              style="display: inline-block; padding: 12px 24px; background-color:rgb(255, 38, 0); color: white; text-decoration: none; border-radius: 5px;">
              📧 Répondre directement
            </a>
        </div>
        <p style="text-align: center; color: #666; font-size: 12px;">
            Un email de confirmation a été automatiquement envoyé au client.
        </p>`,
    } as EmailTemplate<ContactDto>,
    en: {
      subject: (data: ContactDto) =>
        `New Contact: ${data.subject} - ${data.name}`,
      content: (data: ContactDto) => `
        <div class="header"><div class="logo">🔔 SarayaTech Solutions Admin</div></div>
        <h1>New Contact Message</h1>
        <div class="urgent">📩 New Message Received - Action Required</div>
        <div class="client-info">
            <h3>📋 Client Information:</h3>
            <div class="info-row"><span class="label">Full Name:</span> ${data.name}</div>
            <div class="info-row"><span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a></div>
            <div class="info-row"><span class="label">Subject:</span> ${data.subject}</div>
            <div class="info-row"><span class="label">Date:</span> ${new Date().toLocaleDateString(
              'en-US',
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
            <h3>💬 Client Message:</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${data.email}?subject=Re: ${data.subject}" 
              style="display: inline-block; padding: 12px 24px; background-color:rgb(0, 38, 255); color: white; text-decoration: none; border-radius: 5px;">
              📧 Reply Directly
            </a>
        </div>
        <p style="text-align: center; color: #666; font-size: 12px;">
            A confirmation email has been automatically sent to the client.
        </p>`,
    } as EmailTemplate<ContactDto>,
  },
  quoteRequest: {
    fr: {
      subject: (data: QuoteDto) =>
        `Nouvelle demande de devis: ${data.projectType} - ${data.name}`,
      content: (data: QuoteDto) => `
        <div class="header"><div class="logo">🔔 SarayaTech Sénégal Admin</div></div>
        <h1>Nouvelle demande de devis</h1>
        <div class="urgent">📋 Nouvelle demande de devis reçue - Action requise</div>
        <div class="client-info">
            <h3>📋 Informations du client :</h3>
            <div class="info-row"><span class="label">Nom complet :</span> ${data.name}</div>
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
              style="display: inline-block; padding: 12px 24px; background-color:rgb(255, 51, 0); color: white; text-decoration: none; border-radius: 5px;">
              📧 Répondre directement
            </a>
        </div>
        <p style="text-align: center; color: #666; font-size: 12px;">
            Un email de confirmation a été automatiquement envoyé au client.
        </p>`,
    } as EmailTemplate<QuoteDto>,
    en: {
      subject: (data: QuoteDto) =>
        `New Quote Request: ${data.projectType} - ${data.name}`,
      content: (data: QuoteDto) => `
        <div class="header"><div class="logo">🔔 SarayaTech Solutions Admin</div></div>
        <h1>New Quote Request</h1>
        <div class="urgent">📋 New Quote Request Received - Action Required</div>
        <div class="client-info">
            <h3>📋 Client Information:</h3>
            <div class="info-row"><span class="label">Full Name:</span> ${data.name}</div>
            <div class="info-row"><span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a></div>
            ${data.company ? `<div class="info-row"><span class="label">Company:</span> ${data.company}</div>` : ''}
            ${data.phone ? `<div class="info-row"><span class="label">Phone:</span> ${data.phone}</div>` : ''}
            <div class="info-row"><span class="label">Project Type:</span> ${data.projectType}</div>
            <div class="info-row"><span class="label">Budget:</span> ${data.budget}</div>
            <div class="info-row"><span class="label">Timeframe:</span> ${data.timeframe}</div>
            <div class="info-row"><span class="label">Date:</span> ${new Date().toLocaleDateString(
              'en-US',
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
            <h3>💬 Project Details:</h3>
            <p><strong>Description:</strong> ${data.projectDescription}</p>
            <p><strong>Services:</strong> ${data.services.join(', ')}</p>
            ${data.additionalInfo ? `<p><strong>Additional Information:</strong> ${data.additionalInfo}</p>` : ''}
        </div>
        <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${data.email}?subject=Re: Quote Request - ${data.projectType}" 
              style="display: inline-block; padding: 12px 24px; background-color:rgb(0, 89, 255); color: white; text-decoration: none; border-radius: 5px;">
              📧 Reply Directly
            </a>
        </div>
        <p style="text-align: center; color: #666; font-size: 12px;">
            A confirmation email has been automatically sent to the client.
        </p>`,
    } as EmailTemplate<QuoteDto>,
  },
  quoteConfirmation: {
    fr: {
      subject: () =>
        `Confirmation de votre demande de devis - SarayaTech Sénégal🚀`,
      content: (data: QuoteDto) => `
        <h1>Bonjour ${data.name},</h1>
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
        <p>Cordialement,<br>L'équipe SarayaTech Sénégal</p>`,
    } as EmailTemplate<QuoteDto>,
    en: {
      subject: () =>
        `Confirmation of Your Quote Request - SarayaTech  Solution🚀`,
      content: (data: QuoteDto) => `
        <h1>Hello ${data.name},</h1>
        <p>Thank you for your quote request! We have successfully received your request for the project: <strong>${data.projectType}</strong></p>
        <div class="message-content">
            <h3>Summary of Your Request:</h3>
            <p><strong>Project Type:</strong> ${data.projectType}</p>
            <p><strong>Budget:</strong> ${data.budget}</p>
            <p><strong>Timeframe:</strong> ${data.timeframe}</p>
            <p><strong>Description:</strong> ${data.projectDescription}</p>
            <p><strong>Services:</strong> ${data.services.join(', ')}</p>
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            ${data.additionalInfo ? `<p><strong>Additional Information:</strong> ${data.additionalInfo}</p>` : ''}
        </div>
        <p>Our team will review your request and respond as soon as possible (typically within 24-48 hours).</p>
        <p>If you have any urgent questions, please feel free to contact us again.</p>
        <p>Best regards,<br>The SarayaTech Solutions Team</p>`,
    } as EmailTemplate<QuoteDto>,
  },
} as const;
