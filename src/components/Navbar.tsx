'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Marchio } from '@/components/Marchio'
import { IconaWhatsapp } from '@/components/Whatsapp'
import { linkWhatsapp, navigazione, studio } from '@/data/contenuti'
import {
  bloccaScorrimento,
  sbloccaScorrimento,
} from '@/lib/bloccoScorrimento'
import { useIntro } from '@/lib/contestoIntro'
import { gsap, motoRidotto, useGSAP } from '@/lib/gsap'

/** I bersagli del pannello e del pulsante, unici in tutta la pagina. */
const BERSAGLI =
  '[data-pannello], [data-fondo], [data-alone], [data-voce], [data-riga], [data-numero], [data-piede], [data-hamburger], [data-barra]'

/**
 * Metà della distanza fra i centri delle due barre a riposo: 1px di altezza
 * più 6px di spazio fanno 7px, quindi ciascuna ne percorre 3,5 per incontrarsi
 * sulla stessa linea.
 */
const MEZZA_DISTANZA = 3.5

/**
 * Le due animazioni del pannello stanno fuori dal componente e vengono
 * costruite al momento del tocco, non al montaggio.
 *
 * Costruire il timeline una volta sola e poi fare play()/reverse() sembra più
 * efficiente, ma registra i valori di partenza dei `fromTo` quando il
 * componente si monta: su mobile in quel momento il layout non è assestato
 * (barra dell'indirizzo che si ritrae, font ancora in caricamento), e la prima
 * apertura parte da misure sbagliate — scatta invece di animare. Ricostruirle
 * ogni volta costa niente e legge sempre il DOM reale.
 *
 * Vengono invocate dentro `contextSafe`, quindi i selettori restano circoscritti
 * alla navbar e GSAP le ripulisce da solo allo smontaggio.
 */
function animaApertura() {
  // Tocchi ravvicinati: spegniamo quello che sta ancora girando, incluso il
  // `set` di chiusura che altrimenti nasconderebbe il pannello appena aperto.
  gsap.killTweensOf(BERSAGLI)
  const d = motoRidotto() ? 0 : 1

  gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .set('[data-pannello]', { autoAlpha: 1 })
    // Il fondo scende come un sipario. È una translazione, non un clip-path:
    // la gestisce il compositore senza ridisegnare l'area a ogni fotogramma.
    .fromTo(
      '[data-fondo]',
      { yPercent: -100 },
      { yPercent: 0, duration: 0.75 * d, ease: 'power4.inOut' },
    )
    .fromTo(
      '[data-alone]',
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4 * d, ease: 'sine.out' },
      0.1 * d,
    )
    // Le voci salgono da sotto una linea invisibile, come il nome nell'intro.
    .fromTo(
      '[data-voce]',
      { yPercent: 115 },
      { yPercent: 0, duration: 0.8 * d, stagger: 0.07 * d },
      0.28 * d,
    )
    .fromTo(
      '[data-riga]',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.7 * d, stagger: 0.07 * d, ease: 'power2.inOut' },
      0.32 * d,
    )
    .fromTo(
      '[data-numero]',
      { opacity: 0, x: -8 },
      { opacity: 1, x: 0, duration: 0.6 * d, stagger: 0.07 * d },
      0.36 * d,
    )
    .fromTo(
      '[data-piede]',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7 * d },
      0.6 * d,
    )

    // --- La croce, in tre battute -------------------------------------------
    // 1. Le due barre si cercano: si incontrano sulla stessa linea e quella
    //    corta si allunga fino a pareggiare l'altra.
    .to(
      '[data-barra]',
      {
        y: (indice: number) =>
          indice === 0 ? MEZZA_DISTANZA : -MEZZA_DISTANZA,
        scaleX: 1,
        duration: 0.3 * d,
        ease: 'power3.inOut',
      },
      0,
    )
    // 2. Il perno passa dal fondo al centro. Si può fare solo adesso, con le
    //    barre già a larghezza piena: spostarlo prima si vedrebbe.
    .set('[data-barra]', { transformOrigin: '50% 50%' }, 0.3 * d)
    // 3. Le barre si aprono nella croce mentre tutto il pulsante compie un
    //    quarto di giro. La croce è simmetrica rispetto a 90°, quindi la
    //    rotazione non cambia il disegno finale: si legge come puro movimento.
    //    `back.out` fa superare di poco i 45° prima di assestarsi — è lo scatto
    //    che dà la sensazione di un meccanismo che si incastra.
    .to(
      '[data-hamburger]',
      { rotate: 90, duration: 0.55 * d, ease: 'power4.inOut' },
      0.24 * d,
    )
    .to(
      '[data-barra="alta"]',
      { rotate: 45, duration: 0.55 * d, ease: 'back.out(1.7)' },
      0.24 * d,
    )
    .to(
      '[data-barra="bassa"]',
      { rotate: -45, duration: 0.55 * d, ease: 'back.out(1.7)' },
      0.24 * d,
    )
}

