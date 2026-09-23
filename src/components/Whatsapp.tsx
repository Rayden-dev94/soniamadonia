'use client'

import { useEffect, useState } from 'react'
import type { SVGProps } from 'react'

import { linkWhatsapp } from '@/data/contenuti'

/** Il simbolo di WhatsApp. Prende il colore dal testo che lo contiene. */
export function IconaWhatsapp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

/**
 * Pulsante fluttuante, su ogni schermo.
 *
 * All'inizio era `md:hidden`, cioè solo da telefono, con il ragionamento che su
 * computer WhatsApp vive in un'altra scheda o in un'altra applicazione e il
 * pulsante sarebbe stato ingombro senza essere comodo. Ma WhatsApp Web e
 * l'applicazione per scrittorio sono ormai la norma, e il collegamento apre
 * l'una o l'altra senza che chi legge debba cercare il numero: l'ingombro c'è,
 * la scomodità no.
 *
 * Su schermo largo cresce un po' e si stacca di più dai bordi — a 56 px in un
 * angolo di 1400 px sembrava un residuo dimenticato, non un invito.
 *
 * **Compare dopo che si è cominciato a scorrere.** Sulla prima schermata il
 * sito ha già i suoi due inviti, «Richiedi un colloquio» nella navbar e sopra
 * la fotografia: un terzo pulsante nello stesso momento sarebbe insistenza. Si
 * fa vivo quando chi legge ha mostrato interesse scendendo nella pagina, ed è
 * lì che tornare in cima per cercare un contatto diventa scomodo.
 *
 * Sta a `z-40`: sotto la navbar e sotto il pannello del menu, così quando il
 * menu si apre a tutto schermo non resta un cerchio che galleggia sopra.
 *
 * Il colore è il salvia del sito, non il verde di WhatsApp: quel verde sarebbe
 * l'unico colore saturo della pagina e si vedrebbe come un pezzo incollato. Il
 * simbolo resta riconoscibile per forma, che è ciò che conta.
 */

/** Quanto si deve scendere perché compaia. Circa mezza schermata. */
const SOGLIA = 400

export function BottoneWhatsapp() {
  const [visibile, setVisibile] = useState(false)

  useEffect(() => {
    const controlla = () => setVisibile(window.scrollY > SOGLIA)

    // Subito, non solo al primo scorrimento: ricaricando la pagina a metà — o
    // tornandoci indietro — il browser ripristina la posizione senza generare
    // alcun evento, e il pulsante resterebbe nascosto pur essendo in fondo.
    controlla()

    // `passive` dice al browser che non fermeremo lo scorrimento: può così
    // proseguire senza aspettare che questa funzione abbia finito.
    window.addEventListener('scroll', controlla, { passive: true })
    return () => window.removeEventListener('scroll', controlla)
  }, [])

  return (
    <a
      href={linkWhatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivi su WhatsApp"
      // Da nascosto non è raggiungibile nemmeno con la tastiera, e `hidden` lo
      // toglie anche a chi usa uno screen reader: un pulsante invisibile ma
      // ancora annunciato sarebbe peggio che non averlo.
      aria-hidden={!visibile}
      tabIndex={visibile ? undefined : -1}
      className={`ease-morbido fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-salvia-600 text-sabbia-50 shadow-lg shadow-inchiostro-900/15 transition-all duration-500 hover:scale-105 active:scale-95 lg:right-8 lg:bottom-8 lg:h-16 lg:w-16 ${
        visibile
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <IconaWhatsapp className="h-7 w-7" />
    </a>
  )
}
