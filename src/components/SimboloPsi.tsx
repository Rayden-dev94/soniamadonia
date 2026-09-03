import type { SVGProps } from 'react'

/**
 * La lettera greca Ψ, simbolo della psicologia.
 *
 * ## Perché si può usare
 *
 * È una lettera dell'alfabeto greco: dominio pubblico, nessun titolare. Quello
 * che **non** si può usare è l'emblema di un Ordine — la composizione specifica
 * che ciascun Ordine regionale ha registrato come proprio marchio.
 *
 * Per questo il disegno è volutamente nudo: **nessun cerchio attorno, nessun
 * monogramma con altre lettere, nessuna corona o fregio**. Sono esattamente gli
 * elementi che rendono riconoscibile lo stemma di un ente, e la loro assenza è
 * ciò che tiene questo simbolo dalla parte giusta.
 *
 * È disegnato con tracciati e non con un carattere tipografico: così viene reso
 * identico ovunque, anche dove il font non fosse disponibile.
 */
export function SimboloPsi({ className = '', ...resto }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...resto}
    >
      {/* L'asta verticale, che attraversa tutta la lettera */}
      <path d="M24 5V43" />
      {/* La coppa: due bracci che scendono e si uniscono in un semicerchio */}
      <path d="M12 13v11a12 12 0 0 0 24 0V13" />
    </svg>
  )
}
