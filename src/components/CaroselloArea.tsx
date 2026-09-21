'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { gsap, motoRidotto, useGSAP } from '@/lib/gsap'

type Props = {
  immagini: string[]
  /** Serve solo all'etichetta per chi naviga con uno screen reader. */
  titolo: string
  /**
   * Vero quando la finestra che lo contiene è aperta. Un carosello che scorre
   * dentro una finestra chiusa consuma batteria per animare pixel che nessuno
   * vede, e all'apertura si troverebbe a metà di una dissolvenza.
   */
  attivo: boolean
}

/** Ogni quanto passa alla foto successiva da solo. */
const PAUSA = 5000

/**
 * Le fotografie di un'area, in sequenza.
 *
 * Le diapositive sono **tutte impilate nello stesso punto**, non affiancate in
 * una striscia che scorre. È la scelta che rende possibile l'effetto: due
 * immagini possono sovrapporsi e scambiarsi in dissolvenza, mentre una striscia
 * può solo scivolare di lato. In compenso obbliga a gestire a mano chi sta
 * sopra — da qui gli `zIndex` nella transizione.
 *
 * L'entrata della nuova foto parte leggermente ingrandita e si assesta: è il
 * movimento che dà profondità senza diventare un effetto vistoso, lo stesso
 * della fotografia nella prima schermata. Sono due sole proprietà, opacità e
 * scala, entrambe gestite dalla scheda grafica.
 *
 * Con una sola immagine il componente non mostra comandi e non anima niente:
 * resta una fotografia ferma. Serve perché non tutte le aree hanno lo stesso
 * numero di foto, e un carosello con un solo fotogramma sarebbe un carosello
 * rotto invece che una foto.
 */
