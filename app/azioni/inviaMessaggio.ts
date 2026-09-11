'use server'

import nodemailer from 'nodemailer'

import { studio } from '@/data/contenuti'

export type EsitoInvio = {
  stato: 'inattivo' | 'inviato' | 'errore'
  messaggio?: string
}

/**
 * Perché SMTP e non un servizio di moduli.
 *
 * Un servizio esterno che raccoglie il modulo vedrebbe passare messaggi in cui
 * un genitore può descrivere la diagnosi del figlio. Non è un dramma — anche il
 * provider di posta li vede — ma è un fornitore in più da mettere sotto
 * contratto e da nominare nell'informativa privacy.
 *
 * Con SMTP il messaggio esce direttamente dalla casella della professionista e
 * arriva alla professionista: nessuno di nuovo nella catena. E siccome SMTP lo
 * parlano tutti — Aruba, Register, Brevo, Resend — la scelta del fornitore
 * resta aperta e si cambia toccando solo le variabili d'ambiente.
 */
function trasporto() {
  const host = process.env.SMTP_HOST
  const utente = process.env.SMTP_USER
  const password = process.env.SMTP_PASSWORD

  if (!host || !utente || !password) return null

  const porta = Number(process.env.SMTP_PORT ?? 587)

  return nodemailer.createTransport({
    host,
    port: porta,
    // 465 è cifrato fin dall'inizio; 587 parte in chiaro e passa a TLS.
    secure: porta === 465,
    auth: { user: utente, pass: password },
  })
}

function pulisci(valore: FormDataEntryValue | null, massimo: number) {
  return typeof valore === 'string' ? valore.trim().slice(0, massimo) : ''
}

export async function inviaMessaggio(
  _precedente: EsitoInvio,
  dati: FormData,
): Promise<EsitoInvio> {
  // Trappola per i robot: è un campo invisibile agli umani, che quindi lo
  // lasciano vuoto. Se è pieno, fingiamo che sia andato tutto bene invece di
  // segnalare l'errore — così chi automatizza non impara come aggirarla.
  if (pulisci(dati.get('azienda'), 100)) return { stato: 'inviato' }

  const nome = pulisci(dati.get('nome'), 120)
  const email = pulisci(dati.get('email'), 200)
  const messaggio = pulisci(dati.get('messaggio'), 4000)

  if (!nome || !email || !messaggio) {
    return { stato: 'errore', messaggio: 'Compila tutti i campi.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { stato: 'errore', messaggio: 'L’indirizzo email non sembra valido.' }
  }

  const posta = trasporto()
  if (!posta) {
    console.error('SMTP non configurato: variabili d’ambiente mancanti.')
    return {
      stato: 'errore',
      messaggio:
        'Invio non disponibile in questo momento. Scrivi direttamente a ' +
        studio.email,
    }
  }

  try {
    await posta.sendMail({
      /**
       * Il mittente è una variabile a sé, non l'utenza SMTP.
       *
       * Con una casella normale — Aruba, Register — le due cose coincidono: ci
       * si autentica con l'indirizzo da cui si spedisce, e infatti se
       * `EMAIL_MITTENTE` manca si ricade sull'utenza.
       *
       * Con un servizio di posta transazionale non coincidono affatto:
       * l'utenza è un codice tecnico del fornitore, del tipo
       * `8a1b2c@smtp-brevo.com`, e spedire da quello significa che il messaggio
       * viene rifiutato o marcato come spam. Lì il mittente deve essere un
       * indirizzo verificato su un dominio di cui si ha il controllo.
       *
       * Tenerli separati è ciò che rende il fornitore una scelta reversibile.
       */
      from: `"Sito ${studio.nome}" <${process.env.EMAIL_MITTENTE ?? process.env.SMTP_USER}>`,
      to: process.env.EMAIL_DESTINATARIO ?? studio.email,
      // Rispondendo al messaggio si risponde alla persona, non al sito.
      replyTo: `"${nome}" <${email}>`,
      subject: `Richiesta dal sito — ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\n\n${messaggio}\n`,
    })
    return { stato: 'inviato' }
  } catch (errore) {
    console.error('Invio fallito:', errore)
    return {
      stato: 'errore',
      messaggio:
        'Non è stato possibile inviare il messaggio. Riprova, oppure scrivi a ' +
        studio.email,
    }
  }
}
