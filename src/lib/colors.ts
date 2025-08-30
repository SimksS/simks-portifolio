// Configuração de cores baseada na imagem do homem de terno no carro
// Paleta sofisticada com tons escuros, dourados e azuis
export const colors = {
  // Cores principais baseadas na imagem
  background: '#0A0A0A', // Preto profundo do interior do carro
  foreground: '#F5F5DC', // Bege claro da pele (off-white)
  card: '#1A1A1A', // Preto suave para cards
  cardForeground: '#F5F5DC', // Bege claro para texto em cards
  
  // Cores secundárias
  secondary: '#2D2D2D', // Cinza escuro para elementos secundários
  secondaryForeground: '#F5F5DC', // Bege claro para texto secundário
  muted: '#8B8B8B', // Cinza médio para elementos muted
  mutedForeground: '#A0A0A0', // Cinza claro para texto muted
  
  // Cores primárias baseadas no terno e acessórios
  primary: '#D4AF37', // Dourado do relógio e detalhes
  primaryForeground: '#0A0A0A', // Preto para texto sobre dourado
  
  // Cores de borda e input
  border: '#D4AF37', // Dourado para bordas
  input: '#1A1A1A', // Preto suave para inputs
  accent: '#2D2D2D', // Cinza escuro para acentos
  accentForeground: '#F5F5DC', // Bege claro para texto de acento
  
  // Cores de destaque
  destructive: '#DC143C', // Vermelho para erros
  ring: '#D4AF37', // Dourado para focus rings
  
  // Cores de gráficos baseadas na paleta
  chart1: '#D4AF37', // Dourado principal
  chart2: '#4169E1', // Azul royal (reflexos na janela)
  chart3: '#8B4513', // Marrom sela (tons do cabelo)
  chart4: '#2F4F4F', // Cinza escuro (interior do carro)
  chart5: '#F5F5DC', // Bege claro (pele)
  
  // Cores da sidebar
  sidebar: '#1A1A1A', // Preto suave
  sidebarForeground: '#F5F5DC', // Bege claro
  sidebarPrimary: '#D4AF37', // Dourado
  sidebarPrimaryForeground: '#0A0A0A', // Preto
  sidebarAccent: '#2D2D2D', // Cinza escuro
  sidebarAccentForeground: '#F5F5DC', // Bege claro
  sidebarBorder: '#D4AF37', // Dourado
  sidebarRing: '#D4AF37', // Dourado
} as const;

export const generateColorCSS = () => {
  return Object.entries(colors)
    .map(([key, value]) => `--${key}: ${value};`)
    .join('\n  ');
};
