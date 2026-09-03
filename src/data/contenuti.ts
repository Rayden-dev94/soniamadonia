/**
 * Tutti i testi del sito in un unico punto.
 *
 * Il contenuto viene dal documento scritto dalla dott.ssa Madonia
 * (`contenuti-originali-sonia.txt` nella radice del progetto). Dove il web
 * chiede frasi più corte i testi sono stati accorciati, mai riscritti: i
 * termini tecnici, i numeri di certificazione e le date sono i suoi.
 */

export const studio = {
  nome: 'Sonia Madonia',
  nomeCompleto: 'Dott.ssa Carmela Maria Sonia Madonia',
  ruolo: 'Psicologa e Analista del Comportamento certificata',
  albo: 'Albo degli Psicologi della Regione Siciliana, Sezione A — n. 10600',
  email: 'soniamadonia@abafriendly.it',
  telefono: '+39 328 961 5159',
  citta: 'Gela (CL)',
  /** Nessuna partita IVA nel documento: da chiedere prima della pubblicazione. */
  partitaIva: 'P. IVA da inserire',
}

/**
 * Contatto WhatsApp.
 *
 * Il numero va scritto in formato internazionale **senza `+`, spazi o zeri
 * iniziali**: è l'unico che `wa.me` accetta. Il messaggio precompilato toglie a
 * chi scrive l'imbarazzo della prima riga — che su un tema delicato è spesso
 * l'ostacolo vero.
 */
export const whatsapp = {
  numero: '393289615159',
  messaggio:
    'Salve dott.ssa Madonia, le scrivo dal suo sito per avere informazioni.',
}

export const linkWhatsapp = `https://wa.me/${whatsapp.numero}?text=${encodeURIComponent(whatsapp.messaggio)}`

/**
 * Fotografie della professionista.
 *
 * `/sonia-prova.jpg` è la foto di prova: 950×960 px, troppo piccola per la
 * pubblicazione. Per la versione definitiva serve almeno 2000 px di lato lungo.
 */
export const ritratto = {
  file: '/sonia-prova.jpg' as string | null,
  alt: `${studio.nome}, ${studio.ruolo.toLowerCase()}`,
  inquadratura: 'center 20%',
}

/** Foto grande della prima schermata. */
export const fotoHero = {
  file: '/sonia-prova.jpg' as string | null,
  alt: `${studio.nome} nel suo studio`,
  inquadratura: 'center 18%',
}

export const navigazione = [
  { etichetta: 'Chi sono', href: '/chi-sono' },
  { etichetta: 'Servizi', href: '/servizi' },
  { etichetta: 'Contatti', href: '/contatti' },
]

/**
 * Apertura della home, dalle prime righe del documento.
 *
 * Il titolo è la versione accorciata: nel documento originale è «interventi
 * individualizzati per persone con diagnosi di autismo». In un titolo la forma
 * breve si legge meglio; la dicitura tecnica resta nei paragrafi qui sotto e
 * nelle pagine interne, dove la precisione conta di più della scorrevolezza.
 */
export const presentazione = {
  titolo:
    'Interventi personalizzati per persone con autismo e altri disturbi del neurosviluppo',
  paragrafi: [
    // La città è nominata qui, nel primo paragrafo: è il punto in cui una
    // ricerca locale trova la corrispondenza. Detta con naturalezza, non
    // appiccicata — il territorio in cui lavora è un'informazione vera.
    'Sono la dott.ssa Sonia Madonia, psicologa e Analista del Comportamento certificata, con oltre quindici anni di esperienza nell’ambito dell’Analisi del Comportamento Applicata — Applied Behavior Analysis (ABA). Lavoro a Gela e nel territorio delle province di Caltanissetta e Catania.',
    'Mi occupo di osservazione e valutazione comportamentale, progettazione di interventi individualizzati, supervisione clinica, parent training, coordinamento di équipe multidisciplinari e formazione di professionisti, operatori e personale scolastico.',
    'Ogni intervento viene costruito sulle caratteristiche, sulle abilità e sui bisogni specifici della persona, e viene monitorato attraverso l’osservazione diretta e la raccolta sistematica dei dati.',
  ],
}

