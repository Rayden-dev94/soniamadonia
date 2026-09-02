import { useEffect } from 'react'

type Seo = {
  titolo: string
  descrizione: string
}

function impostaMeta(selettore: string, attributo: string, valore: string) {
  const tag = document.head.querySelector(selettore)
  if (tag) tag.setAttribute(attributo, valore)
}

/**
 * Aggiorna <title> e le meta della pagina corrente.
 *
 * Nota: essendo una SPA, questi valori vengono scritti dal JS. I browser e
 * Googlebot li leggono, ma le anteprime social (che non eseguono JS) usano
 * quelle statiche in index.html. Per un controllo completo servirebbe il
 * prerendering — vedi la sezione SEO del README.
 */
export function useSeo({ titolo, descrizione }: Seo) {
  useEffect(() => {
    document.title = titolo
    impostaMeta('meta[name="description"]', 'content', descrizione)
    impostaMeta('meta[property="og:title"]', 'content', titolo)
    impostaMeta('meta[property="og:description"]', 'content', descrizione)
    impostaMeta('link[rel="canonical"]', 'href', window.location.href)
    impostaMeta('meta[property="og:url"]', 'content', window.location.href)
  }, [titolo, descrizione])
}
