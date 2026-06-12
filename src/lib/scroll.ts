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

  const target = document.getElementById(id);
  const lenis = window.__lenis;

  if (lenis && target) {
    // O menu mobile / preloader pausam o Lenis (stop()). Quando a navegação
    // dispara, o start() ainda não rodou — então reativamos aqui e usamos
    // force:true para rolar mesmo que o instante de lock não tenha passado.
    lenis.start();
    lenis.scrollTo(target, {
      offset: -72,
      duration: 1.4,
      force: true,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }

  target?.scrollIntoView({ behavior: 'smooth' });
}