/**
 * La chiusura non è l'apertura al contrario: il contenuto esce svelto e il
 * sipario risale dopo. Usando `.to()` sui valori correnti, se si tocca due volte
 * in fretta l'animazione si aggancia a metà strada invece di scattare.
 */
function animaChiusura() {
  gsap.killTweensOf(BERSAGLI)
  const d = motoRidotto() ? 0 : 1

  gsap
    .timeline({ defaults: { ease: 'power2.in' } })
    .to('[data-voce]', {
      yPercent: 115,
      duration: 0.3 * d,
      stagger: 0.04 * d,
    })
    .to(
      ['[data-numero]', '[data-riga]', '[data-piede]', '[data-alone]'],
      { opacity: 0, duration: 0.25 * d },
      0,
    )
    .to(
      '[data-fondo]',
      { yPercent: -100, duration: 0.5 * d, ease: 'power3.inOut' },
      0.15 * d,
    )
    .set('[data-pannello]', { autoAlpha: 0 })

    // --- La croce si disfa, nell'ordine inverso -----------------------------
    // Prima si richiude la rotazione, poi le barre si separano: smontare
    // partendo dalla fine è ciò che fa sembrare il gesto reversibile invece
    // che una seconda animazione diversa.
    .to(
      ['[data-hamburger]', '[data-barra]'],
      { rotate: 0, duration: 0.4 * d, ease: 'power3.inOut' },
      0,
    )
    .set('[data-barra]', { transformOrigin: '100% 50%' }, 0.4 * d)
    .to(
      '[data-barra]',
      { y: 0, duration: 0.3 * d, ease: 'power3.out' },
      0.4 * d,
    )
    .to(
      '[data-barra="bassa"]',
      { scaleX: 0.65, duration: 0.3 * d, ease: 'power3.out' },
      0.4 * d,
    )
}

