/**
 * Tailwind v4 con Next.js passa da PostCSS, non dal plugin di Vite.
 * Il foglio di stile (`app/globali.css`) resta identico: `@theme` e
 * `@utility` funzionano allo stesso modo.
 */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