/**
 * Immagini d'ambiente usate fuori dalle aree di servizio.
 *
 * ⚠️ Sono fotografie generiche di stock, scelte senza persone e nella
 * palette del sito. Servono a non lasciare pagine di solo testo, ma vanno
 * sostituite con fotografie dei luoghi reali di lavoro: la ricerca sul
 * settore è unanime nel dire che le foto vere convertono molto meglio.
 */
export const immagini = {
  contatti: '/ambiente-6.jpg',
}

/**
 * Il marchio personale della professionista.
 *
 * È un JPG **senza trasparenza**: sul fondo sabbia mostrerebbe un rettangolo
 * bianco. Nel componente viene fuso con `mix-blend-mode: multiply`, che su uno
 * sfondo chiaro fa sparire il bianco senza bisogno di ritoccare il file.
 * Se un domani arriva una versione PNG trasparente, la fusione si può togliere.
 */
export const marchio = {
  file: '/logo-abafriendly.jpg',
  alt: 'ABA Friendly',
}

/**
 * I tre fatti verificabili, in evidenza sulla home.
 *
 * Sono numeri e iscrizioni, non aggettivi: chiunque può controllarli sui
 * registri. È il tipo di prova che sostituisce le testimonianze, che in Italia
 * un professionista sanitario non può usare.
 */
export const credenziali = [
  {
    valore: 'Dal 2010',
    etichetta: 'nel campo dell’Analisi del Comportamento Applicata',
  },
  {
    valore: 'n. 10600',
    etichetta: 'Albo degli Psicologi della Regione Siciliana, Sezione A',
  },
  {
    valore: 'Tre',
    etichetta: 'certificazioni: IBAO®, IACABAI e SIACSA/ABAIT',
  },
]

/**
 * «Infinito» — l'opera collettiva.
 *
 * Il simbolo dell'infinito, non il pezzo di puzzle: è una presa di posizione
 * precisa nella comunità autistica, e il testo la rende esplicita. Non
 * sostituire né l'immagine né le parole con qualcosa di più «neutro».
 *
 * ⚠️ L'ultima frase arriva troncata dal documento fornito: si interrompe su
 * «alla costruzione di qualcosa». Va completata con le parole della dott.ssa
 * prima di pubblicare — non inventate.
 */
export const opera = {
  occhiello: 'Un’opera collettiva',
  titolo: 'Infinito',
  immagine: '/opera-infinito.jpg',
  alt: 'Infinito: trittico su tela in cui il simbolo dell’infinito è composto da centinaia di impronte digitali colorate, trasformate in piccoli animali.',
  paragrafi: [
    'Infinito è un’opera collettiva realizzata con le impronte dei bambini e dei ragazzi con diagnosi di autismo che seguo nell’ambito dei progetti promossi dalle ASP di Caltanissetta e Catania, presso le Cooperative Carpe Diem di Gela e Zeno Saltini di Caltagirone.',
    'Alle loro impronte si uniscono quelle delle tante persone che, con ruoli diversi, fanno parte della nostra rete: tecnici del comportamento, educatori, insegnanti, tirocinanti, fotografi, rappresentanti delle istituzioni e responsabili delle cooperative e molti altri.',
    'Tutte queste impronte, diverse tra loro, si incontrano e formano un unico infinito. Sono stati proprio alcuni ragazzi con diagnosi di autismo a farmene comprendere il significato più profondo: non sono pezzi di un puzzle e nessuno di noi lo è. Ogni persona è unica e completa, ma può entrare in relazione con gli altri e contribuire con le proprie caratteristiche e i propri talenti alla costruzione di qualcosa.',
  ],
}

