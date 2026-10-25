'use client';

import { Fragment, useEffect, useId, useRef, useState } from 'react';
import type { Lang } from '@/types';
import type { SiteContent } from '@/lib/content';
import { ICONS } from '@/lib/icons';
import { MAX_HISTORY_ITEM_CHARS, MAX_QUESTION_CHARS, answer, stripInterruptedNote, streamAssistant } from '@/lib/assistant-kb';

interface Message {
  role: 'bot' | 'user';
  text: string;
  fallback?: boolean;
}

/* Minimal typings for the Web Speech API. The standard DOM lib does not
   ship these, and the API is exposed as SpeechRecognition (standard) or
   webkitSpeechRecognition (Chrome/Safari). We only declare what we use. */
interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: { transcript: string };
}
interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: { length: number } & Record<number, SpeechRecognitionResultLike>;
}
interface SpeechRecognitionErrorLike {
  error?: string;
}
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: SpeechRecognitionErrorLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}
type SpeechRecognitionClass = new () => SpeechRecognitionLike;

function fallbackNote(lang: Lang): string {
  return lang === 'en'
    ? "Answer from the site's local knowledge base. The AI is unavailable right now."
    : 'Resposta da base local do site. A IA está indisponível agora.';
}

function getSpeechRecognition(): SpeechRecognitionClass | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionClass;
    webkitSpeechRecognition?: SpeechRecognitionClass;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function Assistant({ t, lang }: { t: SiteContent; lang: Lang }) {
  const A = t.asst;
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([{ role: 'bot', text: A.greet }]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fabRef = useRef<HTMLButtonElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const sendingRef = useRef(false);
  const requestTokenRef = useRef(0);
  const requestControllerRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  const currentLangRef = useRef(lang);
  const [announcement, setAnnouncement] = useState('');
  const inputId = useId();
  const titleId = useId();
  currentLangRef.current = lang;

  // Voice input (speech-to-text) state.
  const [sttSupported, setSttSupported] = useState(false);
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  // Set when the current capture should be discarded (the user tapped the mic
  // to cancel), so onend does not send a half-spoken question.
  const cancelledRef = useRef(false);

  // Discreet, self-dismissing status message (mic permission).
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function notify(msg: string) {
    setNotice(msg);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => setNotice(null), 4500);
  }

  // reset greeting when language changes
  useEffect(() => {
    requestTokenRef.current += 1;
    requestControllerRef.current?.abort();
    requestControllerRef.current = null;
    sendingRef.current = false;
    setTyping(false);
    setAnnouncement('');
    setInput('');
    setNotice(null);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    setMsgs([{ role: 'bot', text: t.asst.greet }]);
    stopVoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Release microphone resources when the component unmounts.
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      requestTokenRef.current += 1;
      requestControllerRef.current?.abort();
      requestControllerRef.current = null;
      cancelledRef.current = true;
      const recognition = recognitionRef.current;
      if (recognition) {
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
        recognition.stop();
      }
      if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typing]);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      const id = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(id);
    }
    if (wasOpenRef.current) {
      const target = returnFocusRef.current;
      (target?.isConnected ? target : fabRef.current)?.focus();
      wasOpenRef.current = false;
    }
  }, [open]);

  function openAssistant() {
    if (!wasOpenRef.current) {
      const active = document.activeElement;
      returnFocusRef.current = active instanceof HTMLElement && active !== document.body
        ? active
        : null;
    }
    openRef.current = true;
    setOpen(true);
  }

  function closeAssistant() {
    openRef.current = false;
    stopVoice();
    setOpen(false);
  }

  useEffect(() => {
    const handleOpen = (event: Event) => {
      openAssistant();
      const question = event instanceof CustomEvent ? event.detail?.question : undefined;
      if (typeof question === 'string' && question.trim()) {
        stopVoice();
        setInput(question.slice(0, MAX_QUESTION_CHARS));
        inputRef.current?.focus();
      }
    };
    window.addEventListener('portfolio:open-assistant', handleOpen);
    return () => window.removeEventListener('portfolio:open-assistant', handleOpen);
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (!openRef.current) return;
      if (e.key === 'Escape') {
        closeAssistant();
        return;
      }
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!(active instanceof Node) || !panel.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  });

  // Replace (or append) the streaming bot message at the end of the list.
  function upsertBotMessage(text: string, fallback = false) {
    setMsgs((m) => {
      const last = m[m.length - 1];
      if (last && last.role === 'bot') {
        const next = m.slice();
        next[next.length - 1] = { role: 'bot', text, fallback };
        return next;
      }
      return [...m, { role: 'bot', text, fallback }];
    });
  }

  async function send(q?: string) {
    const question = (q ?? input).trim().slice(0, MAX_QUESTION_CHARS);
    if (!question || sendingRef.current) return;
    sendingRef.current = true;
    const token = ++requestTokenRef.current;
    const controller = new AbortController();
    requestControllerRef.current = controller;
    const requestLang = lang;
    const isCurrent = () => mountedRef.current
      && token === requestTokenRef.current
      && currentLangRef.current === requestLang;
    stopVoice();
    setAnnouncement('');
    // Recent history gives the assistant memory of the conversation so far.
    const history = msgs.slice(-8).map((m) => ({ role: m.role, text: stripInterruptedNote(m.text).slice(0, MAX_HISTORY_ITEM_CHARS) }));
    setMsgs((m) => [...m, { role: 'user', text: question }]);
    setInput('');
    setTyping(true);

    let full = '';
    let fromLocal = false;
    try {
      full = await streamAssistant(question, lang, history, (soFar) => {
        if (isCurrent()) upsertBotMessage(soFar, fromLocal);
      }, controller.signal, (mode) => {
        fromLocal = mode === 'fallback';
      });
    } catch {
      full = '';
    }

    if (!isCurrent()) return;
    requestControllerRef.current = null;
    if (!full) {
      full = answer(question, lang);
      fromLocal = true;
    }
    // Normalize the bot bubble to the final text .
    upsertBotMessage(full, fromLocal);
    sendingRef.current = false;
    setTyping(false);
    setAnnouncement(fromLocal ? `${full} ${fallbackNote(lang)}` : full);
  }

  // Feature-detect speech recognition on mount (client-only) to avoid
  // SSR hydration mismatch, then expose the mic button only where supported.
  useEffect(() => {
    setSttSupported(getSpeechRecognition() !== null);
  }, []);

  // Cancel the current capture (if any) and stop showing it as recording.
  function stopVoice() {
    const recognition = recognitionRef.current;
    if (recognition) {
      cancelledRef.current = true;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognitionRef.current = null;
      recognition.stop();
    }
    setRecording(false);
  }

  // A single voice capture. The mic listens for one question and then stops.
  // It does not re-arm itself: asking again requires another tap on the mic.
  function startListening() {
    const SR = getSpeechRecognition();
    if (!SR || recognitionRef.current || sendingRef.current) return;
    cancelledRef.current = false;

    const rec = new SR();
    rec.lang = lang === 'en' ? 'en-US' : 'pt-BR';
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;

    // `finalText` holds confirmed results. `lastInterim` keeps the latest
    // provisional text as a fallback, because some browsers end recognition
    // without ever marking the phrase as final. Without this fallback the
    // spoken question would be silently dropped.
    let finalText = '';
    let lastInterim = '';
    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript;
        else interim += r[0].transcript;
      }
      lastInterim = interim;
      setInput((finalText + interim).trim());
    };
    rec.onerror = (e) => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        notify(
          lang === 'en'
            ? 'Allow microphone access to use voice.'
            : 'Permita o acesso ao microfone para usar a voz.',
        );
      } else if (e.error && e.error !== 'no-speech' && e.error !== 'aborted') {
        notify(
          lang === 'en' ? 'Could not access the microphone.' : 'Não consegui acessar o microfone.',
        );
      }
      setRecording(false);
    };
    rec.onend = () => {
      setRecording(false);
      recognitionRef.current = null;
      setInput('');
      // Cancelled by tapping the mic again: discard the partial speech.
      if (cancelledRef.current) {
        cancelledRef.current = false;
        return;
      }
      const q = (finalText || lastInterim).trim();
      if (q) send(q);
    };

    recognitionRef.current = rec;
    setRecording(true);
    try {
      rec.start();
    } catch {
      setRecording(false);
      recognitionRef.current = null;
    }
  }

  // Mic button: tap to talk. While recording, a tap cancels. Otherwise a tap
  // starts one capture.
  function micTap() {
    if (recording) {
      stopVoice();
      setInput('');
      return;
    }
    startListening();
  }

  return (
    <>
      {!open && (
        <button ref={fabRef} className="asst-fab" onClick={openAssistant} aria-label={A.title} aria-haspopup="dialog">
          <span dangerouslySetInnerHTML={{ __html: ICONS.bot }} style={{ display: 'flex', width: 19, height: 19 }} />
          <span className="asst-fab-label">{lang === 'en' ? 'Assistant' : 'Assistente'}</span>
        </button>
      )}

      {open && (
        <div className="asst-panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <div className="asst-head">
            <div className="asst-ava" dangerouslySetInnerHTML={{ __html: ICONS.bot }} />
            <div>
              <div className="ti" id={titleId}>{A.title}</div>
              <div className="su">
                <i />
                {A.sub}
              </div>
            </div>
            <button className="asst-close" onClick={closeAssistant} aria-label={lang === 'en' ? 'Close assistant' : 'Fechar assistente'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="asst-body" ref={bodyRef} role="region" aria-label={lang === 'en' ? 'Conversation' : 'Conversa'} aria-busy={typing}>
            {msgs.map((m, i) => {
              return (
                <Fragment key={i}>
                  <div className={`msg ${m.role}`}>
                    {m.text}
                  </div>
                  {m.role === 'bot' && m.fallback && m.text.trim() !== '' && !(typing && i === msgs.length - 1) && (
                    <div className="msg-note">{fallbackNote(lang)}</div>
                  )}
                </Fragment>
              );
            })}
            {typing && (
              <div className="asst-typing" role="status" aria-label={lang === 'en' ? 'Preparing answer' : 'Preparando resposta'}>
                <i />
                <i />
                <i />
              </div>
            )}
          </div>

          {msgs.length <= 1 && (
            <div className="asst-chips">
              {A.chips.map((c, i) => (
                <button key={i} className="asst-chip" onClick={() => send(c)} disabled={typing}>
                  {c}
                </button>
              ))}
            </div>
          )}

          {notice && (
            <div className="asst-notice" role="status">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 14, height: 14, flex: 'none' }}>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" />
              </svg>
              {notice}
            </div>
          )}

          <div className="asst-input">
            {sttSupported && (
              <button
                className={`asst-mic${recording ? ' is-recording' : ''}`}
                onClick={micTap}
                disabled={typing}
                aria-pressed={recording}
                aria-label={
                  recording
                    ? lang === 'en'
                      ? 'Stop recording'
                      : 'Parar gravação'
                    : lang === 'en'
                      ? 'Ask by voice'
                      : 'Perguntar por voz'
                }
                dangerouslySetInnerHTML={{ __html: ICONS.mic }}
              />
            )}
            <input
              id={inputId}
              ref={inputRef}
              aria-label={lang === 'en' ? 'Your question about Diego' : 'Sua pergunta sobre o Diego'}
              value={input}
              maxLength={MAX_QUESTION_CHARS}
              placeholder={
                recording
                  ? lang === 'en'
                    ? 'Listening…'
                    : 'Ouvindo…'
                  : A.placeholder
              }
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') send();
              }}
            />
            <button onClick={() => send()} disabled={typing || !input.trim()} aria-label={lang === 'en' ? 'Send question' : 'Enviar pergunta'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m5 12 14 0M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clipPath: 'inset(50%)', whiteSpace: 'nowrap', border: 0 }}
          >
            {announcement}
          </div>
        </div>
      )}
    </>
  );
}
