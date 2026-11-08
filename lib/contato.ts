export const CONTACT_LIMITS = {
  nomeMin: 2,
  nomeMax: 100,
  emailMax: 254,
  mensagemMin: 10,
  mensagemMax: 3000,
} as const;

export type ContactField = 'nome' | 'email' | 'mensagem';
export type ContactFieldError = 'required' | 'too_short' | 'too_long' | 'invalid';

export interface ContactInput {
  nome: string;
  email: string;
  mensagem: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeContact(raw: { nome?: unknown; email?: unknown; mensagem?: unknown }): ContactInput {
  const text = (value: unknown) => (typeof value === 'string' ? value : '');
  const nome = text(raw.nome).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
  const email = text(raw.email).replace(/[\u0000-\u001f\u007f]/g, '').trim();
  const mensagem = text(raw.mensagem)
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, '')
    .trim();
  return { nome, email, mensagem };
}

export function validateContact(input: ContactInput): Partial<Record<ContactField, ContactFieldError>> {
  const errors: Partial<Record<ContactField, ContactFieldError>> = {};
  const { nomeMin, nomeMax, emailMax, mensagemMin, mensagemMax } = CONTACT_LIMITS;
  if (!input.nome) errors.nome = 'required';
  else if (input.nome.length < nomeMin) errors.nome = 'too_short';
  else if (input.nome.length > nomeMax) errors.nome = 'too_long';
  if (!input.email) errors.email = 'required';
  else if (input.email.length > emailMax) errors.email = 'too_long';
  else if (!EMAIL_PATTERN.test(input.email)) errors.email = 'invalid';
  if (!input.mensagem) errors.mensagem = 'required';
  else if (input.mensagem.length < mensagemMin) errors.mensagem = 'too_short';
  else if (input.mensagem.length > mensagemMax) errors.mensagem = 'too_long';
  return errors;
}