/** A chi si rivolgono i servizi. */
export const destinatari = [
  // L'elenco completo delle diagnosi è quello del documento originale.
  // Riassumerlo in «autismo o altri disturbi del neurosviluppo» — come avevo
  // fatto in una prima stesura — costava caro due volte: una famiglia con una
  // diagnosi di ADHD o di DSA non si riconosceva, e il sito spariva da quelle
  // ricerche. I nomi delle diagnosi sono i termini con cui le persone cercano.
  'Bambini, adolescenti e adulti con diagnosi di autismo, disabilità intellettiva, disturbi della comunicazione e del linguaggio, ADHD (disturbo da deficit di attenzione/iperattività), disturbi specifici dell’apprendimento e altri disturbi del neurosviluppo',
  'Genitori, familiari e caregiver',
  'Insegnanti, educatori, ASACOM e Tecnici del Comportamento',
  'Scuole e istituti di formazione',
  'Cooperative sociali, centri educativi e servizi riabilitativi',
  'Équipe multidisciplinari',
  'Enti e organizzazioni interessati alla progettazione di servizi e percorsi formativi',
]

/**
 * I servizi, raggruppati in quattro aree.
 *
 * Il documento originale ne elenca sedici: presentarli in fila renderebbe la
 * pagina illeggibile. Le aree seguono l'ordine naturale di un percorso —
 * prima si capisce, poi si interviene, poi si estende ai contesti di vita, e
 * in parallelo si formano le persone che ci lavorano.
 */
