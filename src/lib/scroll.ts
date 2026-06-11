import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Navegação programática SEMPRE via Lenis — nunca scrollIntoView/scrollTo
 * nativos, que competem com o smooth scroll e causam "scroll fantasma"
 * (o Lenis anima de volta para o alvo interno antigo).
 */
export function scrollToId(id: string) {
  if (typeof window === 'undefined') return;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(`#${id}`, {
      offset: -72,
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }

  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
