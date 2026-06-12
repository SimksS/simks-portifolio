import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OWNER_EMAIL = 'kelven.souza00@gmail.com';
const DEFAULT_FROM = 'no-reply@simks.com.br';
const MAILERSEND_API_URL = 'https://api.mailersend.com/v1/email';

type Json = Record<string, unknown>;
const json = (data: Json, status: number) => NextResponse.json(data, { status });

export async function POST(request: Request) {
  try {
    let body: Json;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Requisição inválida.' }, 400);
    }

    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim();
    const message = String(body?.message ?? '').trim();
    const projectType = String(body?.projectType ?? '').trim();

    if (name.length < 3) {
      return json({ error: 'O nome precisa de pelo menos 3 caracteres.' }, 400);
    }
    if (!EMAIL_RE.test(email)) {
      return json({ error: 'Email inválido.' }, 400);
    }
    if (message.length < 10) {
      return json({ error: 'A mensagem precisa de pelo menos 10 caracteres.' }, 400);
    }

    const apiKey = process.env.MAILERSEND_API_KEY;
    const fromAddress = process.env.MAILERSEND_FROM || DEFAULT_FROM;

    if (!apiKey) {
      console.warn('[contact] MAILERSEND_API_KEY ausente — mensagem apenas registrada no log do servidor.');
      console.warn('[contact]', { name, email, projectType, message });
      return json(
        { error: 'O envio pelo formulário está temporariamente indisponível.', code: 'not_configured' },
        503
      );
    }

    const payload = {
      from: { email: fromAddress, name: 'Portfolio — Kelven Souza' },
      to: [{ email: OWNER_EMAIL, name: 'Kelven Souza' }],
      reply_to: { email, name },
      subject: `Nova mensagem de ${name} — Portfolio`,
      html: buildHtml({ name, email, message, projectType }),
      text: buildText({ name, email, message, projectType }),
    };

    const response = await fetch(MAILERSEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let providerMessage: string | undefined;
      try {
        const errorBody = await response.json();
        providerMessage =
          typeof errorBody?.message === 'string'
            ? errorBody.message
            : typeof errorBody?.errors === 'object'
              ? JSON.stringify(errorBody.errors)
              : undefined;
      } catch {
        providerMessage = await response.text().catch(() => undefined);
      }

      console.error('[contact] Falha no envio — status:', response.status, '| provider:', providerMessage);

      if (response.status === 401 || response.status === 403) {
        return json(
          { error: 'O serviço de email está com a autenticação inválida no momento.', code: 'auth' },
          502
        );
      }

      return json(
        { error: 'Não consegui enviar agora. Tente novamente em instantes.', code: 'send_failed' },
        502
      );
    }

    return json({ success: true }, 200);
  } catch (err) {
    console.error('[contact] Erro inesperado:', err);
    return json(
      { error: 'Não consegui enviar agora. Tente novamente em instantes.', code: 'unexpected' },
      500
    );
  }
}

// ─── Templates ────────────────────────────────────────────────────────────────

interface Payload {
  name: string;
  email: string;
  message: string;
  projectType: string;
}

function buildHtml({ name, email, message, projectType }: Payload): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nova mensagem do Portfolio</title>
    <style>
      body { font-family: -apple-system, Segoe UI, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px; background: #f4f1ea; }
      .header { background: #16140f; padding: 28px; border-radius: 10px 10px 0 0; }
      .header h1 { color: #f4f1ea; margin: 0; font-size: 20px; font-weight: 600; }
      .header span { color: #e8602c; }
      .content { background: #ffffff; padding: 28px; border-radius: 0 0 10px 10px; }
      .field { margin-bottom: 18px; }
      .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #8a8a8a; margin-bottom: 4px; }
      .field-value { font-size: 15px; color: #1a1a1a; }
      .message-box { background: #f4f1ea; padding: 16px; border-radius: 8px; white-space: pre-wrap; font-size: 15px; }
      .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #ececec; font-size: 12px; color: #aaa; }
    </style>
  </head>
  <body>
    <div class="header"><h1>Nova mensagem <span>—</span> Portfolio</h1></div>
    <div class="content">
      <div class="field"><div class="field-label">Nome</div><div class="field-value">${escapeHtml(name)}</div></div>
      <div class="field"><div class="field-label">Email</div><div class="field-value"><a href="mailto:${escapeHtml(email)}" style="color:#e8602c;">${escapeHtml(email)}</a></div></div>
      <div class="field"><div class="field-label">Tipo de projeto</div><div class="field-value">${escapeHtml(projectType || 'Não especificado')}</div></div>
      <div class="field"><div class="field-label">Mensagem</div><div class="message-box">${escapeHtml(message)}</div></div>
      <div class="footer">Enviado pelo formulário de contato do portfolio. Responda este email para falar direto com ${escapeHtml(name)}.</div>
    </div>
  </body>
</html>`;
}

function buildText({ name, email, message, projectType }: Payload): string {
  return `Nova mensagem de ${name}

Email: ${email}
Tipo de projeto: ${projectType || 'Não especificado'}

Mensagem:
${message}

---
Enviado pelo formulário de contato do portfolio.`;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
