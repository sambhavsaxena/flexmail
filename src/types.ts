export interface EmailAccount {
  email: string;
  token: string;
}

export interface EmailMessage {
  id: string;
  from: string;
  to: string;
  cc: string | null;
  subject: string;
  body_text: string;
  body_html: string;
  created_at: string;
  attachments: any[];
}