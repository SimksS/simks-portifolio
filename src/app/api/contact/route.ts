import { NextResponse } from 'next/server';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, projectType } = body;

    // Validação
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    if (name.length < 3) {
      return NextResponse.json(
        { error: 'Nome deve ter pelo menos 3 caracteres' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Mensagem deve ter pelo menos 10 caracteres' },
        { status: 400 }
      );
    }

    // Configurar MailerSend
    const mailerSendApiKey = process.env.MAILERSEND_API_KEY;

    if (!mailerSendApiKey) {
      console.log('=== NOVA MENSAGEM DO FORMULÁRIO (MAILERSEND NÃO CONFIGURADO) ===');
      console.log('Nome:', name);
      console.log('Email:', email);
      console.log('Tipo:', projectType);
      console.log('Mensagem:', message);
      console.log('================================================================');

      return NextResponse.json({
        success: true,
        message: 'Mensagem recebida! Configure MAILERSEND_API_KEY para envio real.',
        debug: { name, email, projectType, message }
      });
    }

    // Inicializar MailerSend
    const mailerSend = new MailerSend({
      apiKey: mailerSendApiKey,
    });

    // Configurar remetente e destinatário
    const sentFrom = new Sender('kelven-souza@test-vz9dlemw9eq4kj50.mlsender.net', 'Kelven Souza - Portfolio');
    const recipients = [new Recipient('kelven.souza00@gmail.com', 'Kelven Souza')];
    const replyTo = new Sender(email, name);

    // Criar conteúdo HTML do email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nova mensagem do Portfolio</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0060ff, #00c6ff); padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .field-label { font-weight: bold; color: #0060ff; margin-bottom: 5px; }
            .field-value { background: white; padding: 12px; border-radius: 6px; border: 1px solid #e0e0e0; }
            .message-box { background: white; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0; white-space: pre-wrap; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>✉️ Nova Mensagem do Portfolio</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">👤 Nome:</div>
              <div class="field-value">${escapeHtml(name)}</div>
            </div>

            <div class="field">
              <div class="field-label">📧 Email:</div>
              <div class="field-value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
            </div>

            <div class="field">
              <div class="field-label">📋 Tipo de Projeto:</div>
              <div class="field-value">${escapeHtml(projectType || 'Não especificado')}</div>
            </div>

            <div class="field">
              <div class="field-label">💬 Mensagem:</div>
              <div class="message-box">${escapeHtml(message)}</div>
            </div>

            <div class="footer">
              <p>Esta mensagem foi enviada através do formulário de contato do seu portfolio.</p>
              <p>Para responder, use o botão "Responder" do seu cliente de email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Criar parâmetros do email
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(replyTo)
      .setSubject(`📬 Nova mensagem de ${name} - Portfolio`)
      .setHtml(htmlContent)
      .setText(`Nova mensagem de ${name}

Email: ${email}
Tipo de Projeto: ${projectType || 'Não especificado'}

Mensagem:
${message}

---
Enviado através do formulário de contato do portfolio.`);

    // Enviar email
    const response = await mailerSend.email.send(emailParams);

    console.log('Email enviado com sucesso:', response);

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso!'
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);

    return NextResponse.json(
      {
        error: 'Erro ao enviar mensagem',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// Função para escapar HTML e evitar XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
