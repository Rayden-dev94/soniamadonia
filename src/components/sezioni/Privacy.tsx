import Link from 'next/link'

import { studio } from '@/data/contenuti'

/**
 * Bozza di informativa: fai sempre validare il testo definitivo da chi si
 * occupa della privacy dello studio prima di pubblicare.
 */
export function Privacy() {
  return (
    <section className="pt-36 pb-24 sm:pt-44">
      <div className="contenitore max-w-3xl">
        <h1 className="text-3xl leading-tight sm:text-4xl">
          Informativa privacy
        </h1>

        <div className="mt-10 space-y-8 text-lg leading-relaxed text-inchiostro-500">
          <div>
            <h2 className="text-xl">Titolare del trattamento</h2>
            <p className="mt-3">
              {studio.nomeCompleto}, {studio.citta} — {studio.partitaIva}. Per
              qualsiasi richiesta relativa ai tuoi dati puoi scrivere a{' '}
              <a
                href={`mailto:${studio.email}`}
                className="text-inchiostro-900 underline underline-offset-4"
              >
                {studio.email}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl">Dati raccolti dal sito</h2>
            <p className="mt-3">
              Il modulo di contatto raccoglie nome, indirizzo email e il
              contenuto del messaggio, con l’unica finalità di rispondere alla
              richiesta. I dati non vengono ceduti a terzi né usati per finalità
              di marketing.
            </p>
          </div>

          <div>
            <h2 className="text-xl">Conservazione</h2>
            <p className="mt-3">
              I messaggi ricevuti sono conservati per il tempo necessario a
              gestire la richiesta e, in caso di avvio di un percorso, secondo
              gli obblighi di legge e deontologici applicabili alla professione.
            </p>
          </div>

          <div>
            <h2 className="text-xl">I tuoi diritti</h2>
            <p className="mt-3">
              Ai sensi degli artt. 15-22 del GDPR puoi chiedere in ogni momento
              l’accesso, la rettifica, la cancellazione o la limitazione del
              trattamento dei tuoi dati, scrivendo all’indirizzo indicato sopra.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="bottone-contorno mt-14 inline-block px-7 py-3.5"
        >
          Torna alla home
        </Link>
      </div>
    </section>
  )
}
