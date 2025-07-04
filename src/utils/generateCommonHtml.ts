export const generateCommonHtml = (
  lang: 'fr' | 'en',
  content: string,
  sarayaEmail: string = 'info@saraya.tech',
): string => {
  return `
      <!DOCTYPE html>
      <html lang="${lang}">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; }
              .container { background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { text-align: center; border-bottom: 2px solid ${lang == 'fr' ? '#ff4800' : ' #007bff'}; padding-bottom: 20px; margin-bottom: 20px; }
              .logo { color: ${lang == 'fr' ? '#ff4800' : ' #007bff'}; font-size: 24px; font-weight: bold; }
              h1 { color: ${lang == 'fr' ? '#ff4800' : ' #007bff'}; margin-bottom: 20px; }
              .message-content { background-color: #f8f9fa; padding: 20px; border-left: 4px solid #28a745; margin: 20px 0; }
              .client-info { background-color: #fff3cd; padding: 20px; border-left: 4px solid #ffc107; margin: 20px 0; }
              .info-row { margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #eee; }
              .label { font-weight: bold; color: #555; }
              .urgent { background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin: 10px 0; text-align: center; font-weight: bold; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
              .success-icon { color: #28a745; font-size: 48px; text-align: center; margin: 20px 0; }
          </style>
      </head>
      <body>
          <div class="container">
              ${content}
              <div class="footer">
                  <p>© 2025 SarayaTech. All rights reserved.</p>
                  <p>Email: ${sarayaEmail}</p>
              </div>
          </div>
      </body>
      </html>`;
};
