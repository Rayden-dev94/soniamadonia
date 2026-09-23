'use client'

import { useEffect, useRef, useState } from 'react'

import { gsap, motoRidotto, useGSAP } from '@/lib/gsap'

type Props = {
  immagini: string[]
  /**
   * Ogni quanto cambia foto, in millisecondi.
   *
   * Si conta **dal cambio precedente**, non dalla fine della dissolvenza: i
   * quattro secondi impostati, meno l'1,8 della transizione, lasciano poco più
   * di due secondi di immagine davvero ferma. Le due misure vanno quindi
   * guardate insieme — allungando la dissolvenza senza toccare questa, le foto
   * smetterebbero di fermarsi del tutto.
   */
  pausa?: number
  /** Classi del contenitore: serve per gli angoli. */
  className?: string
}

/**
 * Fotografie che si avvicendano da sole.
 *
 * Non è un carosello e non va confuso con `CaroselloArea`: **non ha comandi**,
 * niente frecce, niente puntini, niente da toccare. Le immagini si sostituiscono
 * in dissolvenza e basta. È decorazione che accompagna la lettura, non un
 * elemento con cui interagire — per questo è marcato `aria-hidden` e per chi
 * naviga con uno screen reader semplicemente non esiste, esattamente come non
 * esisteva la singola fotografia che c'era prima.
 *
 * La dissolvenza è la stessa del carosello, così le due parti del sito parlano
 * la stessa lingua: le diapositive sono impilate nello stesso punto e quella
 * che entra si assesta da un ingrandimento appena percettibile.
 *
 * Con una sola immagine non anima niente e resta una fotografia ferma.
 */
export function FotoAvvicendate({
  immagini,
  pausa = 4000,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [corrente, setCorrente] = useState(0)

  /**
   * Si avvicendano solo mentre sono davvero sotto gli occhi.
   *
   * Nella pagina Servizi ce ne sono quattro, e senza questo controllo
   * girerebbero tutte dall'apertura della pagina: quattro cronometri e quattro
   * animazioni per immagini fuori schermo, e chi arriva alla quarta area la
   * troverebbe a metà sequenza invece che dalla prima.
   */
  const [inVista, setInVista] = useState(false)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return

    const osservatore = new IntersectionObserver(
      ([voce]) => setInVista(voce.isIntersecting),
      // Un quarto basta a considerarla guardata: pretendere che sia intera la
      // terrebbe ferma sugli schermi bassi.
      { threshold: 0.25 },
    )
    osservatore.observe(nodo)
    return () => osservatore.disconnect()
  }, [])

  useEffect(() => {
    if (!inVista || immagini.length < 2 || motoRidotto()) return

    const scandire = window.setInterval(
      () => setCorrente((i) => (i + 1) % immagini.length),
      pausa,
    )
    return () => window.clearInterval(scandire)
  }, [inVista, immagini.length, pausa])

  /**
   * Lo scambio fra due immagini.
   *
   * ⚠️ **Niente `revertOnUpdate`**, ed è il punto delicato di questo
   * componente. Sembrava la scelta prudente — annullare l'animazione
   * precedente prima di far partire la nuova — ma «annullare» per GSAP
   * significa *riportare gli elementi com'erano prima che quell'animazione
   * cominciasse*, e prima della dissolvenza precedente la foto uscente era a
   * piena opacità. Il risultato era un lampo della foto vecchia a ogni cambio,
   * come se la sequenza tornasse indietro di un passo per poi saltare avanti.
   *
   * Al suo posto si continua **dallo stato in cui le immagini si trovano
   * adesso**: si fermano le animazioni in corso e si riparte da lì. Così due
   * cambi ravvicinati si concatenano invece di azzerarsi a vicenda.
   */
  useGSAP(
    () => {
      const diapositive = gsap.utils.toArray<HTMLElement>('[data-foto]')
      if (diapositive.length === 0) return

      const entra = diapositive[corrente]
      const escono = diapositive.filter((_, i) => i !== corrente)

      // Si fermano dove sono: nessun ritorno allo stato iniziale.
      gsap.killTweensOf(diapositive)

      if (motoRidotto() || diapositive.length === 1) {
        gsap.set(entra, { opacity: 1, scale: 1, zIndex: 2 })
        gsap.set(escono, { opacity: 0, zIndex: 1 })
        return
      }

      // Chi entra passa davanti: le diapositive sono sovrapposte, quindi
      // l'ordine va deciso a mano a ogni scambio.
      gsap.set(escono, { zIndex: 1 })
      gsap.set(entra, { zIndex: 2 })

      /**
       * L'ingrandimento si riarma solo su un'immagine del tutto nascosta.
       *
       * Se la foto che entra fosse già in parte visibile — perché il cambio
       * precedente non ha finito la sua corsa — riportarla al 103% la farebbe
       * sobbalzare. In quel caso prosegue dalla scala che ha già.
       */
      if (Number(gsap.getProperty(entra, 'opacity')) === 0) {
        gsap.set(entra, { scale: 1.03 })
      }

      /**
       * Una dissolvenza lunga, non uno scatto.
       *
       * Tre cose la rendono delicata: la durata di quasi due secondi,
       * l'andamento `sine.inOut` che parte e si ferma senza strappi, e
       * l'ingrandimento appena accennato — al 103% l'immagine respira, al 108%
       * avanzava verso chi guarda.
       *
       * Le due immagini si sovrappongono per tutta la transizione: quella che
       * esce non se ne va prima che l'altra sia arrivata, ed è questo che
       * toglie lo stacco fra una foto e l'altra.
       */
      gsap
        .timeline()
        .to(escono, { opacity: 0, duration: 1.8, ease: 'sine.inOut' }, 0)
        .to(
          entra,
          { opacity: 1, scale: 1, duration: 1.8, ease: 'sine.inOut' },
          0,
        )
    },
    { scope: ref, dependencies: [corrente] },
  )

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative aspect-16/9 w-full overflow-hidden bg-sabbia-200 ${className}`}
    >
      {immagini.map((immagine, indice) => (
        <img
          key={immagine}
          data-foto
          src={immagine}
          alt=""
          // La prima si carica subito, le altre quando servono.
          loading={indice === 0 ? 'eager' : 'lazy'}
          decoding="async"
          /**
           * Lo stato iniziale è una **classe**, non uno stile in riga.
           *
           * Su `style` comanda React: a ogni ridisegno riafferma quel valore, e
           * siccome GSAP scrive l'opacità proprio lì i due si contendevano la
           * stessa proprietà — con esiti che dipendevano da chi arrivava
           * secondo. Una classe nasconde le immagini prima che GSAP entri in
           * gioco, e da quel momento l'unico a scrivere in riga è lui.
           */
          className={`absolute inset-0 h-full w-full object-cover ${
            indice === 0 ? '' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  )
}
