import { studio } from '@/data/contenuti'
import { useRivela } from '@/hooks/useRivela'

export function Contatti() {
  const ref = useRivela<HTMLElement>()

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
              <dt className="text-sm text-inchiostro-500/70">Sede</dt>
              <dd className="text-inchiostro-900">{studio.citta}</dd>
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
        </div>

        {/*
          Il form usa FormSubmit come endpoint di esempio: sostituisci `action`
          con il tuo servizio (Formspree, Resend, una tua API…) prima di andare
          online.
        */}
        <form
          data-anim
          action={`https://formsubmit.co/${studio.email}`}
          method="POST"
          className="rounded-3xl border border-sabbia-200 bg-sabbia-100/70 p-8 sm:p-10"
        >
          <div className="space-y-5">
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
              className="bottone-verde w-full px-7 py-3.5"
            >
              Invia il messaggio
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
