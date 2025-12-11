import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Security constants for input validation
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 5000;

// CORS allowed origin
const ALLOWED_ORIGIN = 'https://www.asperrostudio.cz';

// TypeScript interface for request body
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  _honeypot?: string; // Honeypot field for spam protection
}

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param text - The text to escape
 * @returns The escaped text safe for HTML insertion
 */
function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char);
}

/**
 * Validates that the request body is a valid object with expected fields
 * @param body - The request body to validate
 * @returns true if valid, false otherwise
 */
function isValidRequestBody(body: any): body is ContactFormData {
  return (
    body !== null &&
    typeof body === 'object' &&
    !Array.isArray(body)
  );
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Metoda není povolena',
    });
  }

  // Validate Content-Type header
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    return res.status(400).json({
      success: false,
      message: 'Neplatný Content-Type. Očekává se application/json.',
    });
  }

  try {
    // Validate request body is a valid object
    if (!isValidRequestBody(req.body)) {
      return res.status(400).json({
        success: false,
        message: 'Neplatný formát dat.',
      });
    }

    let { name, email, phone, message, _honeypot } = req.body;

    // Honeypot spam protection - silently succeed if filled
    if (_honeypot) {
      // Bot detected - return success without sending email
      return res.status(200).json({
        success: true,
        message: 'Zpráva byla úspěšně odeslána!',
      });
    }

    // Trim whitespace from inputs
    name = name?.trim();
    email = email?.trim();
    phone = phone?.trim();
    message = message?.trim();

    // Server-side validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Vyplňte prosím všechna povinná pole.',
      });
    }

    // Input length validation
    if (name.length > MAX_NAME_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Jméno je příliš dlouhé (maximum ${MAX_NAME_LENGTH} znaků).`,
      });
    }

    if (email.length > MAX_EMAIL_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Email je příliš dlouhý (maximum ${MAX_EMAIL_LENGTH} znaků).`,
      });
    }

    if (phone && phone.length > MAX_PHONE_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Telefon je příliš dlouhý (maximum ${MAX_PHONE_LENGTH} znaků).`,
      });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Zpráva je příliš dlouhá (maximum ${MAX_MESSAGE_LENGTH} znaků).`,
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

    // Escape all user inputs to prevent XSS
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : 'Neuveden';
    const safeMessage = escapeHtml(message);

    // Send email using Resend with sanitized content
    const { error } = await resend.emails.send({
      from: 'AsperroStudio <noreply@asperrostudio.cz>',
      to: ['mpenkava1337@gmail.com'],
      replyTo: email, // Original email for reply functionality
      subject: `Nová zpráva od ${safeName} - AsperroStudio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
            Nová zpráva z kontaktního formuláře
          </h2>

          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Jméno:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p style="margin: 10px 0;"><strong>Telefon:</strong> ${safePhone}</p>
          </div>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Zpráva:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
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