export const aree = [
  {
    titolo: 'Valutazione e progettazione',
    sommario:
      'Dal primo colloquio al piano individualizzato: capire cosa serve prima di decidere come intervenire.',
    /** Foto vera di un colloquio: persone riconoscibili, serve il consenso. */
    immagine: '/colloquio.jpg',
    servizi: [
      {
        titolo: 'Primo colloquio e analisi della richiesta',
        testo:
          'Il primo colloquio consente di comprendere le esigenze della famiglia, le principali difficoltà del bambino e il tipo di supporto richiesto, per valutare l’appropriatezza della presa in carico. Se si decide di proseguire, viene svolta un’intervista approfondita con i genitori o caregiver per individuare le priorità e definire gli obiettivi del percorso.',
      },
      {
        titolo: 'Osservazione comportamentale',
        testo:
          'L’osservazione viene effettuata, quando possibile e necessario, nei contesti in cui le abilità o le difficoltà si manifestano: casa, scuola, centro educativo. Lo scopo è descrivere in modo concreto ciò che la persona fa, in quali condizioni un comportamento si presenta e quali conseguenze possono mantenerlo. Non si limita alle difficoltà: considera anche abilità già acquisite, punti di forza, interessi e competenze emergenti.',
      },
      {
        titolo: 'Valutazione delle abilità e dei bisogni individuali',
        testo:
          'Permette di definire il profilo di funzionamento della persona e individuare le abilità da potenziare, attraverso colloqui, osservazioni dirette, raccolta dei dati e strumenti coerenti con gli obiettivi.',
        elenco: [
          'Comunicazione',
          'Abilità sociali',
          'Gioco e tempo libero',
          'Prerequisiti dell’apprendimento',
          'Autonomie personali, domestiche e sociali',
          'Partecipazione alle attività quotidiane',
          'Tolleranza dei cambiamenti e delle attese',
          'Regolazione del comportamento',
          'Generalizzazione e mantenimento delle abilità',
        ],
      },
      {
        titolo: 'Valutazione funzionale dei comportamenti',
        testo:
          'Serve a comprendere le variabili che influenzano i comportamenti problema — quelli che interferiscono con l’apprendimento, la partecipazione o la vita quotidiana: definizione operazionale, raccolta di informazioni da genitori e insegnanti, osservazione di antecedenti e conseguenze, ipotesi sulla funzione, individuazione di strategie preventive e abilità alternative da insegnare. Prima di attribuire una funzione esclusivamente comportamentale vengono considerati anche fattori medici, sensoriali, comunicativi e ambientali.',
      },
      {
        titolo: 'Progettazione di interventi ABA individualizzati',
        testo:
          'Sulla base della valutazione viene predisposto un piano con obiettivi osservabili, misurabili e significativi per la vita quotidiana della persona. Nel piano sono specificati obiettivi, procedure di insegnamento, aiuti, modalità di rinforzo, criteri di acquisizione e modalità di raccolta dei dati.',
      },
    ],
  },
  {
    titolo: 'Intervento e accompagnamento',
    sommario:
      'La messa in pratica: supervisione degli operatori, parent training, monitoraggio dei progressi sui dati.',
    /**
     * ⚠️ Ritrae un MINORE durante un intervento.
     *
     * Non basta il consenso generico: serve quello scritto di **entrambi** i
     * genitori o di chi esercita la responsabilità genitoriale, specifico per
     * la pubblicazione sul web. Il fatto che il contesto lasci intuire una
     * diagnosi lo rende un dato particolarissimo ai sensi del GDPR.
     */
    immagine: '/intervento.jpg',
    servizi: [
      {
        titolo: 'Supervisione degli interventi ABA',
        testo:
          'Rivolta ai Tecnici del Comportamento, agli educatori e agli operatori coinvolti nell’attuazione del piano: osservazione dell’applicazione delle procedure, dimostrazione degli interventi, formazione pratica, feedback specifici, analisi dei dati e aggiornamento degli obiettivi. Permette di mantenere coerenza fra tutte le persone coinvolte, nel rispetto del ruolo e delle competenze di ciascuno.',
      },
      {
        titolo: 'Monitoraggio dei progressi',
        testo:
          'I progressi vengono verificati attraverso dati osservabili, non attraverso impressioni generali: se le abilità previste vengono acquisite, se gli obiettivi sono adeguati, se le procedure sono applicate correttamente, se i risultati si mantengono nel tempo e in contesti diversi. I dati vengono analizzati e condivisi periodicamente con la famiglia e con l’équipe, in un linguaggio comprensibile e rispettoso.',
      },
      {
        titolo: 'Parent training',
        testo:
          'Un percorso strutturato di formazione e accompagnamento per genitori e caregiver: osservare e descrivere i comportamenti, riconoscere le condizioni che li influenzano, applicare con coerenza le procedure del piano, sostenere comunicazione e autonomie, riconoscere e rinforzare i progressi. Non consiste nella consegna di indicazioni scritte: le procedure vengono spiegate, mostrate concretamente, esercitate insieme e accompagnate da feedback.',
      },
      {
        titolo: 'Consulenza comportamentale nelle difficoltà alimentari',
        testo:
          'Percorsi rivolti alle famiglie di bambini con selettività alimentare, comportamenti di rifiuto o difficoltà nella partecipazione al pasto: analisi della storia alimentare e delle routine, osservazione dei comportamenti di accettazione ed evitamento, obiettivi misurabili, strategie individualizzate come esposizione graduata, shaping, rinforzo differenziale e fading. Prima dell’avvio vengono considerati gli aspetti medici, nutrizionali, sensoriali, oro-motori e di deglutizione; quando necessario l’intervento entra in una presa in carico multidisciplinare.',
      },
      {
        titolo: 'Interventi per le autonomie personali e sociali',
        testo:
          'Percorsi per favorire indipendenza e partecipazione nei diversi ambienti di vita: cura personale, organizzazione delle routine, abilità domestiche, uso funzionale del tempo libero, spostamenti, accesso a negozi e servizi, comunicazione nei contesti sociali, regole di sicurezza. Le abilità vengono suddivise in passaggi insegnabili e adattate all’età e alle opportunità reali della persona.',
      },
    ],
  },
  {
    titolo: 'Scuola, équipe e organizzazioni',
    sommario:
      'Il lavoro con i contesti: consulenza scolastica, coordinamento dell’équipe, progettazione di servizi.',
    /**
     * Foto vera: ritrae persone riconoscibili e richiede il loro consenso
     * prima della pubblicazione.
     */
    immagine: '/corso-formazione.jpg',
    servizi: [
      {
        titolo: 'Consulenza scolastica',
        testo:
          'Rivolta a insegnanti, educatori, ASACOM e alle altre figure coinvolte nel percorso educativo: osservazione nel contesto scolastico, individuazione delle abilità prioritarie, analisi delle condizioni che facilitano o ostacolano la partecipazione, strategie per comunicazione, autonomia e inclusione, adattamento delle attività, confronto periodico con famiglia ed équipe. L’obiettivo è costruire strategie sostenibili, applicabili nelle reali routine della classe.',
      },
      {
        titolo: 'Coordinamento dell’équipe multidisciplinare',
        testo:
          'Condivisione degli obiettivi e definizione dei ruoli, organizzazione degli incontri, condivisione di informazioni e dati, verifica dei progressi, raccordo fra famiglia, scuola, tecnici e professionisti. In base ai bisogni possono essere coinvolti medici, neuropsichiatri, psicologi, logopedisti, nutrizionisti, terapisti della neuro e psicomotricità, terapisti occupazionali, educatori e insegnanti: ciascuno contribuisce nel rispetto delle proprie competenze.',
      },
      {
        titolo: 'Consulenza scientifica e progettazione di servizi',
        testo:
          'Per cooperative, enti, istituti scolastici e organizzazioni: analisi dei bisogni, definizione del modello operativo, progettazione dei percorsi, indicatori di esito, organizzazione e formazione dell’équipe, procedure e strumenti di monitoraggio, supervisione dell’attuazione, valutazione della qualità del servizio e coordinamento scientifico di corsi di formazione.',
      },
    ],
  },
  {
    titolo: 'Formazione',
    sommario:
      'Corsi per Tecnici del Comportamento, professionisti sanitari, insegnanti e personale scolastico.',
    /**
     * Foto vera, non un'immagine d'ambiente.
     *
     * ⚠️ Ritrae persone riconoscibili: prima della pubblicazione serve il loro
     * consenso all'uso dell'immagine. Un volto risulta già oscurato
     * nell'originale — segno che il tema è stato considerato, ma vale per
     * tutti gli altri.
     */
    immagine: '/corso-scuola.jpg',
    servizi: [
      {
        titolo: 'Formazione per Tecnici del Comportamento e professionisti sanitari',
        testo:
          'Sono referente scientifico e docente del corso per Tecnico del Comportamento presso l’Istituto di Sociologia “Luigi Sturzo” di Caltagirone. Il percorso è rivolto a Tecnici del Comportamento, educatori, ASACOM e professionisti sanitari — psicologi, psicoterapeuti, logopedisti. Per le professioni sanitarie ammesse è previsto il riconoscimento di 50 crediti ECM, secondo le modalità stabilite dal provider accreditato.',
        elenco: [
          'Osservazione, misurazione e valutazione funzionale del comportamento',
          'Procedure di insegnamento, prompting e rinforzo',
          'Comunicazione funzionale e sviluppo delle autonomie',
          'Prevenzione e gestione dei comportamenti che interferiscono',
          'Raccolta, rappresentazione e interpretazione dei dati',
          'Generalizzazione e mantenimento delle abilità',
          'Collaborazione con famiglie ed équipe multidisciplinari',
          'Responsabilità etiche e limiti del ruolo professionale',
        ],
      },
      {
        titolo: 'Formazione per insegnanti e personale scolastico',
        testo:
          'Incontri formativi sui temi dell’autismo, dei Bisogni Educativi Speciali e dell’inclusione: comprensione del comportamento, organizzazione preventiva dell’ambiente, comunicazione e supporti visivi, motivazione e rinforzo, abilità sociali, transizioni, autonomie scolastiche, collaborazione scuola-famiglia-équipe e promozione del benessere nel gruppo classe. I contenuti vengono adattati alle esigenze dell’istituto e accompagnati da esempi applicativi.',
      },
    ],
  },
]