export function CaroselloArea({ immagini, titolo, attivo }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [corrente, setCorrente] = useState(0)

  /**
   * L'avanzamento automatico si spegne per sempre al primo comando dato a mano.
   *
   * Continuare a scorrere mentre qualcuno sta guardando una foto che ha scelto
   * lui è il difetto più fastidioso dei caroselli: la pagina gli porta via di
   * mano quello che stava osservando.
   */
  const [automatico, setAutomatico] = useState(true)

  const totale = immagini.length
  const unaSola = totale < 2

  const vaiA = useCallback(
    (indice: number, manuale = false) => {
      if (manuale) setAutomatico(false)
      setCorrente(((indice % totale) + totale) % totale)
    },
    [totale],
  )

  /**
   * Il ripristino cambiando area non si fa qui.
   *
   * Sarebbe bastato un effetto che rimette a zero la foto corrente quando
   * cambia l'elenco, ed è la prima cosa che viene in mente — ma significa
   * disegnare il componente con i valori vecchi e poi subito da capo con quelli
   * giusti, cioè due disegni per niente. Chi lo usa passa invece una `key`
   * legata all'area: React lo considera un componente diverso e lo ricrea da
   * zero, con lo stato già pulito. Vedi `FinestraArea`.
   */

  useEffect(() => {
    if (!attivo || unaSola || !automatico || motoRidotto()) return

    const scandire = window.setInterval(
      () => setCorrente((i) => (i + 1) % totale),
      PAUSA,
    )
    return () => window.clearInterval(scandire)
  }, [attivo, unaSola, automatico, totale])

  /**
   * Lo scambio fra due diapositive.
   *
   * `dependencies: [corrente]` fa ripartire questo blocco a ogni cambio, e
   * `revertOnUpdate` annulla l'animazione precedente se qualcuno preme avanti
   * due volte di fila: senza, la seconda transizione partirebbe da uno stato a
   * metà strada e le foto resterebbero a opacità intermedia.
   */
  useGSAP(
    () => {
      const diapositive = gsap.utils.toArray<HTMLElement>('[data-diapositiva]')
      if (diapositive.length === 0) return

      const entra = diapositive[corrente]
      const escono = diapositive.filter((_, i) => i !== corrente)

      if (motoRidotto() || diapositive.length === 1) {
        gsap.set(entra, { opacity: 1, scale: 1, zIndex: 2 })
        gsap.set(escono, { opacity: 0, zIndex: 1 })
        return
      }

      gsap.set(escono, { zIndex: 1 })
      gsap.set(entra, { zIndex: 2 })

      gsap
        .timeline()
        .to(escono, { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, 0)
        .fromTo(
          entra,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
          0,
        )
    },
    { scope: ref, dependencies: [corrente], revertOnUpdate: true },
  )

  return (
    <div
      ref={ref}
      // `aria-roledescription` dice a uno screen reader che questa non è una
      // figura qualunque ma una sequenza: senza, annuncerebbe quattro immagini
      // decorative sovrapposte senza spiegare perché.
      aria-roledescription="carosello"
      aria-label={`Fotografie dell’area ${titolo}`}
      className="relative aspect-16/9 w-full overflow-hidden bg-sabbia-200"
    >
      {immagini.map((immagine, indice) => (
        <img
          key={immagine}
          data-diapositiva
          src={immagine}
          alt=""
          aria-hidden="true"
          // La prima si carica subito, le altre quando servono: aprendo la
          // finestra si vede solo quella, e scaricare le altre tre in
          // contemporanea ruberebbe banda proprio nel momento peggiore.
          loading={indice === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: indice === 0 ? 1 : 0 }}
        />
      ))}

      {!unaSola && (
        <>
          {/* ⚠️ I comandi stanno a `z-10`, e non è un dettaglio estetico.
              La transizione assegna alle diapositive un livello di
              sovrapposizione — serve a far passare la foto che entra davanti a
              quella che esce — e senza un livello proprio i comandi finivano
              **sotto l'immagine**: le foto scorrevano, le frecce erano
              invisibili e non cliccabili. Se un domani cambia lo `zIndex`
              nella transizione, questo va tenuto più alto. */}
          <Freccia
            verso="precedente"
            onClick={() => vaiA(corrente - 1, true)}
            className="left-3 sm:left-4"
          />
          <Freccia
            verso="successiva"
            onClick={() => vaiA(corrente + 1, true)}
            className="right-3 sm:right-4"
          />

          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
            {immagini.map((immagine, indice) => (
              <button
                key={immagine}
                type="button"
                onClick={() => vaiA(indice, true)}
                aria-label={`Vai alla fotografia ${indice + 1} di ${totale}`}
                aria-current={indice === corrente}
                // Il bersaglio è alto e largo abbastanza per un dito: il
                // puntino che si vede è solo la parte dipinta al centro.
                className="ease-morbido flex h-6 w-6 items-center justify-center transition-transform duration-300 hover:scale-110"
              >
                <span
                  className={`ease-morbido block h-1.5 rounded-full bg-sabbia-50 transition-all duration-500 ${
                    indice === corrente
                      ? 'w-6 opacity-100'
                      : 'w-1.5 opacity-55'
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

type PropsFreccia = {
  verso: 'precedente' | 'successiva'
  onClick: () => void
  className: string
}

/**
 * Le frecce sono **sempre visibili e sopra la fotografia**.
 *
 * Erano nascoste fino al passaggio del mouse: più pulito da fermo, ma su
 * un'immagine a tutta larghezza nessuno immagina di doverci passare sopra per
 * scoprire dei comandi. Un carosello deve dichiarare subito di esserlo.
 *
 * `z-10` non è cosmetico: la transizione assegna alle diapositive un livello di
 * sovrapposizione — serve a far passare la foto che entra davanti a quella che
 * esce — e senza un livello proprio le frecce finivano *sotto* l'immagine, né
 * visibili né cliccabili. Se un domani cambia lo `zIndex` nella transizione,
 * questo va tenuto più alto.
 */
function Freccia({ verso, onClick, className }: PropsFreccia) {
  const precedente = verso === 'precedente'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={precedente ? 'Fotografia precedente' : 'Fotografia successiva'}
      className={`ease-morbido absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-inchiostro-900/55 text-sabbia-50 transition-colors duration-300 hover:bg-inchiostro-900/85 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        aria-hidden="true"
        className={precedente ? 'rotate-180' : undefined}
      >
        <path
          d="M9 5l7 7-7 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
