/**
 * Strato di colore dietro tutto il sito.
 *
 * È `fixed`, quindi la luce resta ferma mentre il contenuto le scorre sopra:
 * dà la sensazione di una stanza illuminata invece che di una pagina colorata.
 * Essendo fisso e immobile viene dipinto una volta sola — non costa nulla
 * nemmeno durante lo scroll.
 *
 * Sta sotto al contenuto (`-z-10`) ma sopra il colore di base del `body`.
 */
export function SfondoGlobale() {
  return (
    <div
      aria-hidden="true"
      className="sfondo-ambiente pointer-events-none fixed inset-0 -z-10"
    />
  )
}
