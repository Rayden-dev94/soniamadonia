import Link from 'next/link'

import { studio } from '@/data/contenuti'

/**
 * Bozza di informativa: fai sempre validare il testo definitivo da chi si
 * occupa della privacy dello studio prima di pubblicare.
 *
 * ⚠️ La sezione sui fornitori **non è decorativa e non va tolta**. Dal momento
 * in cui il modulo di contatto è entrato in funzione, i messaggi attraversano
 * davvero tre aziende prima di arrivare alla dott.ssa, e il GDPR chiede che
 * chiunque scriva lo sappia prima di premere invio. Un messaggio dal modulo può
 * contenere la descrizione della difficoltà di un bambino: non è un dato
 * qualunque.
 *
 * Se un domani si cambia fornitore — via Brevo, via Vercel — **questo elenco va
 * aggiornato lo stesso giorno**, non alla prossima revisione del sito.
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
              richiesta. I dati non vengono venduti, non vengono comunicati a
              terzi per loro finalità e non vengono usati per finalità di
              marketing. Il sito non usa cookie di profilazione né strumenti di
              statistica che seguano chi naviga.
            </p>
          </div>

          <div>
            <h2 className="text-xl">Chi tratta i dati per mio conto</h2>
            <p className="mt-3">
              Per far funzionare il sito e recapitare i messaggi mi avvalgo di
              tre fornitori, che trattano i dati soltanto su mie istruzioni e
              non per finalità proprie:
            </p>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-3 h-1 w-1 shrink-0 rounded-full bg-salvia-500"
                />
                <span>
                  <strong className="text-inchiostro-900">Vercel Inc.</strong>{' '}
                  ospita il sito e ne registra gli accessi tecnici, compreso
                  l’indirizzo IP. Ha sede negli Stati Uniti: il trasferimento
                  avviene sulla base delle garanzie previste dal GDPR per i
                  Paesi extra-europei.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-3 h-1 w-1 shrink-0 rounded-full bg-salvia-500"
                />
                <span>
                  <strong className="text-inchiostro-900">
                    Brevo — Sendinblue SAS
                  </strong>{' '}
                  recapita i messaggi inviati dal modulo. Ha sede in Francia e i
                  dati restano nell’Unione Europea.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-3 h-1 w-1 shrink-0 rounded-full bg-salvia-500"
                />
                <span>
                  <strong className="text-inchiostro-900">Aruba S.p.A.</strong>{' '}
                  gestisce la casella di posta sulla quale ricevo i messaggi. Ha
                  sede in Italia.
                </span>
              </li>
            </ul>
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
