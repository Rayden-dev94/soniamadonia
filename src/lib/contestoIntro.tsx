'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { motoRidotto } from '@/lib/gsap'

const CHIAVE = 'intro-vista'

/**
 * Gli stati dell'intro.
 *
 * `attesa` esiste per una ragione precisa: con Next l'HTML viene disegnato
 * prima sul server, dove `window` non esiste e quindi è impossibile sapere se
 * l'intro vada mostrata. Se il browser decidesse diversamente al primo
 * disegno, React troverebbe due alberi discordanti e ributterebbe via l'HTML
 * ricevuto.
 *
 * Quindi si parte sempre da `attesa` — identica ovunque — e si decide subito
 * dopo il montaggio. Dura un fotogramma e nessuno lo vede, ma è ciò che tiene
 * insieme il rendering statico e l'animazione.
 */
type Stato = 'attesa' | 'attiva' | 'uscita' | 'conclusa'

type Contesto = {
  /** L'intro è a schermo: gli altri componenti restano fermi ad aspettarla. */
  attiva: boolean
  /**
   * L'intro ha cominciato a dissolversi. Chi sta sotto deve partire *adesso*,
   * non alla fine: altrimenti il velo si scopre su una pagina ancora vuota.
   */
  inUscita: boolean
  /** Vero appena si sa cosa fare: prima di questo momento nessuno si muove. */
  deciso: boolean
  avviaUscita: () => void
  concludi: () => void
}

const ContestoIntro = createContext<Contesto>({
  attiva: false,
  inUscita: false,
  deciso: false,
  avviaUscita: () => {},
  concludi: () => {},
})

/** In navigazione privata `sessionStorage` può lanciare: non è fatale. */
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
    /* al massimo l'intro si rivede */
  }
}

export function ProviderIntro({ children }: { children: ReactNode }) {
  const [stato, setStato] = useState<Stato>('attesa')

  useEffect(() => {
    // La decisione richiede `window`, `sessionStorage` e le preferenze di
    // sistema: nessuna delle tre esiste sul server, quindi si prende qui.
    // Solo atterrando sulla home, una volta per sessione, e mai se l'utente
    // ha chiesto meno animazioni.
    const daMostrare =
      window.location.pathname === '/' && !motoRidotto() && !giaVista()
    // La regola qui non si applica: il valore non è derivabile durante il
    // render, perché durante il rendering sul server `window` non esiste.
    // È il caso previsto dalla regola stessa — un effetto che sincronizza
    // React con un sistema esterno.
    // oxlint-disable-next-line react/set-state-in-effect
    setStato(daMostrare ? 'attiva' : 'conclusa')
  }, [])

  const valore = useMemo<Contesto>(
    () => ({
      attiva: stato === 'attiva',
      inUscita: stato === 'uscita',
      deciso: stato !== 'attesa',
      avviaUscita: () => setStato('uscita'),
      concludi: () => {
        segnaVista()
        setStato('conclusa')
      },
    }),
    [stato],
  )

  return <ContestoIntro value={valore}>{children}</ContestoIntro>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useIntro = () => useContext(ContestoIntro)