/** Le cinque fasi del metodo di lavoro. */
export const metodo = [
  {
    numero: '01',
    titolo: 'Analisi della richiesta',
    testo:
      'Vengono raccolte le informazioni necessarie per comprendere le esigenze della persona, della famiglia o del servizio.',
  },
  {
    numero: '02',
    titolo: 'Osservazione e valutazione',
    testo:
      'Si osservano abilità, difficoltà, contesti e variabili rilevanti, con strumenti coerenti con gli obiettivi.',
  },
  {
    numero: '03',
    titolo: 'Definizione degli obiettivi',
    testo:
      'Gli obiettivi vengono stabiliti insieme alle persone coinvolte e formulati in maniera concreta, osservabile, misurabile e significativa.',
  },
  {
    numero: '04',
    titolo: 'Progettazione e attuazione',
    testo:
      'Viene predisposto un piano individualizzato che descrive procedure, responsabilità, modalità di insegnamento e raccolta dei dati.',
  },
  {
    numero: '05',
    titolo: 'Monitoraggio e revisione',
    testo:
      'I risultati vengono verificati periodicamente. Il piano viene mantenuto, aggiornato o modificato sulla base dei dati raccolti e delle risposte della persona.',
  },
]

/** I principi professionali dichiarati nel documento. */
export const principi = [
  'Centralità e dignità della persona',
  'Individualizzazione dell’intervento',
  'Obiettivi significativi per la qualità della vita',
  'Coinvolgimento consapevole della famiglia',
  'Collaborazione tra professionisti',
  'Utilizzo di procedure fondate sulle evidenze',
  'Raccolta e analisi dei dati',
  'Verifica della corretta applicazione degli interventi',
  'Rispetto dei ruoli e dei confini professionali',
  'Attenzione alla generalizzazione e al mantenimento delle abilità',
  'Revisione del programma quando i dati indicano l’assenza di progressi',
]

