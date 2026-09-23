/**
 * Blocca la pagina dietro a un pannello a tutto schermo **senza perderne la
 * posizione**.
 *
 * La via breve — `body { overflow: hidden }` — sembra quella giusta e invece è
 * la fonte di un difetto preciso: l'overflow del `body` si propaga alla
 * finestra del browser, e togliere al viewport la possibilità di scorrere ne
 * azzera l'offset. Chi apriva il menu a metà pagina si ritrovava in cima, e
 * richiudendolo la posizione era persa.
 *
 * La via giusta è fissare il corpo dov'è: `position: fixed` con un `top`
 * negativo pari allo scorrimento corrente. Visivamente non cambia nulla — la
 * pagina resta esattamente dove la si stava guardando — ma non scorre più.
 *
 * La barra di scorrimento sparisce insieme allo scorrimento: il suo spessore
 * viene restituito come spazio a destra, altrimenti il contenuto si allarga di
 * colpo. Dove le barre sono sovrapposte — macOS, telefoni — la misura è zero e
 * la riga non fa nulla.
 *
 * Vive qui e non dentro un componente perché lo usano in due, il menu e la
 * finestra delle aree: finché erano due copie, una delle due era quella
 * sbagliata.
 */
export function bloccaScorrimento(memoria: { current: number }) {
  if (document.body.style.position === 'fixed') return

  memoria.current = window.scrollY

  const barra = window.innerWidth - document.documentElement.clientWidth
  const corpo = document.body.style

  corpo.position = 'fixed'
  corpo.top = `-${memoria.current}px`
  corpo.left = '0'
  corpo.width = '100%'
  corpo.paddingRight = `${barra}px`
}

/**
 * Restituisce la pagina e la rimette dov'era.
 *
 * `behavior: 'instant'` non è pignoleria: se un domani tornasse uno
 * `scroll-behavior: smooth` sull'elemento radice, senza questa precisazione il
 * ritorno alla posizione diventerebbe una scorrimento animata di mezza pagina,
 * ben visibile a ogni chiusura.
 */
export function sbloccaScorrimento(memoria: { current: number }) {
  const corpo = document.body.style
  if (corpo.position !== 'fixed') return

  corpo.position = ''
  corpo.top = ''
  corpo.left = ''
  corpo.width = ''
  corpo.paddingRight = ''

  window.scrollTo({ top: memoria.current, behavior: 'instant' })
}
