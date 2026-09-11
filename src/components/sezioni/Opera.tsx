'use client'

import { opera } from '@/data/contenuti'
import { useRivela } from '@/hooks/useRivela'

/**
 * «Infinito», l'opera collettiva.
 *
 * L'unica sezione del sito dove l'immagine non illustra il testo ma **è** il
 * contenuto: per questo occupa tutta la larghezza del contenitore e il testo
 * la segue in una colonna stretta, invece di affiancarla.
 *
 * L'opera è su tela bianca e il fondo del sito è sabbia: senza un bordo
 * sottile i margini della tela si perderebbero e il trittico sembrerebbe
 * ritagliato male. Il bordo la fa leggere come un oggetto appeso.
 */
export function Opera() {
  const ref = useRivela<HTMLElement>()

  return (
    // Da quando sopra c'è la sezione del libro, con il suo fondo sabbia, questa
    // ha bisogno di uno spazio suo in cima: senza, l'occhiello «Un'opera
    // collettiva» partiva incollato al bordo della banda colorata.
    <section ref={ref} className="py-24 sm:py-32">
      <div className="contenitore">
        <p
          data-anim
          className="mb-5 text-sm tracking-[0.2em] text-salvia-600 uppercase"
        >
          {opera.occhiello}
        </p>
        <h2 data-anim className="text-3xl leading-tight sm:text-4xl">
          {opera.titolo}
        </h2>

        <img
          data-anim
          src={opera.immagine}
          alt={opera.alt}
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          className="mt-12 w-full rounded-[1.5rem] border border-sabbia-200 lg:rounded-[2rem]"
        />

        <div className="misura mt-12 space-y-5 text-lg leading-relaxed text-inchiostro-500">
          {opera.paragrafi.map((paragrafo) => (
            <p key={paragrafo.slice(0, 24)} data-anim>
              {paragrafo}
            </p>
          ))}

          {/* La chiusura si stacca dal corpo del testo: un filo salvia a
              sinistra, il carattere dei titoli e un colore più pieno. Non è una
              citazione da qualcun altro — è la sua frase finale — quindi niente
              virgolette né corsivo, solo il peso che le spetta. */}
          <p
            data-anim
            className="border-l-2 border-salvia-400 pt-2 pl-6 font-display text-xl leading-relaxed text-inchiostro-900 sm:text-2xl"
          >
            {opera.chiusura}
          </p>
        </div>
      </div>
    </section>
  )
}
