# Configuração de Email - Formulário de Contato

## ✅ MailerSend (Configurado e Pronto)

O projeto já está configurado para usar o **MailerSend** como provedor de email.

### Passo a passo para ativar:

1. **Obter API Key do MailerSend:**
   - Acesse: https://www.mailersend.com/
   - Faça login na sua conta
   - Vá em **Domain** → Selecione seu domínio
   - Clique em **Manage** → **API Tokens**
   - Crie um novo token ou copie um existente

2. **Configurar variável de ambiente:**
   ```bash
   # Crie o arquivo .env.local na raiz do projeto
   echo "MAILERSEND_API_KEY=mlsn.seu_token_aqui" > .env.local
   ```

   Ou edite manualmente:
   ```
   MAILERSEND_API_KEY=mlsn.seu_token_aqui
   ```

3. **Verificar domínio (se ainda não verificou):**
   - No painel do MailerSend, vá em **Domains**
   - Adicione seu domínio (ex: simks.com.br)
   - Siga as instruções de verificação DNS
   - Aguarde a verificação (pode levar até 24h)

4. **Configurar email de origem:**
   - O email está configurado para enviar de: `contato@simks.com.br`
   - Certifique-se de que este domínio está verificado no MailerSend

5. **Testar localmente:**
   ```bash
   npm run dev
   ```
   - Preencha o formulário de contato
   - Envie uma mensagem de teste
   - Verifique o console do servidor para logs

6. **Deploy em produção:**

   **Vercel:**
   ```bash
   # Via CLI
   vercel env add MAILERSEND_API_KEY
   # Cole sua API key quando solicitado
   
   # Ou pelo dashboard:
   # Project Settings → Environment Variables → Add New
   ```

   **Outras plataformas:**
   - Adicione a variável `MAILERSEND_API_KEY` no painel de controle
   - Redeploy o projeto

---

## 🧪 Testando Sem API Key (Modo Desenvolvimento)

Se não tiver uma API Key configurada, o sistema funciona em modo de teste:
- Os dados são logados no console do servidor
- O formulário mostra mensagem de sucesso
- **Nenhum email é enviado realmente**

Isso é útil para desenvolvimento local antes de configurar o MailerSend.

---

## 📧 Funcionalidades do Email

O email enviado inclui:
- ✅ **HTML formatado** com design moderno
- ✅ **Campos estruturados**: Nome, Email, Tipo de Projeto, Mensagem
- ✅ **Reply-to automático**: Responder vai direto para o email do remetente
- ✅ **Proteção XSS**: HTML escapado para segurança
- ✅ **Fallback texto**: Para clientes que não suportam HTML

---

## 🔧 Personalização

### Alterar remetente:
Editar em `src/app/api/contact/route.ts`:
```typescript
const sentFrom = new Sender('seu-email@dominio.com', 'Seu Nome');
```

### Alterar destinatário:
```typescript
const recipients = [new Recipient('seu-email@gmail.com', 'Seu Nome')];
```

### Customizar template HTML:
Modifique a variável `htmlContent` na API Route.

---

## 🐛 Troubleshooting

### "Message: invalid API key"
- Verifique se a API key está correta
- Certifique-se de que não há espaços extras
- API keys do MailerSend começam com `mlsn.`

### "Domain not verified"
- Verifique seu domínio no painel do MailerSend
- Aguarde a propagação DNS (até 24h)
- Use um email @gmail.com temporariamente para testes

### Emails na caixa de spam
- Verifique se o domínio está autenticado (SPF, DKIM)
- Adicione o remetente aos contatos
- Teste com diferentes provedores de email

### Error 403 Forbidden
- Verifique se o domínio está verificado
- Confirme que está usando o domínio correto
- Verifique as permissões da API key

---

## 📊 Limites do Plano Gratuito (MailerSend)

- **12.000 emails/mês** no plano gratuito
- **200 emails/dia** (aproximadamente)
- Perfeito para portfolios e pequenos projetos

Para mais: https://www.mailersend.com/pricing

---

## 🔒 Segurança

⚠️ **IMPORTANTE:**
- NUNCA commite o arquivo `.env.local`
- Ele já está no `.gitignore`
- Em produção, use variáveis de ambiente do painel
- O código já inclui proteção contra XSS

---

## 📝 Logs de Debug

Os logs aparecem no console do servidor:
```
Email enviado com sucesso: { messageId: '...' }
```

Ou em modo de teste:
```
=== NOVA MENSAGEM DO FORMULÁRIO (MAILERSEND NÃO CONFIGURADO) ===
Nome: Fulano
Email: teste@email.com
...
```

---

## Alternativas

Se preferir outro provedor, consulte versões anteriores deste arquivo:
- **Resend**: Simples e moderno
- **SendGrid**: Mais tradicional
- **EmailJS**: 100% client-side

---

**Pronto para usar!** 🚀
