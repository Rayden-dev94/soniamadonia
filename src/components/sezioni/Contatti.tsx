'use client'

import { useActionState } from 'react'

import type { EsitoInvio } from '@/app/azioni/inviaMessaggio'
import { inviaMessaggio } from '@/app/azioni/inviaMessaggio'
import { IconaWhatsapp } from '@/components/Whatsapp'
import { immagini, linkWhatsapp, studio } from '@/data/contenuti'
import { useRivela } from '@/hooks/useRivela'

const INIZIALE: EsitoInvio = { stato: 'inattivo' }

export function Contatti() {
  const ref = useRivela<HTMLElement>()
  const [esito, invia, inCorso] = useActionState(inviaMessaggio, INIZIALE)

  return (
    <section ref={ref} className="pb-24 sm:pb-32">
      <div className="contenitore grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 data-anim className="text-2xl leading-tight sm:text-3xl">
            Dove trovarmi
          </h2>

          <dl data-anim className="mt-8 space-y-4 text-inchiostro-500">
            <div>
              <dt className="text-sm text-inchiostro-500/70">Email</dt>
              <dd>
                <a
                  href={`mailto:${studio.email}`}
                  className="legame text-inchiostro-900 transition-colors hover:text-salvia-700"
                >
                  {studio.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-inchiostro-500/70">Telefono</dt>
              <dd>
                <a
                  href={`tel:${studio.telefono.replace(/\s/g, '')}`}
                  className="legame text-inchiostro-900 transition-colors hover:text-salvia-700"
                >
                  {studio.telefono}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-inchiostro-500/70">WhatsApp</dt>
              <dd>
                <a
                  href={linkWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="legame inline-flex items-center gap-2 text-inchiostro-900 transition-colors hover:text-salvia-700"
                >
                  <IconaWhatsapp className="h-4 w-4 text-salvia-600" />
                  Scrivi su WhatsApp
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-inchiostro-500/70">Sede</dt>
              <dd className="text-inchiostro-900">{studio.citta}</dd>
            </div>
            {/* I comuni serviti sono un'informazione che una famiglia cerca
                davvero — «ci viene fin qui?» — ed è anche il modo corretto di
                nominare più località: dichiarate come area di lavoro, non
                sparse nel testo fingendo altrettante sedi. */}
            <div>
              <dt className="text-sm text-inchiostro-500/70">Zona servita</dt>
              <dd className="text-inchiostro-900">
                Gela e provincia di Caltanissetta, Caltagirone e provincia di
                Catania
              </dd>
            </div>
          </dl>

          <p
            data-anim
            className="mt-10 max-w-md rounded-2xl border border-sabbia-200 p-6 leading-relaxed text-inchiostro-500"
          >
            Gli incontri possono essere concordati in base alla tipologia di
            richiesta, al luogo di svolgimento e alle esigenze della persona,
            della famiglia o dell’organizzazione.
          </p>

          <img
            data-anim
            src={immagini.contatti}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="mt-10 hidden aspect-4/3 w-full max-w-md rounded-[2rem] object-cover lg:block"
          />
        </div>

        {/* Il modulo passa da un'azione server nostra, non da un servizio
            esterno: il messaggio esce via SMTP dalla casella della
            professionista e arriva alla professionista. */}
        <form
          data-anim
          action={invia}
          className="rounded-3xl border border-sabbia-200 bg-sabbia-100/70 p-8 sm:p-10"
        >
          <div className="space-y-5">
            {/* Trappola per i robot: nascosta agli umani e agli screen reader,
                ma compilata dai riempitori automatici. Se arriva piena, il
                messaggio viene scartato in silenzio. */}
            <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
              <label htmlFor="azienda">Azienda</label>
              <input id="azienda" name="azienda" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label
                htmlFor="nome"
                className="mb-2 block text-sm text-inchiostro-500"
              >
                Nome
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                autoComplete="name"
                className="w-full rounded-xl border border-sabbia-200 bg-sabbia-50 px-4 py-3 outline-none transition-colors focus:border-salvia-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-inchiostro-500"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-sabbia-200 bg-sabbia-50 px-4 py-3 outline-none transition-colors focus:border-salvia-400"
              />
            </div>

            <div>
              <label
                htmlFor="messaggio"
                className="mb-2 block text-sm text-inchiostro-500"
              >
                Messaggio
              </label>
              <textarea
                id="messaggio"
                name="messaggio"
                rows={5}
                required
                className="w-full resize-y rounded-xl border border-sabbia-200 bg-sabbia-50 px-4 py-3 outline-none transition-colors focus:border-salvia-400"
              />
            </div>

            <label className="flex items-start gap-3 text-sm text-inchiostro-500">
              <input
                type="checkbox"
                name="privacy"
                required
                className="mt-1 accent-salvia-600"
              />
              <span>
                Ho letto l’informativa privacy e acconsento al trattamento dei miei
                dati per essere ricontattata/o.
              </span>
            </label>

            <button
              type="submit"
              disabled={inCorso}
              className="bottone-verde w-full px-7 py-3.5 disabled:opacity-60"
            >
              {inCorso ? 'Invio in corso…' : 'Invia il messaggio'}
            </button>

            {/* `aria-live` fa annunciare l'esito da uno screen reader: senza,
                chi non vede lo schermo non saprebbe se l'invio è riuscito. */}
            <p aria-live="polite" className="text-sm">
              {esito.stato === 'inviato' && (
                <span className="text-salvia-700">
                  Messaggio inviato. Ti risponderò personalmente, di norma entro
                  due giorni lavorativi.
                </span>
              )}
              {esito.stato === 'errore' && (
                <span className="text-inchiostro-900">{esito.messaggio}</span>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