export function Navbar() {
  const [staccata, setStaccata] = useState(false)
  const [aperta, setAperta] = useState(false)
  const { attiva: introAttiva, deciso } = useIntro()
  const percorso = usePathname()

  const ref = useRef<HTMLElement>(null)

  const { contextSafe } = useGSAP({ scope: ref })

  // Stato e animazione cambiano insieme, sul gesto dell'utente: nessun effect
  // che parta al montaggio con il pannello ancora chiuso.
  const mostraMenu = contextSafe(() => {
    setAperta(true)
    animaApertura()
  })

  const nascondiMenu = contextSafe(() => {
    setAperta(false)
    animaChiusura()
  })

  useEffect(() => {
    // Gli eventi di scroll arrivano molto più fitti dei fotogrammi: senza
    // questo filtro leggiamo il layout decine di volte per frame.
    let inAttesa = false
    const alloScroll = () => {
      if (inAttesa) return
      inAttesa = true
      requestAnimationFrame(() => {
        setStaccata(window.scrollY > 24)
        inAttesa = false
      })
    }
    alloScroll()
    window.addEventListener('scroll', alloScroll, { passive: true })
    return () => window.removeEventListener('scroll', alloScroll)
  }, [])

  // Esc chiude il pannello, come ci si aspetta da un overlay.
  useEffect(() => {
    if (!aperta) return
    const allaTastiera = (e: KeyboardEvent) => {
      if (e.key === 'Escape') nascondiMenu()
    }
    window.addEventListener('keydown', allaTastiera)
    return () => window.removeEventListener('keydown', allaTastiera)
  })

  /**
   * Niente scorrimento dietro al pannello aperto.
   *
   * Qui c'era `body { overflow: hidden }`, ed era la causa del difetto più
   * fastidioso del sito da telefono: quell'overflow si propaga alla finestra e
   * ne azzera la posizione, quindi aprendo il menu a metà pagina si tornava in
   * cima — e passando a un'altra pagina si vedeva il contenuto comparire e poi
   * saltare verso l'alto. Su computer non si notava perché questo pannello
   * esiste solo sugli schermi stretti.
   *
   * Vedi `lib/bloccoScorrimento`, che fissa il corpo dov'è invece di togliergli
   * la possibilità di scorrere.
   */
  const scorrimento = useRef(0)

  useEffect(() => {
    if (!aperta) return
    bloccaScorrimento(scorrimento)
    return () => sbloccaScorrimento(scorrimento)
  }, [aperta])

  // `NavLink` di React Router segnalava da sé la voce attiva. Con next/link
  // la si ricava dal percorso corrente, che è comunque un dato che serve.
  const stileVoce = (href: string) =>
    `legame text-sm transition-colors hover:text-salvia-700 lg:text-base ${
      percorso === href ? 'text-salvia-700' : 'text-inchiostro-500'
    }`

  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-morbido ${
        staccata && !aperta
          ? 'bg-sabbia-50/95 shadow-[0_1px_0_0_var(--color-sabbia-200)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="contenitore relative z-10 flex h-20 items-center justify-between lg:h-28">
        {/* Il marchio sta accanto al nome, non al suo posto.
            `data-marchio` resta sul solo testo perché è lì che l'intro fa
            atterrare il nome volante: se misurasse tutto il blocco, il volo
            finirebbe spostato della larghezza del simbolo. La comparsa la
            governa invece `data-marchio-blocco`, così simbolo e nome si
            accendono insieme. */}
        <Link
          data-marchio-blocco
          href="/"
          onClick={nascondiMenu}
          className={`flex items-center gap-3 transition-opacity lg:gap-4 ${
            !deciso || introAttiva ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Marchio className="h-9 w-auto shrink-0 lg:h-14" data-simbolo-nav />
          <span
            data-marchio
            className="legame font-display text-lg leading-none text-inchiostro-900 transition-colors hover:text-salvia-700 lg:text-2xl"
          >
            {studio.nome}
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex lg:gap-10">
          {navigazione.map((voce) => (
            <li key={voce.href}>
              <Link href={voce.href} className={stileVoce(voce.href)}>
                {voce.etichetta}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contatti"
              className="rounded-full bg-salvia-600 px-5 py-2.5 text-sm font-medium text-sabbia-50 transition-colors hover:bg-salvia-700 lg:px-7 lg:py-3 lg:text-base"
            >
              Richiedi un colloquio
            </Link>
          </li>
        </ul>

        {/* La trasformazione in croce è coreografata da GSAP, non da transizioni
            CSS: qui restano solo gli stati di partenza. Aggiungere classi di
            trasformazione condizionali le farebbe litigare con gli stili inline
            dell'animazione. */}
        <button
          data-hamburger
          type="button"
          onClick={() => (aperta ? nascondiMenu() : mostraMenu())}
          aria-expanded={aperta}
          aria-controls="menu-mobile"
          aria-label={aperta ? 'Chiudi il menu' : 'Apri il menu'}
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            data-barra="alta"
            className="h-px w-6 origin-right bg-inchiostro-900"
          />
          {/* Lo stato iniziale è scritto in `transform`, non con la classe
              `scale-x-65`: in Tailwind v4 quella scrive nella proprietà CSS
              `scale`, che è un canale separato da `transform` e si moltiplica
              con esso invece di sostituirlo. GSAP anima `transform`, quindi
              leggerebbe una scala di 1 e la barra non si allungherebbe mai. */}
          <span
            data-barra="bassa"
            style={{ transform: 'scaleX(0.65)' }}
            className="h-px w-6 origin-right bg-inchiostro-900"
          />
        </button>
      </nav>

      <div
        data-pannello
        id="menu-mobile"
        aria-hidden={!aperta}
        className="invisible fixed inset-0 z-0 overflow-hidden md:hidden"
      >
        <div data-fondo className="absolute inset-0 bg-sabbia-50" />
        <div
          data-alone
          aria-hidden="true"
          className="alone pointer-events-none absolute -right-40 -bottom-40 h-[34rem] w-[34rem]"
        />

        <div className="contenitore relative flex h-full flex-col justify-between gap-10 overflow-y-auto pt-28 pb-12">
          <ul>
            {navigazione.map((voce, indice) => (
              <li key={voce.href}>
                <div
                  data-riga
                  aria-hidden="true"
                  className="h-px origin-left bg-sabbia-200"
                />
                <Link
                  href={voce.href}
                  onClick={nascondiMenu}
                  className="flex items-baseline gap-5 py-6"
                >
                  <span
                    data-numero
                    className="font-display text-sm text-salvia-600"
                  >
                    0{indice + 1}
                  </span>
                  <span className="block overflow-hidden">
                    <span
                      data-voce
                      className="font-display block text-4xl leading-tight text-inchiostro-900"
                    >
                      {voce.etichetta}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <div
                data-riga
                aria-hidden="true"
                className="h-px origin-left bg-sabbia-200"
              />
            </li>
          </ul>

          <div data-piede className="space-y-6">
            <Link
              href="/contatti"
              onClick={nascondiMenu}
              className="block rounded-full bg-salvia-600 px-7 py-4 text-center text-sabbia-50"
            >
              Richiedi un colloquio
            </Link>
            <div className="space-y-1 text-sm text-inchiostro-500">
              <p>
                <a
                  href={`mailto:${studio.email}`}
                  className="legame transition-colors hover:text-salvia-700"
                >
                  {studio.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${studio.telefono.replace(/\s/g, '')}`}
                  className="legame transition-colors hover:text-salvia-700"
                >
                  {studio.telefono}
                </a>
              </p>
              <p>
                <a
                  href={linkWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={nascondiMenu}
                  className="legame inline-flex items-center gap-2 transition-colors hover:text-salvia-700"
                >
                  <IconaWhatsapp className="h-4 w-4" />
                  WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
