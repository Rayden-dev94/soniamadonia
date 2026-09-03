import type { ImgHTMLAttributes } from 'react'

import { marchio } from '@/data/contenuti'

/**
 * Accetta qualunque attributo di un `<img>`, così chi lo usa può marcarlo —
 * per esempio con l'attributo dati che l'intro cerca per farci atterrare
 * sopra il marchio volante.
 */
type Props = ImgHTMLAttributes<HTMLImageElement>

/**
 * Il marchio «ABA Friendly».
 *
 * È il file fornito dalla professionista: un JPG **senza trasparenza**, quindi
 * su qualunque fondo mostrerebbe un rettangolo bianco. `mix-blend-mode:
 * multiply` risolve senza ritoccare l'immagine — su uno sfondo chiaro il bianco
 * si fonde e sparisce. Vale ovunque tranne che su fondi scuri, dove andrebbe
 * invece una versione PNG con il canale alfa.
 *
 * Se un domani arriva quel PNG: si sostituisce il file, si toglie
 * `mix-blend-multiply` e non serve altro.
 */
export function Marchio({ className = '', ...resto }: Props) {
  return (
    <img
      src={marchio.file}
      alt=""
      aria-hidden="true"
      /* Misure intrinseche dichiarate: il browser riserva lo spazio giusto
         prima ancora di scaricare l'immagine, e la pagina non sobbalza. */
      width={615}
      height={533}
      decoding="async"
      className={`mix-blend-multiply ${className}`}
      {...resto}
    />
  )
}
