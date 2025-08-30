# Tech Developer Hub

Um portfólio profissional moderno e responsivo para desenvolvedores full-stack, construído com Next.js, TypeScript e Tailwind CSS.

## 🚀 Características

- **Design Moderno**: Interface limpa e profissional com tema escuro
- **Totalmente Responsivo**: Otimizado para desktop, tablet e mobile
- **Componentes Modulares**: Estrutura organizada e reutilizável
- **Paleta de Cores Personalizável**: Fácil customização das cores
- **Animações Suaves**: Transições e efeitos visuais elegantes
- **Formulário de Contato**: Funcional e estilizado
- **SEO Otimizado**: Meta tags e estrutura semântica

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **GSAP** - Biblioteca de animações avançadas
- **Lucide React** - Ícones modernos
- **Motion** - Animações e transições

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css          # Estilos globais e variáveis CSS
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial
├── components/
│   ├── Header/              # Componente de navegação
│   ├── HeroSection/         # Seção principal
│   ├── TechnologiesSection/ # Seção de tecnologias
│   ├── EcommerceSection/    # Seção de e-commerce
│   ├── AnimationsSection/   # Seção de animações
│   ├── ContactForm/         # Formulário de contato
│   ├── Footer/              # Rodapé
│   └── ui/                  # Componentes UI reutilizáveis
└── lib/
    ├── colors.ts            # Configuração de cores
    └── utils.ts             # Utilitários
```

## 🎨 Personalização de Cores

O projeto utiliza um sistema de cores baseado em CSS custom properties que pode ser facilmente personalizado.

### Alterando as Cores

1. **Método 1 - Via arquivo de configuração:**
   Edite o arquivo `src/lib/colors.ts`:

   ```typescript
   export const colors = {
     background: '#1A1D24',    // Fundo principal
     foreground: '#FFFFFF',    // Texto principal
     card: '#282C34',         // Fundo dos cards
     // ... outras cores
   };
   ```

2. **Método 2 - Via CSS:**
   Edite o arquivo `src/app/globals.css`:

   ```css
   :root {
     --background: #1A1D24;
     --foreground: #FFFFFF;
     --card: #282C34;
     /* ... outras variáveis */
   }
   ```

### Exemplos de Temas

**Tema Azul:**
```css
--background: #0f172a;
--card: #1e293b;
--primary: #3b82f6;
```

**Tema Verde:**
```css
--background: #0f1f0f;
--card: #1a2e1a;
--primary: #22c55e;
```

**Tema Roxo:**
```css
--background: #1a0b1a;
--card: #2d1b2d;
--primary: #a855f7;
```

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Abrir no navegador:**
   ```
   http://localhost:3000
   ```

## 📱 Seções do Site

1. **Header** - Navegação principal com links para todas as seções
2. **Hero Section** - Apresentação principal com título e call-to-action
3. **Technologies** - Cards das tecnologias principais (React, Node.js, Python)
4. **E-commerce Platforms** - Plataformas de e-commerce (VTEX, Wake, Shopify)
5. **Animations & Effects** - Seção de animações GSAP com preview
6. **Contact Form** - Formulário de contato funcional
7. **Footer** - Informações da empresa, navegação e redes sociais

## 🔧 Customização

### Adicionando Novas Seções

1. Crie um novo componente em `src/components/`
2. Importe e adicione na página principal (`src/app/page.tsx`)
3. Adicione o link de navegação no Header

### Modificando Conteúdo

- **Textos**: Edite diretamente nos componentes
- **Imagens**: Substitua os placeholders por imagens reais
- **Links**: Atualize os hrefs nos componentes de navegação

### Animações GSAP Implementadas

O projeto inclui um sistema completo de animações GSAP:

#### 🎬 Animações de Entrada
- **Typewriter Effect** - Para títulos principais
- **Fade In Up** - Elementos aparecem deslizando para cima
- **Stagger Animations** - Elementos aparecem em sequência
- **Scale In** - Elementos aparecem com efeito de escala
- **Rotate In** - Elementos aparecem com rotação

#### 🖱️ Animações de Hover
- **Card Hover** - Cards se elevam e mudam de cor
- **Button Ripple** - Efeito de onda nos botões
- **Icon Rotation** - Ícones giram no hover
- **Link Hover** - Links se movem suavemente

#### 📜 Animações de Scroll
- **Parallax Effects** - Elementos se movem em velocidades diferentes
- **Scroll Triggers** - Animações ativadas pelo scroll
- **Header Transform** - Header muda baseado no scroll
- **Preview Animations** - Demonstrações interativas

#### 🎯 Animações Interativas
- **Form Validation** - Feedback visual em tempo real
- **Loading States** - Animações de carregamento
- **Success Feedback** - Confirmações animadas
- **Preview Controls** - Controles interativos de demonstração

#### 🎨 Classes CSS para Animações
Adicione estas classes aos elementos para ativar animações automáticas:
- `.fade-in` - Fade in ao entrar na viewport
- `.slide-in-left` - Slide da esquerda
- `.slide-in-right` - Slide da direita
- `.scale-in` - Escala ao aparecer
- `.rotate-in` - Rotação ao aparecer
- `.stagger-in` - Stagger para elementos filhos
- `.parallax` - Efeito parallax
- `.card-hover` - Hover para cards
- `.button-ripple` - Ripple effect para botões

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar e modificar conforme necessário.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

---

Desenvolvido com ❤️ para a comunidade de desenvolvedores.
