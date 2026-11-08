'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Lang } from '@/types';
import { CONTACT_LIMITS, normalizeContact, validateContact } from '@/lib/contato';
import type { ContactField, ContactFieldError } from '@/lib/contato';
import { privacyPath } from '@/lib/site-nav';

const FORM_UI = {
  pt: {
    nome: 'Nome',
    email: 'E-mail',
    mensagem: 'Mensagem',
    mensagemDica: 'Conte o contexto do projeto',
    armadilha: 'Não preencha este campo',
    enviar: 'Enviar mensagem',
    enviando: 'Enviando…',
    sucesso: 'Mensagem enviada. Vou responder no e-mail informado.',
    erro: 'Não foi possível enviar agora. Tente de novo em alguns minutos ou fale pelo LinkedIn.',
    limite: 'Muitas tentativas em pouco tempo. Tente de novo mais tarde.',
    revisar: 'Revise os campos indicados.',
    nota: 'Seus dados são usados só para responder a este contato e ficam guardados por até 12 meses.',
    notaLink: 'Veja o aviso de privacidade.',
    erros: {
      nome: {
        required: 'Informe seu nome.',
        too_short: `O nome precisa ter pelo menos ${CONTACT_LIMITS.nomeMin} caracteres.`,
        too_long: `O nome pode ter até ${CONTACT_LIMITS.nomeMax} caracteres.`,
        invalid: 'Informe seu nome.',
      },
      email: {
        required: 'Informe seu e-mail.',
        too_short: 'Informe um e-mail válido, como nome@exemplo.com.',
        too_long: `O e-mail pode ter até ${CONTACT_LIMITS.emailMax} caracteres.`,
        invalid: 'Informe um e-mail válido, como nome@exemplo.com.',
      },
      mensagem: {
        required: 'Escreva sua mensagem.',
        too_short: `A mensagem precisa ter pelo menos ${CONTACT_LIMITS.mensagemMin} caracteres.`,
        too_long: 'A mensagem pode ter até 3.000 caracteres.',
        invalid: 'Escreva sua mensagem.',
      },
    },
  },
  en: {
    nome: 'Name',
    email: 'Email',
    mensagem: 'Message',
    mensagemDica: 'Tell me about the project',
    armadilha: 'Do not fill in this field',
    enviar: 'Send message',
    enviando: 'Sending…',
    sucesso: 'Message sent. I will reply to the email you provided.',
    erro: 'Could not send it right now. Please try again in a few minutes or reach out on LinkedIn.',
    limite: 'Too many attempts in a short time. Please try again later.',
    revisar: 'Please review the highlighted fields.',
    nota: 'Your details are used only to reply to this message and are kept for up to 12 months.',
    notaLink: 'Read the privacy notice.',
    erros: {
      nome: {
        required: 'Enter your name.',
        too_short: `Your name needs at least ${CONTACT_LIMITS.nomeMin} characters.`,
        too_long: `Your name can have up to ${CONTACT_LIMITS.nomeMax} characters.`,
        invalid: 'Enter your name.',
      },
      email: {
        required: 'Enter your email.',
        too_short: 'Enter a valid email, such as name@example.com.',
        too_long: `Your email can have up to ${CONTACT_LIMITS.emailMax} characters.`,
        invalid: 'Enter a valid email, such as name@example.com.',
      },
      mensagem: {
        required: 'Write your message.',
        too_short: `Your message needs at least ${CONTACT_LIMITS.mensagemMin} characters.`,
        too_long: 'Your message can have up to 3,000 characters.',
        invalid: 'Write your message.',
      },
    },
  },
} as const;

type Errors = Partial<Record<ContactField, ContactFieldError>>;
type Status = { kind: 'ok' | 'error'; text: string } | null;

const FIELDS: ContactField[] = ['nome', 'email', 'mensagem'];
const REQUEST_TIMEOUT_MS = 15_000;

