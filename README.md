# Sonia Madonia — sito web

Sito professionale della **dott.ssa Carmela Maria Sonia Madonia**, psicologa e
Analista del Comportamento certificata (ABA), a Gela.

Quattro pagine (home, chi sono, servizi, contatti) più informativa privacy e 404.

I contenuti provengono dal documento fornito dalla professionista, conservato in
`contenuti-originali-sonia.txt`. **È la fonte: se un testo del sito diverge da
quel file, è il sito a essere sbagliato.**

## Stack

| Cosa            | Versione                                    |
| --------------- | ------------------------------------------- |
| Framework       | Next.js 16 (App Router, esportazione statica) |
| UI              | React 19 + TypeScript (strict)              |
| Stili           | Tailwind CSS 4 (via PostCSS)                |
| Animazioni      | GSAP 3 + ScrollTrigger + SplitText          |
| Font            | Fraunces + Inter, ospitati in locale        |
| Lint            | oxlint                                      |

`next.config.ts` usa `output: 'export'`: la build produce una cartella `out/`
di soli file statici, caricabile su qualunque hosting — anche condiviso, senza
Node. Il prezzo è che l'ottimizzazione automatica delle immagini, che richiede
un server, resta disattivata: le foto vanno ridimensionate a mano prima di
metterle in `public/`.

## Misurare le prestazioni

**Non giudicare la fluidità sul server di sviluppo.** In sviluppo il browser
scarica 107 moduli separati, React gira in modalità debug e `StrictMode`
esegue gli effetti due volte — quindi l'intro, che parte durante il
caricamento, viene costruita due volte nel momento peggiore. Per un giudizio
realistico usa `npm run preview`, che serve la build vera.

Se serve spremere altro: i font arrivano da Google Fonts, quindi da un'altra
origine. Ospitarli nel progetto (`public/font/`) toglie una connessione
esterna e anticipa l'avvio dell'intro.

## Comandi

> ### ⚠️ La build deve usare webpack
>
> `npm run build` esegue `next build --webpack`. **Non togliere quel flag.**
>
> Con Turbopack — predefinito in Next 16 — l'esportazione statica produce un
> sito che *non si idrata*: l'HTML arriva, gli script si scaricano, i moduli
> vengono eseguiti, nessun errore compare, ma React non riprende mai la pagina.
> Il sito resta muto e tutto ciò che aspetta GSAP resta invisibile.
>
> È un guasto silenzioso — build verde, nessun avviso — e costa ore da
> diagnosticare. Riscontrato con Next 16.3.4 e verificato su iOS 18.7.

```bash
npm run dev      # server di sviluppo Next
npm run build    # build statica in out/
npm run lint     # oxlint
```

`dev` e `preview` espongono anche l'IP di rete (`server.host` in
`vite.config.ts`): la riga **Network** che stampano all'avvio è l'indirizzo da
aprire dal telefono, purché sia sulla stessa rete del Mac.

## Struttura

```
src/
  components/
    Intestazione.tsx    fascia di apertura delle pagine interne
    Navbar.tsx          menu, con voce attiva evidenziata
    Footer.tsx
    RichiamoFinale.tsx  banda CTA riutilizzabile
    ScrollInCima.tsx    riporta in cima al cambio pagina
    sezioni/            blocchi di contenuto riusati fra le pagine
  data/
    contenuti.ts        TUTTI i testi del sito: modifica qui, non nei componenti
  hooks/
    useRivela.ts        reveal allo scroll per gli elementi con `data-anim`
    useSeo.ts           <title> e meta per pagina
  lib/
    gsap.ts             registrazione plugin GSAP (import da qui, non da 'gsap')
  pages/                una per rotta
  index.css             tema Tailwind (colori, font, utility `contenitore`)
```

## Rotte

| Percorso     | Pagina            | In menu |
| ------------ | ----------------- | ------- |
| `/`          | Home              | sì      |
| `/chi-sono`  | Chi sono          | sì      |
| `/servizi`   | Servizi + FAQ     | sì      |
| `/contatti`  | Contatti          | sì      |
| `/privacy`   | Informativa       | no      |
| `*`          | 404               | no      |

Le sezioni `ChiSono` e `Servizi` accettano la prop `anteprima`: in home mostrano
la versione ridotta con il rimando alla pagina completa.

### Chi va dove

| Pagina | Profondità | Contenuti |
| ------ | ---------- | --------- |
| Home | sintesi | Breve presentazione + i quattro percorsi in vetrina (titolo e una riga) |
| Chi sono | estesa | Biografia lunga, come lavoro, **attività ed eventi**, formazione |
| Servizi | dettaglio | Un blocco esteso per percorso: due paragrafi, «Può servire se», modalità e durata, immagine |

Le tre pagine non devono mai avere lo stesso livello di dettaglio: la home
invoglia, `chi-sono` costruisce fiducia, `servizi` risponde a «fa al caso mio?».

## L'intro