/** Biografia estesa, pagina "Chi sono". */
export const biografia = [
  'Sono una psicologa iscritta all’Albo degli Psicologi della Regione Siciliana, Sezione A, e un’Analista del Comportamento in possesso della certificazione internazionale IBA®, rilasciata da IBAO®, della certificazione AdC IACABAI e dell’attestazione SIACSA/ABAIT.',
  'Dal 2010 opero nel campo dell’Analisi del Comportamento Applicata. Nel corso della mia esperienza ho ricoperto i ruoli di Tutor ABA, Analista del Comportamento, supervisore clinico, coordinatrice di équipe multidisciplinari, referente scientifico e docente in corsi rivolti a Tecnici del Comportamento, ASACOM, insegnanti e professionisti sanitari.',
  'Mi occupo della progettazione e della supervisione di interventi rivolti a persone con diagnosi di autismo e altri disturbi del neurosviluppo, con particolare attenzione alla comunicazione, alle abilità di apprendimento, alle autonomie personali e sociali e alla partecipazione nei diversi contesti di vita.',
  'Collaboro con famiglie, scuole, cooperative sociali, professionisti sanitari e servizi del territorio, promuovendo interventi individualizzati, multidisciplinari e fondati sull’osservazione e sull’analisi dei dati.',
]

/**
 * Certificazioni, con la spiegazione di che cosa attesta ciascuna.
 *
 * La nota finale è obbligatoria per correttezza deontologica e va tenuta
 * visibile: distingue le certificazioni dall'iscrizione all'Albo.
 */
