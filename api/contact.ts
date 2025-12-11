import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Metoda není povolena',
    });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Server-side validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Vyplňte prosím všechna povinná pole.',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Zadejte prosím platnou emailovou adresu.',
      });
    }

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: 'AsperroStudio <noreply@asperrostudio.cz>',
      to: ['mpenkava1337@gmail.com'],
      replyTo: email,
      subject: `Nová zpráva od ${name} - AsperroStudio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
            Nová zpráva z kontaktního formuláře
          </h2>

          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Jméno:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Telefon:</strong> ${phone || 'Neuveden'}</p>
          </div>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Zpráva:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

          <p style="color: #999; font-size: 12px; text-align: center;">
            Tato zpráva byla odeslána z kontaktního formuláře na
            <a href="https://www.asperrostudio.cz" style="color: #06b6d4;">www.asperrostudio.cz</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({
        success: false,
        message: 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Zpráva byla úspěšně odeslána!',
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      message: 'Došlo k chybě serveru. Zkuste to prosím později.',
    });
  }
}
