'use client'

import { useRef } from 'react'

import { Marchio } from '@/components/Marchio'
import { studio } from '@/data/contenuti'
import { useIntro } from '@/lib/contestoIntro'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'

/**
 * Intro "Il respiro".
 *
 * Il nome si scopre lettera per lettera, poi vola alla sua posizione nella
 * navbar mentre lo sfondo si dissolve sulla home: l'intro non precede il sito,
 * lo compone.
 *
 * Il volo anima `font-size`, `top` e `left` — mai `scale`: scalare il testo con
 * una trasformazione ne falsa spessore e antialiasing, e all'arrivo si vedrebbe
 * lo stacco con il testo vero della navbar.
 *
 * Compare una sola volta per sessione, solo atterrando sulla home, mai con
 * `prefers-reduced-motion` attivo (vedi `lib/contestoIntro.tsx`).
 */
export function Intro() {
  const { attiva, avviaUscita, concludi } = useIntro()
  const ref = useRef<HTMLDivElement>(null)
  const nomeRef = useRef<HTMLParagraphElement>(null)
  const lineaTemporale = useRef<gsap.core.Timeline | null>(null)
  const saltato = useRef(false)

  useGSAP(
    () => {
      if (!attiva) return

      // Niente scroll mentre l'intro è a schermo.
      document.body.style.overflow = 'hidden'

      const nome = nomeRef.current
      if (!nome) return

      /**
       * Il marchio entra subito, separato dal resto.
       *
       * Non aspetta i font perché non ne usa: è un'immagine. Aspettandoli, su
       * un telefono lento la schermata restava vuota per un secondo intero.
       *
       * L'animazione agisce sull'elemento intero — opacità, scala e un filo di
       * risalita — e non su parti interne di un disegno vettoriale: le
       * trasformazioni sui figli di un SVG sono il punto più fragile del
       * supporto mobile, ed è lì che il marchio spariva su Android.
       */
      gsap.from('[data-simbolo]', {
        opacity: 0,
        scale: 0.86,
        y: 14,
        duration: 1.2,
        ease: 'power3.out',
      })

      let annullato = false
      let lettere: SplitText | null = null
      let sigla: SplitText | null = null

      const avvia = () => {
        if (annullato || saltato.current) return

        // `mask: 'chars'` crea da solo i contenitori con overflow nascosto:
        // le lettere salgono da sotto una linea invisibile.
        lettere = SplitText.create(nome, { type: 'chars', mask: 'chars' })
        sigla = SplitText.create('[data-sottotitolo]', { type: 'chars' })
        const caratteri = sigla.chars
        const centro = (caratteri.length - 1) / 2

        const uscita = () => {
          const marchio = document.querySelector<HTMLElement>('[data-marchio]')

          // Le lettere separate hanno metriche proprie (contenitori inline-block
          // con maschera): riportiamo il testo intero prima di farlo volare.
          lettere?.revert()

          const finale = gsap.timeline({
            // L'hero parte da qui, non alla fine: quando il velo comincia a
            // dissolversi la foto è già in movimento sotto, e quando il velo
            // sparisce la pagina è composta invece che vuota.
            onStart: avviaUscita,
            onComplete: () => {
              document.body.style.overflow = ''
              concludi()
            },
          })

          finale
            .set('[data-salta]', { pointerEvents: 'none' })
            .to(['[data-linea]', '[data-sottotitolo]', '[data-salta]'], {
              opacity: 0,
              duration: 0.4,
              ease: 'power2.in',
            })

          const simboloIntro =
            ref.current?.querySelector<HTMLElement>('[data-simbolo]')
          const simboloNav = document.querySelector<HTMLElement>(
            '[data-simbolo-nav]',
          )

          if (marchio) {
            /**
             * L'istante in cui comincia il volo, e la sua durata.
             *
             * Girotondo e nome partono **nello stesso momento**. Non è solo una
             * questione di ritmo: sono uno sopra l'altro nella stessa colonna,
             * e nell'attimo in cui uno dei due passa a `position: fixed` esce
             * dal flusso e l'altro risale a riempire il vuoto. Ancorandoli
             * entrambi nello stesso fotogramma, alle misure prese prima che
             * qualcosa si muova, nessuno dei due vede spostarsi l'altro.
             */
            const VOLO = 0.4
            const DURATA = 1

            // Tutte le misure vengono prese adesso, mentre entrambi gli
            // elementi sono ancora nel flusso e fermi.
            const partenzaNome = nome.getBoundingClientRect()
            const arrivoNome = marchio.getBoundingClientRect()
            const stileArrivo = getComputedStyle(marchio)
            // Sopra una foto scura il marchio è chiaro, mentre il nome
            // nell'intro è scuro: senza questa transizione lo scambio finale
            // sarebbe un salto di colore.
            const coloreFinale = stileArrivo.color
            const corpoFinale = stileArrivo.fontSize

            const daSimbolo = simboloIntro?.getBoundingClientRect()
            const aSimbolo = simboloNav?.getBoundingClientRect()

            // --- Si sganciano entrambi, nello stesso fotogramma -------------
            finale.set(
              nome,
              {
                position: 'fixed',
                top: partenzaNome.top,
                left: partenzaNome.left,
                margin: 0,
              },
              VOLO,
            )

            if (simboloIntro && daSimbolo && aSimbolo) {
              finale.set(
                simboloIntro,
                {
                  position: 'fixed',
                  top: daSimbolo.top,
                  left: daSimbolo.left,
                  width: daSimbolo.width,
                  height: daSimbolo.height,
                  margin: 0,
                  transformOrigin: '0 0',
                },
                VOLO,
              )
            }

            // --- E volano insieme -------------------------------------------
            // Il nome anima `font-size`, mai `scale`: scalare il testo con una
            // trasformazione ne falsa spessore e antialiasing, e all'arrivo si
            // vedrebbe lo stacco con il testo vero della navbar.
            finale.to(
              nome,
              {
                top: arrivoNome.top,
                left: arrivoNome.left,
                fontSize: corpoFinale,
                color: coloreFinale,
                duration: DURATA,
                ease: 'power3.inOut',
              },
              VOLO,
            )

            // Il marchio usa `scale`: è un elemento HTML, dove le
            // trasformazioni funzionano su qualunque browser.
            if (simboloIntro && daSimbolo && aSimbolo) {
              finale.to(
                simboloIntro,
                {
                  top: aSimbolo.top,
                  left: aSimbolo.left,
                  scale: aSimbolo.width / daSimbolo.width,
                  duration: DURATA,
                  ease: 'power3.inOut',
                },
                VOLO,
              )
            }

            finale.to(
              '[data-sfondo]',
              { opacity: 0, duration: DURATA, ease: 'power2.inOut' },
              VOLO,
            )

            // --- Atterraggio --------------------------------------------------
            // I due testi sono sovrapponibili al pixel: stesso carattere, stesso
            // corpo, stessa interlinea, stessa posizione. Lo scambio è
            // istantaneo di proposito — una dissolvenza incrociata fra due
            // scritte identiche darebbe un avvallamento di opacità.
            //
            // Si accende il blocco intero (simbolo più nome), non il solo testo
            // misurato: quello vive dentro un contenitore trasparente.
            const ATTERRAGGIO = VOLO + DURATA
            finale
              .set('[data-marchio-blocco]', { opacity: 1 }, ATTERRAGGIO)
              .set(nome, { opacity: 0 }, ATTERRAGGIO)
              .set('[data-simbolo]', { opacity: 0 }, ATTERRAGGIO)
          } else {
            finale.to('[data-sfondo]', {
              opacity: 0,
              duration: 0.8,
              ease: 'power2.inOut',
            })
          }
        }

        lineaTemporale.current = gsap
          .timeline({ onComplete: uscita })

          .set(nome, { opacity: 1 }, 0)
          .from(
            lettere.chars,
            {
              yPercent: 120,
              duration: 1.1,
              ease: 'power4.out',
              stagger: 0.035,
            },
            0,
          )
          .fromTo(
            '[data-linea]',
            { scaleX: 0 },
            { scaleX: 1, duration: 1, ease: 'power3.inOut' },
            '-=0.45',
          )
          // Le lettere del sottotitolo si stringono verso il centro. Prima era
          // un'animazione di `letter-spacing`, che ricalcola il layout del testo
          // a ogni fotogramma; spostare i caratteri è puro compositing.
          .set('[data-sottotitolo]', { opacity: 1 }, '<')
          .fromTo(
            caratteri,
            {
              opacity: 0,
              y: 14,
              x: (indice: number) => (indice - centro) * 7,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 1.3,
              ease: 'power3.out',
              stagger: 0.012,
            },
            '<',
          )
          .to('[data-salta]', { opacity: 1, duration: 0.5 }, 0.8)
          // Una pausa prima di lasciare andare: è il "respiro" del titolo.
          .to({}, { duration: 0.45 })
      }

      // I font web arrivano dopo il primo disegno. Partire prima significa due
      // cose: SplitText misura glifi sbagliati, e l'animazione compete con
      // download e parsing proprio nel momento più affollato del caricamento.
      // Il timeout è una rete di sicurezza se i font non arrivassero mai.
      Promise.race([
        document.fonts.ready,
        new Promise((risolvi) => setTimeout(risolvi, 1500)),
      ]).then(avvia)

      return () => {
        annullato = true
        document.body.style.overflow = ''
        lineaTemporale.current?.kill()
        lettere?.revert()
        sigla?.revert()
      }
    },
    { scope: ref, dependencies: [attiva] },
  )

  if (!attiva) return null

  /** Salta l'intro: chiude tutto in mezzo secondo. */
  const salta = () => {
    saltato.current = true
    lineaTemporale.current?.kill()
    // Anche saltando, l'hero parte mentre il velo sfuma, non dopo.
    avviaUscita()
    gsap.to(ref.current, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => {
        document.body.style.overflow = ''
        concludi()
      },
    })
  }

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-100 flex items-center justify-center"
    >
      {/* Fondo pieno, senza alone: l'intro è una schermata pulita e il nome
          deve restare l'unica cosa che si guarda. */}
      <div data-sfondo className="absolute inset-0 bg-sabbia-50" />

      <div className="relative flex flex-col items-center px-6 text-center">
        {/* Il marchio apre la scena e poi vola al suo posto nella navbar. */}
        <div data-simbolo className="mb-9 sm:mb-11">
          <Marchio className="h-24 w-auto sm:h-28" />
        </div>

        <p
          ref={nomeRef}
          className="font-display text-4xl leading-none text-inchiostro-900 opacity-0 sm:text-6xl lg:text-7xl"
        >
          {studio.nome}
        </p>

        <div
          data-linea
          aria-hidden="true"
          className="mt-8 h-px w-40 origin-center scale-x-0 bg-salvia-400 sm:w-56"
        />

        <p
          data-sottotitolo
          className="mt-8 text-[0.7rem] tracking-[0.2em] text-salvia-600 uppercase opacity-0 sm:text-sm"
        >
          {studio.ruolo}
        </p>
      </div>

      <button
        data-salta
        type="button"
        onClick={salta}
        className="absolute bottom-10 text-sm text-inchiostro-500/70 opacity-0 transition-colors hover:text-salvia-600"
      >
        Salta l’introduzione
      </button>
    </div>
  )
}