export const certificazioni = [
  {
    titolo: 'International Behavior Analyst® — IBAO®',
    numero: 'Certificazione n. 76933613',
    logo: '/logo-ibao.png' as string | null,
    sigla: 'IBAO®',
    testo:
      'IBAO® — International Behavior Analysis Organization® — è un organismo internazionale di certificazione nell’ambito dell’Analisi del Comportamento Applicata. La certificazione IBA® attesta il possesso degli standard previsti in materia di formazione, esperienza pratica, supervisione, competenze ed etica professionale, e rende verificabile la preparazione dell’Analista del Comportamento a livello internazionale.',
  },
  {
    titolo: 'Analista del Comportamento — AdC IACABAI',
    numero: 'Certificazione n. 1-001-39',
    logo: '/logo-iacabai.png' as string | null,
    sigla: 'IACABAI',
    testo:
      'IACABAI è l’Italy Associate Chapter di ABAI e gestisce i registri dedicati alle figure professionali dell’Analisi del Comportamento Applicata. La certificazione AdC attesta i requisiti tecnico-scientifici previsti per progettare, coordinare e monitorare interventi comportamentali.',
  },
  {
    titolo: 'Analista del Comportamento — SIACSA/ABAIT',
    numero: 'Codice socio S-2022-00601 — validità fino al 31 dicembre 2026',
    logo: '/logo-abait.png' as string | null,
    sigla: 'ABAIT',
    /** Marchio orizzontale: va tenuto più basso degli altri due (vedi nota). */
    largo: true,
    testo:
      'SIACSA gestisce il registro nazionale professionale degli Analisti e degli Assistenti Analisti del Comportamento. ABAIT — Applied Behavior Analysis Italia — promuove il riconoscimento e lo sviluppo delle professioni ABA e ne definisce i requisiti formativi e professionali.',
  },
]

export const notaCertificazioni =
  'Le certificazioni attestano competenze specifiche nell’Analisi del Comportamento Applicata. Non costituiscono Albi o Ordini professionali e si affiancano alla mia abilitazione sanitaria e all’iscrizione all’Albo degli Psicologi.'

/** Titoli di studio e iscrizioni. */
export const qualifiche = [
  'Psicologa iscritta all’Albo degli Psicologi della Regione Siciliana, Sezione A, n. 10600',
  'Analista del Comportamento certificata IBAO® — International Behavior Analysis Organization®, certificazione n. 76933613',
  'Analista del Comportamento certificata IACABAI, certificazione n. 1-001-39',
  'Iscritta al registro ABAIT, codice S-2022-00601',
  'Iscritta al registro SIACSA, codice S-2022-00601',
  'Master universitario di II livello in Applied Behavior Analysis e intervento comportamentale precoce per l’autismo',
  'Laurea in Psicologia presso l’Università degli Studi di Palermo',
]

/** Collaborazioni con cooperative e progetti territoriali. */
export const collaborazioni = [
  {
    periodo: 'Dal 2026',
    ente: 'Omnia Società Cooperativa Sociale',
    luogo: 'Sommatino, San Cataldo e Niscemi',
    ruolo: 'Psicologa e Analista del Comportamento',
    testo:
      'Prestazioni specialistiche ABA in piena autonomia tecnica, scientifica e organizzativa: valutazione funzionale, predisposizione e monitoraggio dei programmi d’intervento, interventi comportamentali diretti e parent training.',
  },
  {
    periodo: 'Dall’8 gennaio 2025',
    ente: 'Cooperativa Sociale Zeno Saltini Onlus',
    luogo: 'Caltagirone',
    ruolo: 'Supervisore Analista del Comportamento',
    testo:
      'Progetto avviato dall’ASP di Catania per l’erogazione di interventi ABA-based rivolti a persone con diagnosi di autismo.',
  },
  {
    periodo: 'Dal 17 luglio 2023',
    ente: 'Cooperativa Carpe Diem',
    luogo: 'Gela',
    ruolo: 'Specialista nell’educazione e nella formazione',
    testo:
      'In convenzione con l’ASP di Caltanissetta, nell’ambito dei progetti Diversamente Simili 2.0 e Diversamente Simili 2.0-2: progettazione e supervisione degli interventi per lo sviluppo dell’autonomia personale e sociale.',
  },
]

/** Il libro pubblicato. */
export const pubblicazione = {
  autore: 'Carmela Maria Sonia Madonia',
  titolo: 'Interventi comportamentali: come e cosa fare a casa e a scuola',
  dettagli: 'Amazon, 2022 — pubblicazione indipendente',
  testo:
    'Rivolto a famiglie, insegnanti e operatori, il volume presenta indicazioni ed esempi pratici basati sui principi dell’Analisi del Comportamento Applicata.',
}

