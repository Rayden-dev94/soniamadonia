'use client'

import { pubblicazione } from '@/data/contenuti'
import { useRivela } from '@/hooks/useRivela'

/**
 * Il manuale scritto e illustrato dalla dott.ssa Madonia.
 *
 * Sta in home, subito prima di «Infinito», perché i due blocchi dicono la
 * stessa cosa da due parti diverse — che il lavoro è passato dalle sue mani —
 * e insieme fanno da contrappeso alla parte clinica della pagina: prima le
 * credenziali verificabili, poi ciò che ha prodotto.
 *
 * La copertina sta a sinistra e il testo a destra, non il contrario: un libro
 * si riconosce dall'oggetto prima che dal titolo, e chi scorre la pagina deve
 * capire in un colpo d'occhio che qui si parla di un volume che può comprare.
 */
export function Libro() {
  const ref = useRivela<HTMLElement>()

  return (
    <section ref={ref} className="bg-sabbia-100/55 py-24 sm:py-32">
      <div className="contenitore grid items-center gap-14 lg:grid-cols-[0.55fr_1fr] lg:gap-20">
        {/* La copertina è azzurra e il fondo del sito è sabbia: senza un
            appoggio sotto sembrerebbe incollata sulla pagina. L'ombra bassa e
            larga la solleva quel tanto che basta a farla leggere come un
            oggetto, senza aggiungere un bordo che ne taglierebbe il colore. */}
        <img
          data-anim
          src={pubblicazione.copertina}
          alt={`Copertina del libro «${pubblicazione.titolo}» di ${pubblicazione.autore}`}
          width={1000}
          height={1294}
          loading="lazy"
          decoding="async"
          className="mx-auto w-full max-w-[17rem] rounded-sm rounded-r-xl shadow-[0_22px_50px_-28px_rgba(46,40,35,0.65)] lg:mx-0"
        />

        <div>
          <p
            data-anim
            className="mb-5 text-sm tracking-[0.2em] text-salvia-600 uppercase"
          >
            {pubblicazione.occhiello}
          </p>
          <h2 data-anim className="text-3xl leading-tight sm:text-4xl">
            {pubblicazione.titolo}
          </h2>
          <p data-anim className="mt-4 text-sm text-inchiostro-500/80">
            {pubblicazione.autore} — {pubblicazione.dettagli}
          </p>

          <div className="misura mt-8 space-y-5 text-lg leading-relaxed text-inchiostro-500">
            {pubblicazione.paragrafi.map((paragrafo) => (
              <p key={paragrafo.slice(0, 24)} data-anim>
                {paragrafo}
              </p>
            ))}
          </div>

          {/* Il collegamento porta fuori dal sito e si apre in una scheda
              nuova: chi legge con uno screen reader lo deve sapere prima di
              premere, non dopo — da qui l'etichetta estesa. */}
          <a
            data-anim
            href={pubblicazione.linkAcquisto}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Acquista ora su Amazon (si apre in una nuova scheda)"
            className="bottone-verde mt-9 inline-block px-7 py-3.5"
          >
            Acquista ora
          </a>
        </div>
      </div>
    </section>
  )
}