`components/Intro.tsx` — il nome si scopre lettera per lettera (SplitText con
`mask: 'chars'`), poi vola al posto del marchio della navbar mentre lo sfondo si
dissolve sulla home.

**Il volo anima `font-size`, `top` e `left`, mai `scale`.** Scalare il testo con
una trasformazione (per esempio con `Flip.fit({ scale: true })`) ne falsa
spessore delle aste e antialiasing: all'arrivo si vede lo stacco con il testo
vero della navbar. Animando il corpo del carattere il testo resta disegnato
nativamente a ogni fotogramma e atterra sovrapponibile al pixel — per questo lo
scambio fra le due scritte è istantaneo e non in dissolvenza.

Perché l'atterraggio resti esatto, le due scritte devono avere **stesso
carattere, stesso colore e stessa interlinea**: entrambe usano `font-display` e
`leading-none`. Se cambi una delle due, cambia anche l'altra.

**L'intro aspetta `document.fonts.ready` prima di partire.** SplitText misura i
glifi per posizionare le lettere: se i font web arrivano dopo la divisione, le
misure sono sbagliate e allo scambio del carattere salta tutto. Aspettare
sposta anche l'animazione fuori dal momento più affollato del caricamento.

Compare **una volta per sessione**, **solo atterrando sulla home**, e **mai** con
`prefers-reduced-motion` attivo. Lo stato sta in `lib/contestoIntro.tsx`: Navbar
e Hero lo leggono per restare fermi finché l'intro non ha finito.

Per rivederla durante lo sviluppo: `sessionStorage.clear()` in console, oppure
una finestra anonima. Per cambiarne il ritmo, agisci sulle `duration` del
timeline in `Intro.tsx`; per toglierla del tutto, basta rimuovere `<Intro />`
da `App.tsx`.

## Il menu mobile

Pannello a tutto schermo in `components/Navbar.tsx`, con lo stesso linguaggio
dell'intro: il fondo scende come un sipario (`yPercent`), le voci salgono da
sotto una linea invisibile, numeri e filetti entrano sfalsati.