export function ContatoForm({ lang }: { lang: Lang }) {
  const ui = FORM_UI[lang];
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState({ nome: '', email: '', mensagem: '', website: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wasSending = useRef(false);

  useEffect(() => {
    if (wasSending.current && !sending && (document.activeElement === document.body || document.activeElement === null)) {
      buttonRef.current?.focus();
    }
    wasSending.current = sending;
  }, [sending]);

  const focusFirst = (found: Errors) => {
    const first = FIELDS.find((field) => found[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const update = (field: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    if (field !== 'website' && errors[field]) {
      const found = validateContact(normalizeContact(next));
      setErrors((current) => ({ ...current, [field]: found[field] }));
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    const input = normalizeContact(values);
    const found = validateContact(input);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ kind: 'error', text: ui.revisar });
      focusFirst(found);
      return;
    }
    setSending(true);
    setStatus(null);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, idioma: lang, website: values.website }),
        signal: controller.signal,
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; fields?: Errors } | null;
      if (res.ok && data?.ok === true) {
        setValues({ nome: '', email: '', mensagem: '', website: '' });
        setErrors({});
        setStatus({ kind: 'ok', text: ui.sucesso });
      } else if (res.status === 429) {
        setStatus({ kind: 'error', text: ui.limite });
      } else if (data?.error === 'invalid_fields' && data.fields) {
        setErrors(data.fields);
        setStatus({ kind: 'error', text: ui.revisar });
        focusFirst(data.fields);
      } else {
        setStatus({ kind: 'error', text: ui.erro });
      }
    } catch {
      setStatus({ kind: 'error', text: ui.erro });
    } finally {
      clearTimeout(timer);
      setSending(false);
    }
  };

  const describedBy = (field: ContactField, extra?: string) => {
    const ids = [extra, errors[field] ? `contato-${field}-erro` : undefined].filter(Boolean);
    return ids.length ? ids.join(' ') : undefined;
  };

  const errorText = (field: ContactField) => {
    const code = errors[field];
    if (!code) return null;
    return <p className="contato-erro" id={`contato-${field}-erro`}>{ui.erros[field][code]}</p>;
  };

  return (
    <form ref={formRef} className="contato-form" noValidate onSubmit={onSubmit}>
      <div className="contato-campo">
        <label htmlFor="contato-nome">{ui.nome}</label>
        <input
          id="contato-nome"
          name="nome"
          type="text"
          autoComplete="name"
          required
          minLength={CONTACT_LIMITS.nomeMin}
          maxLength={CONTACT_LIMITS.nomeMax}
          value={values.nome}
          onChange={update('nome')}
          aria-invalid={errors.nome ? true : undefined}
          aria-describedby={describedBy('nome')}
        />
        {errorText('nome')}
      </div>
      <div className="contato-campo">
        <label htmlFor="contato-email">{ui.email}</label>
        <input
          id="contato-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
          maxLength={CONTACT_LIMITS.emailMax}
          value={values.email}
          onChange={update('email')}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy('email')}
        />
        {errorText('email')}
      </div>
      <div className="contato-campo">
        <label htmlFor="contato-mensagem">{ui.mensagem}</label>
        <p className="contato-dica" id="contato-mensagem-dica">{ui.mensagemDica}</p>
        <textarea
          id="contato-mensagem"
          name="mensagem"
          rows={7}
          autoComplete="off"
          required
          minLength={CONTACT_LIMITS.mensagemMin}
          maxLength={CONTACT_LIMITS.mensagemMax}
          value={values.mensagem}
          onChange={update('mensagem')}
          aria-invalid={errors.mensagem ? true : undefined}
          aria-describedby={describedBy('mensagem', 'contato-mensagem-dica')}
        />
        {errorText('mensagem')}
      </div>
      <div className="contato-armadilha" aria-hidden="true">
        <label htmlFor="contato-website">{ui.armadilha}</label>
        <input id="contato-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update('website')} />
      </div>
      <div className="contato-enviar">
        <button ref={buttonRef} type="submit" className="btn btn-primary" disabled={sending} aria-disabled={sending ? true : undefined}>
          {sending ? ui.enviando : ui.enviar}
        </button>
        <p className={`contato-status${status ? ` is-${status.kind}` : ''}`} role="status" aria-live="polite">{status?.text ?? ''}</p>
      </div>
      <p className="contato-nota">
        {ui.nota} <Link className="inline-link" href={privacyPath(lang)}>{ui.notaLink}</Link>
      </p>
    </form>
  );
}
