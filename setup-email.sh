#!/bin/bash

# Script para configurar email no projeto
# Uso: ./setup-email.sh

echo "========================================="
echo "  Configuração de Email - Portfolio"
echo "========================================="
echo ""

# Perguntar qual serviço usar
echo "Escolha o serviço de email:"
echo "1) Resend (recomendado - 3.000 emails/mês grátis)"
echo "2) SendGrid (100 emails/dia grátis)"
echo "3) EmailJS (client-side - 200 emails/mês grátis)"
echo "4) Sair sem configurar"
echo ""
read -p "Opção (1-4): " choice

case $choice in
  1)
    echo ""
    echo "Você escolheu Resend."
    echo "1. Crie uma conta em: https://resend.com"
    echo "2. Verifique seu domínio"
    echo "3. Crie uma API em: Settings → API Keys"
    echo ""
    read -p "Cole sua API Key do Resend (começa com 're_'): " api_key

    if [[ $api_key == re_* ]]; then
      echo "RESEND_API_KEY=$api_key" > .env.local
      echo "✓ Arquivo .env.local criado!"

      # Verificar se resend está instalado
      if ! npm list resend &>/dev/null; then
        echo "Instalando pacote resend..."
        npm install resend
      fi

      # Ativar no código
      sed -i "/\/\/ Opção 1: Usando Resend/,/\*\//c\\\      // Opção 1: Usando Resend (ativado)\n      const resendApiKey = process.env.RESEND_API_KEY;\n      if (resendApiKey) {\n        const { Resend } = await import('resend');\n        const resend = new Resend(resendApiKey);\n\n        await resend.emails.send({\n          from: 'Portfolio <kelven.souza00@gmail.com>',\n          to: ['kelven.souza00@gmail.com'],\n          subject: \`Nova mensagem de \${name}\`,\n          html: \`\n            <h2>Nova mensagem do formulário de contato</h2>\n            <p><strong>Nome:</strong> \${name}</p>\n            <p><strong>Email:</strong> \${email}</p>\n            <p><strong>Tipo de Projeto:</strong> \${projectType || 'Não especificado'}</p>\n            <p><strong>Mensagem:</strong></p>\n            <p>\${message.replace(/\\n/g, '<br>')}</p>\n          \`,\n          replyTo: email,\n        });\n\n        return NextResponse.json({ success: true });\n      }" src/app/api/contact/route.ts

      echo "✓ Código do Resend ativado!"
      echo ""
      echo "Próximos passos:"
      echo "1. Rode 'npm run dev' para testar"
      echo "2. Envie uma mensagem pelo formulário"
      echo "3. Verifique o email em https://resend.com/emails"
    else
      echo "✗ API Key inválida. Deve começar com 're_'"
      exit 1
    fi
    ;;

  2)
    echo ""
    echo "Você escolheu SendGrid."
    echo "1. Crie uma conta em: https://sendgrid.com"
    echo "2. Crie uma API Key em: Settings → API Keys"
    echo ""
    read -p "Cole sua API Key do SendGrid (começa com 'SG.'): " api_key

    if [[ $api_key == SG.* ]]; then
      echo "SENDGRID_API_KEY=$api_key" > .env.local
      echo "✓ Arquivo .env.local criado!"

      if ! npm list @sendgrid/mail &>/dev/null; then
        echo "Instalando pacote @sendgrid/mail..."
        npm install @sendgrid/mail
      fi

      echo "⚠️ Lembre-se de descomentar o bloco do SendGrid em src/app/api/contact/route.ts"
    else
      echo "✗ API Key inválida. Deve começar com 'SG.'"
      exit 1
    fi
    ;;

  3)
    echo ""
    echo "Você escolheu EmailJS."
    echo "1. Crie uma conta em: https://www.emailjs.com"
    echo "2. Crie um serviço de email"
    echo "3. Crie um template de email"
    echo "4. Obtenha sua Public Key"
    echo ""

    npm install @emailjs/browser

    echo "⚠️ Você precisa editar manualmente src/components/ContactForm/index.tsx"
    echo "   Veja as instruções no arquivo EMAIL_SETUP.md"
    ;;

  4)
    echo "Saindo sem configurar..."
    echo "O formulário funcionará em modo de teste (salva no console)."
    exit 0
    ;;

  *)
    echo "Opção inválida"
    exit 1
    ;;
esac

echo ""
echo "========================================="
echo "     Configuração concluída!"
echo "========================================="
