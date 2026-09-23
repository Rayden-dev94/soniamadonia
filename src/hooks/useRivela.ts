'use client'

import { useRef } from 'react'

import { gsap, motoRidotto, ScrollTrigger, useGSAP } from '@/lib/gsap'

/**
 * Anima in entrata gli elementi con `data-anim` contenuti nel nodo restituito.
 *
 * Lo stato iniziale (`opacity: 0`) è già in CSS, così non c'è flash di
 * contenuto prima che il JavaScript sia pronto.
 *
 * **Ogni elemento entra per conto suo**, quando è lui ad affacciarsi nello
 * schermo. Prima il segnale era uno solo per sezione: bastava che la sezione
 * cominciasse a comparire e *tutti* i suoi elementi partivano insieme, anche
 * quelli molto più in basso.
 *
 * Su computer si notava appena, perché le sezioni sono larghe e basse e ci
 * stanno quasi per intero in una schermata. Da telefono no: lì tutto si impila
 * in colonna e una sezione è lunga due o tre schermate, quindi le animazioni si
 * consumavano tutte all'inizio e arrivando più in basso si trovava il contenuto
 * già fermo. Da qui la sensazione che da telefono l'effetto fosse «troppo
 * veloce»: in realtà era già finito.
 *
 * `ScrollTrigger.batch` raggruppa gli elementi che si affacciano insieme e li
 * fa entrare a cascata: su schermo largo il risultato è quello di prima, su
 * telefono ogni blocco si anima quando tocca a lui.
 */
export function useRivela<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      const bersagli = gsap.utils.toArray<HTMLElement>('[data-anim]')
      if (bersagli.length === 0) return

      if (motoRidotto()) {
        gsap.set(bersagli, { opacity: 1, y: 0 })
        return
      }

      gsap.set(bersagli, { opacity: 0, y: 32 })

      /**
       * Chi è già stato oltrepassato compare e basta.
       *
       * Ricaricando la pagina a metà — o tornandoci con il tasto indietro — il
       * browser ripristina la posizione, e gli elementi rimasti sopra lo schermo
       * non si affacceranno mai più. Senza questa riga resterebbero invisibili
       * per sempre: un'animazione d'entrata che non scatta è un buco nella
       * pagina, non un effetto mancato.
       */
      const fuoriSopra = bersagli.filter(
        (elemento) => elemento.getBoundingClientRect().bottom < 0,
      )
      if (fuoriSopra.length > 0) gsap.set(fuoriSopra, { opacity: 1, y: 0 })

      ScrollTrigger.batch(bersagli, {
        // Un filo più in basso del 78% di prima: l'elemento comincia a entrare
        // appena si affaccia dal bordo, non quando è già a un quinto di pagina.
        start: 'top 88%',
        once: true,
        onEnter: (entrati) =>
          gsap.to(entrati, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
          }),
      })
    },
    { scope: ref },
  )

  return ref
}