/**
 * Domande frequenti.
 *
 * ⚠️ Sono l'unica parte non presente nel documento originale: ricavate dai
 * suoi contenuti, ma da far leggere e approvare prima della pubblicazione.
 */
export const faq = [
  {
    domanda: 'Che cos’è l’Analisi del Comportamento Applicata (ABA)?',
    risposta:
      'È un approccio scientifico allo studio del comportamento che utilizza l’osservazione diretta e la raccolta sistematica dei dati per progettare interventi individualizzati. Gli obiettivi sono osservabili e misurabili, e i risultati vengono verificati sui dati e non su impressioni generali.',
  },
  {
    domanda: 'Lavora solo a Gela?',
    risposta:
      'La sede è a Gela, in provincia di Caltanissetta. Seguo inoltre progetti nel territorio — Niscemi, Sommatino, San Cataldo e Caltagirone — nell’ambito delle collaborazioni con le cooperative convenzionate con le ASP di Caltanissetta e Catania.',
  },
  {
    domanda: 'Dove si svolgono gli interventi?',
    risposta:
      'Quando possibile e necessario, nei contesti in cui le abilità o le difficoltà si manifestano: casa, scuola, centro educativo o altri ambienti di vita. Le collaborazioni con le cooperative del territorio permettono inoltre di operare presso i loro spazi.',
  },
  {
    domanda: 'Lavora solo con i bambini?',
    risposta:
      'No. Gli interventi sono rivolti a bambini, adolescenti e adulti con diagnosi di autismo o altri disturbi del neurosviluppo. Una parte importante del lavoro riguarda inoltre genitori, insegnanti, operatori ed équipe.',
  },
  {
    domanda: 'Come inizia un percorso?',
    risposta:
      'Con un primo colloquio, che serve a comprendere le esigenze della famiglia e a valutare l’appropriatezza della presa in carico. Se si decide di proseguire, viene svolta un’intervista approfondita con i genitori o caregiver per individuare le priorità e definire gli obiettivi.',
  },
  {
    domanda: 'Le certificazioni ABA equivalgono a un Albo professionale?',
    risposta:
      'No. Le certificazioni attestano competenze specifiche nell’Analisi del Comportamento Applicata, non costituiscono Albi o Ordini professionali e si affiancano all’abilitazione sanitaria e all’iscrizione all’Albo degli Psicologi.',
  },
]

/** Titolo e description usati per <title> e meta, pagina per pagina. */
export const seo = {
  home: {
    /**
     * Il titolo della home porta la località, perché è il primo posto in cui
     * Google cerca corrispondenza per una ricerca locale.
     *
     * L'ordine non è casuale: prima il mestiere e la città — che è quello che
     * la gente digita — poi il nome, che serve a chi la cerca già sapendo come
     * si chiama. Sta sotto i 60 caratteri, oltre i quali il titolo viene
     * troncato nei risultati.
     */
    titolo: `Analista del Comportamento ABA a Gela — ${studio.nome}`,
    descrizione:
      'Psicologa e Analista del Comportamento certificata ABA a Gela. Interventi per autismo e disturbi del neurosviluppo, parent training, supervisione.',
  },
  chiSono: {
    titolo: `Chi sono — ${studio.nome}`,
    descrizione:
      'Percorso professionale, certificazioni IBA®, IACABAI e SIACSA/ABAIT, collaborazioni territoriali e pubblicazioni della dott.ssa Sonia Madonia.',
  },
  servizi: {
    titolo: `Servizi — ${studio.nome}`,
    descrizione:
      'Valutazione funzionale, progettazione di interventi ABA, supervisione, parent training, consulenza scolastica, coordinamento di équipe e formazione professionale.',
  },
  contatti: {
    titolo: `Contatti — ${studio.nome}`,
    descrizione:
      'Come richiedere un colloquio, una consulenza, una supervisione o informazioni sui percorsi formativi.',
  },
  privacy: {
    titolo: `Informativa privacy — ${studio.nome}`,
    descrizione: 'Informativa sul trattamento dei dati personali.',
  },
}
