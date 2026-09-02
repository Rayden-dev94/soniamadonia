import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { motoRidotto } from '@/lib/gsap'

const CHIAVE = 'intro-vista'

type Contesto = {
  /** L'intro è in corso: gli altri componenti restano fermi ad aspettarla. */
  attiva: boolean
  /**
   * L'intro ha cominciato a dissolversi. Chi sta sotto deve partire *adesso*,
   * non alla fine: altrimenti il velo si scopre su una pagina ancora vuota e
   * il contenuto compare dopo, come un secondo tempo.
   */
  inUscita: boolean
  avviaUscita: () => void
  concludi: () => void
}

const ContestoIntro = createContext<Contesto>({
  attiva: false,
  inUscita: false,
  avviaUscita: () => {},
  concludi: () => {},
})

/** In navigazione privata sessionStorage può lanciare: non è un errore fatale. */
function giaVista() {
  try {
    return sessionStorage.getItem(CHIAVE) !== null
  } catch {
    return false
  }
}

function segnaVista() {
  try {
    sessionStorage.setItem(CHIAVE, '1')
  } catch {
    /* nessun problema: al massimo l'intro si rivede */
  }
}

export function ProviderIntro({ children }: { children: ReactNode }) {
  const [attiva, setAttiva] = useState(() => {
    if (typeof window === 'undefined') return false
    // Solo atterrando sulla home, una volta per sessione, e mai se
    // l'utente ha chiesto meno animazioni.
    if (window.location.pathname !== '/') return false
    if (motoRidotto()) return false
    return !giaVista()
  })

  const [inUscita, setInUscita] = useState(false)

  const valore = useMemo<Contesto>(
    () => ({
      attiva,
      inUscita,
      avviaUscita: () => setInUscita(true),
      concludi: () => {
        segnaVista()
        setAttiva(false)
      },
    }),
    [attiva, inUscita],
  )

  return <ContestoIntro value={valore}>{children}</ContestoIntro>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useIntro = () => useContext(ContestoIntro)
