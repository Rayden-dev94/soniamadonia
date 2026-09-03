import type { NextConfig } from 'next'

const config: NextConfig = {
  /**
   * Indirizzi autorizzati a usare le risorse del server di sviluppo.
   *
   * Next 16 le blocca per impostazione predefinita quando la richiesta arriva
   * da un'origine diversa da `localhost`. È una misura di sicurezza sensata —
   * impedisce a un sito aperto in un'altra scheda di curiosare nel tuo server
   * di sviluppo — ma ha un effetto collaterale spiazzante: aprendo il sito dal
   * telefono, cioè dall'IP di rete, il pacchetto client **non si completa e
   * React non idrata**. La pagina si carica, non solleva errori, e resta muta.
   *
   * Riguarda solo lo sviluppo. Se l'IP del Mac in rete locale cambia, va
   * aggiornato qui.
   */
  allowedDevOrigins: ['192.168.1.6'],

  /**
   * Niente `output: 'export'`.
   *
   * Il sito viene pubblicato su Vercel, che esegue Next in modo nativo: non
   * serve ridurlo a file statici. Da questa scelta discendono tre cose che
   * l'esportazione ci negava:
   *
   * 1. l'**ottimizzazione automatica delle immagini** qui sotto;
   * 2. la possibilità di gestire il **modulo contatti con codice nostro**,
   *    senza affidare i messaggi a un servizio esterno;
   * 3. nessun aggiramento del difetto di Turbopack, che si manifestava proprio
   *    con l'esportazione statica.
   *
   * Se un domani il sito dovesse spostarsi su un hosting condiviso senza Node,
   * si rimette `output: 'export'` — ricordandosi che in quel caso la build
   * **deve** usare webpack, o il sito non si idrata.
   */
  images: {
    // Formati moderni: pesano molto meno a parità di resa.
    formats: ['image/avif', 'image/webp'],
  },
}

export default config