**Le animazioni si costruiscono al tocco, non al montaggio.** Il pattern
"timeline in pausa creato una volta + `play()`/`reverse()`" sembra più
efficiente, ma registra i valori di partenza dei `fromTo` quando il componente
si monta: su mobile il layout in quel momento non è assestato (barra
dell'indirizzo, font in caricamento), e **la prima apertura scatta invece di
animare** — dalla seconda in poi funziona. Ricostruirle ogni volta costa niente
e legge sempre il DOM reale.

Apertura e chiusura sono due timeline distinte, non una l'inverso dell'altra: in
chiusura il contenuto esce svelto e il sipario risale dopo. Partono entrambe da
`gsap.killTweensOf(BERSAGLI)`, così tocchi ravvicinati si agganciano a metà
strada invece di sovrapporsi.

Con `prefers-reduced-motion` tutte le durate vanno a zero: il pannello compare
e sparisce, senza animazione.

## Lo sfondo del sito

`components/SfondoGlobale.tsx` + utility `sfondo-ambiente` in `index.css`.

Tre luci salvia molto diluite sopra la base sabbia, su un elemento **fisso**: la
luce resta ferma mentre il contenuto le scorre sopra, e il browser la dipinge una
volta sola invece che a ogni fotogramma di scroll (`background-attachment: fixed`
darebbe lo stesso effetto ma è pesante e difettoso su iOS).

Le sezioni che scandiscono il ritmo usano fondi **traslucidi**
(`bg-sabbia-100/55`), non pieni: un fondo opaco coprirebbe la luce e
spegnerebbe l'effetto. Se aggiungi sezioni, segui la stessa regola.

## Passaggi del mouse

Definiti come utility in `index.css`, non ripetuti sui singoli elementi:

- `legame` — collegamenti testuali: una linea salvia che cresce da sinistra e,
  uscendo, si ritira verso destra. Il perno che si sposta è ciò che la fa
  sembrare una linea che passa oltre invece che una che si riavvolge.
- `riempimento` — l'impalcatura dei pulsanti: uno pseudo-elemento a
  `z-index: -1` che sale dal basso, dipinto sopra il fondo ma sotto il testo.
  Il colore si passa con `--velo`.
- `bottone-verde`, `bottone-contorno`, `bottone-chiaro`,
  `bottone-contorno-chiaro` — le quattro varianti, per fondo chiaro o sopra una
  foto.

Tutto in `transform`, quindi in regola con la sezione qui sotto.

## Prestazioni su mobile

Tre regole imparate a spese di questo sito, da non violare aggiungendo effetti:

1. **Mai `filter: blur()` su superfici grandi, men che meno animate.** Sfocare
   500px costringe la GPU a ri-sfocare tutto a ogni fotogramma. Gli aloni
   morbidi usano l'utility `alone` (gradiente radiale): stessa resa, costo zero.
2. **Mai `backdrop-blur` su elementi fissi.** Sfocare ciò che sta dietro a una
   navbar fissa significa ricalcolare la sfocatura a ogni fotogramma di scroll.
3. **Mai animare `letter-spacing`.** Ricalcola il layout del testo a ogni
   fotogramma. Per stringere le lettere del sottotitolo dell'intro si spostano
   i singoli caratteri con una trasformazione: stesso effetto, puro compositing.
4. **Animare solo `transform` e `opacity`.** Il sipario del menu usa `yPercent`,
   non `clip-path`: il primo lo gestisce il compositore, il secondo obbliga a
   ridisegnare l'area (ed è capriccioso su iOS Safari).

## Animazioni

Importa sempre GSAP da `@/lib/gsap`, così i plugin risultano registrati una
volta sola.

Per animare in entrata un elemento basta l'attributo `data-anim` dentro una
sezione che usa `useRivela()`. Lo stato iniziale `opacity: 0` è già in CSS, per
evitare il flash di contenuto prima che parta il JS; con
`prefers-reduced-motion: reduce` le animazioni vengono disattivate.

## SEO

Ogni pagina imposta `<title>`, meta description e canonical tramite `useSeo`.

In `index.html`, in HTML **statico**, ci sono i dati strutturati (JSON-LD) e i
meta per le anteprime social. Statico è la parola importante: i motori li
leggono al primo passaggio, senza dover eseguire l'applicazione. Il grafo
dichiara due entità collegate — la persona e lo studio — con professione, sede,
competenze e le certificazioni coi numeri verificabili.

### Rendering statico

`npm run build` genera **un file HTML completo per ogni rotta**, con il testo
già dentro. Prima della migrazione un crawler leggeva zero parole su 2.659.

| Pagina | Parole nell'HTML |
| ------ | ---------------- |
| `/` | 521 |
| `/chi-sono` | 790 |
| `/servizi` | 1476 |
| `/contatti` | 147 |
| `/privacy` | 202 |
| `404.html` | 94 |

I meta di ogni pagina sono dichiarati con `export const metadata` accanto al
componente: Next li scrive nell'HTML statico. Non c'è più nessun elenco di
rotte da tenere sincronizzato a mano — una pagina nuova sotto `app/` viene
generata da sola.

**Mappa del sito e robots sono generati dal codice** (`app/sitemap.ts` e
`app/robots.ts`), non più file statici che potevano andare fuori sincrono in
silenzio. `/privacy` è esclusa dalla mappa di proposito: è marcata come da non
indicizzare, e segnalarla sarebbe una contraddizione.

Aggiungendo una pagina, ricordati di elencarla in `app/sitemap.ts`.

## Da completare prima di andare online

I contenuti sono ora quelli reali. Restano da verificare:

- [x] **Dominio** — `www.soniamadonia.it`, confermato. Compare in
      `index.html` (canonical, Open Graph e dati strutturati),
      `public/sitemap.xml` e `public/robots.txt`. L'email resta invece
      `@abafriendly.it`: è un dominio diverso, non un refuso
- [ ] **Partita IVA** — non presente nel documento, ora segnaposto in
      `contenuti.ts` → `studio.partitaIva`
- [ ] **«Infinito»** — l'ultimo paragrafo arriva troncato dal documento: si
      interrompe su «alla costruzione di qualcosa». Va completato con le parole
      della dott.ssa, non inventate (`contenuti.ts` → `opera`)
- [ ] **Le FAQ** (`contenuti.ts` → `faq`) sono l'unica parte non scritta da lei:
      ricavate dai suoi contenuti, da far leggere e approvare
- [ ] **Fotografie** — `public/sonia-prova.jpg` è 950×960, troppo piccola;
      `public/ambiente-*.jpg` sono immagini d'ambiente generiche, da sostituire
      con fotografie dei luoghi reali di lavoro
- [ ] **Modulo contatti** — `src/components/sezioni/Contatti.tsx`, l'`action`
      punta a un endpoint FormSubmit di esempio
- [ ] **Informativa privacy** — `src/pages/Privacy.tsx` è una bozza, va
      validata da chi segue la privacy
- [ ] `public/favicon.svg` — ancora quella di Vite

### Vincoli deontologici da non violare

- **Niente testimonianze di pazienti** o di famiglie: si scontrano con il
  segreto professionale e con l'art. 40 del Codice Deontologico.
- **La nota sulle certificazioni** in fondo alla sezione dedicata
  (`notaCertificazioni`) chiarisce che una certificazione ABA non è un Albo:
  è una precisazione di correttezza professionale, non va rimossa.
- Le descrizioni possono dire **cosa si fa**, mai promettere risultati clinici
  o suggerire superiorità sui colleghi.

## Deploy

Il progetto è una SPA: il server deve reindirizzare le rotte sconosciute a
`index.html`, altrimenti `/servizi` restituisce 404 al refresh. Sono già inclusi
`public/_redirects` (Netlify, Cloudflare Pages) e `vercel.json` (Vercel).
