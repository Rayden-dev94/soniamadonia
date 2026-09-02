import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Cambiando pagina il browser mantiene la posizione di scroll: qui la
 * riportiamo in cima, a meno che l'URL non punti a un'ancora specifica.
 */
export function ScrollInCima() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
